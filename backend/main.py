# Copyright 2016 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# [START app]
import logging

import json
from flask import Flask
from flask_restful import Api
from resources.org_api import OrganizationApi
from resources.form_api import FormApi
from resources.filled_form_api import FilledFormApi
from resources.user_api import UserApi
from resources.form_relationships import FilledFormsByOrgApi, FormsByOrgApi, FilledFormByUserInOrgApi
from resources.org_user_relationships import InviteUserToOrg, AddUserToOrg, GetAllWorkersForOrg, RemoveUserFromOrg

from google.appengine.api import users
from google.appengine.ext import ndb

app = Flask(__name__)
app.debug = True
#CORS(app)
api = Api(app)

clientId = '692772929154-2nasht9k1q88nm15mekm0s6evt1pjin2.apps.googleusercontent.com'
client_secret = 'ayrXnhy-BmSXafYo-5Iei93I'

@app.route('/rest/')
def hello():
    return 'Hello World!'



@app.route('/rest/auth2')
def auth_test():
    user = users.get_current_user()
    if user:
        nickname = user.nickname()
        logout_url = users.create_logout_url('/')
        greeting = nickname, logout_url
    else:
        login_url = users.create_login_url('/')
        greeting = login_url
    return '{}'.format(greeting)

@app.route('/rest/auth')
def auth():
    user = users.get_current_user()
    if user:
        org_key = ndb.Key('Organization', user.user_id())
        org = org_key.get()
        if org is not None:
            return json.dumps({'id': user.user_id(), 'account': 'organization', 'email': user.email()})
        user_key = ndb.Key('User', user.user_id())
        user_entity = user_key.get()
        if user_entity is not None:
            return json.dumps({'id': user.user_id(), 'account': 'user', 'email': user.email()})
        else:
            return json.dumps({'id': user.user_id(), 'account': 'none', 'email': user.email()})


    else:
        login_url = users.create_login_url('/signup')
        print login_url
        return json.dumps({'error': 'not signed in', 'login_url': login_url}), 401

@app.errorhandler(500)
def server_error(e):
    # Log the error and stacktrace.
    logging.exception('An error occurred during a request.')
    return 'An internal error occurred.', 500
# [END app]

api.add_resource(OrganizationApi, '/rest/org/<string:id>', '/rest/org')
api.add_resource(FormApi, '/rest/form/<string:parent_id>/<string:id>', '/rest/form/<string:parent_id>')
api.add_resource(FilledFormApi, '/rest/filledform/<string:parent_id>/<string:id>', '/rest/filledform/<string:parent_id>')
api.add_resource(UserApi, '/rest/user/<string:id>', '/rest/user')
api.add_resource(FilledFormsByOrgApi, '/rest/filledform/org/<string:id>')
api.add_resource(FormsByOrgApi, '/rest/form/org/<string:id>')
api.add_resource(FilledFormByUserInOrgApi, '/rest/filledform/org/<string:id>/user/<string:user_id>')
api.add_resource(InviteUserToOrg, '/rest/invite/<string:org_id>/<string:user_email>')
api.add_resource(AddUserToOrg, '/rest/org/add/worker/<string:org_id>/<string:user_id>')
api.add_resource(GetAllWorkersForOrg, '/rest/org/workers/<string:org_id>')
api.add_resource(RemoveUserFromOrg, '/rest/org/remove/worker/<string:org_id>/<string:user_id>')