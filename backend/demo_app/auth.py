from flask import Flask

from google.appengine.api import users
from google.appengine.ext import ndb
app = Flask(__name__)

@app.route('/auth')
def auth():
    user = users.get_current_user()
    if user:
        client_id = user.user_id()
        user_key = ndb.Key('User', client_id)
        if user_key.get():
            return {'message': 'user'}
        org_key = ndb.Key('Organization', client_id)
        if org_key.get():
            return {'message': 'organization'}
        else:
            return {'message': 'not_member'}
    else:
        return {'message': 'Not Logged in'}