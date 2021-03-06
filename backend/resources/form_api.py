from flask import Flask, request, abort
import json
import ndb_util
import model


from google.appengine.api import users
from google.appengine.ext import ndb
from flask_restful import Resource


class FormApi(Resource):
    def get(self, parent_id, id=None):
        if id is None or parent_id is None:
            print 'fails first one'
            abort(401)
        id = int(id)
        parent_id = str(parent_id)
        client_id = users.get_current_user().user_id()
        org_key = ndb.Key('Organization', parent_id)
        org = org_key.get()
        ##maybe client is user
        user_key = ndb.Key('User', client_id)
        if user_key not in org.workers and client_id != parent_id:
            print 'authorized'
            abort(401)

        form_key = ndb.Key('Organization', parent_id, 'Form', id)
        form = form_key.get()
        if form is None:
            print 'fails thrid one'
            abort(401)
        print "WTTTTTFFFffffffffffffff"
        print form.to_json()
        return form.to_json()

    def put(self, parent_id, id=None):
        if id is None or parent_id is None:
            abort(401)
        parent_id = str(parent_id)
        id = int(id)
        client_id = users.get_current_user().user_id()
        if client_id != parent_id:
            # change to un auth
            abort(401)

        form_key = ndb.Key('Organization', parent_id, 'Form', id)

        form = form_key.get()
        if form is None:
            abort(401)
        body  = request.get_json(force=True)
        body['id'] = id
        form = form.entity_from_dict(body, parent_key=ndb.Key('Organization', parent_id))
        if form is False:
            abort(401)
        else:
            form.put()
            return form.to_json()

    def post(self, parent_id):
        if parent_id is None:
            abort(401)
        parent_id = str(parent_id)
        client_id = users.get_current_user().user_id()
        if client_id != parent_id:
            # change to un auth
            abort(401)
        parent_key = ndb.Key('Organization', parent_id)
        body = request.get_json(force=True)
        form = model.Form()
        form = form.entity_from_dict(body, parent_key=parent_key)
        if form is False:
            abort(401)
        else:
            form.put()
            return form.to_json()

    def delete(self,parent_id, id=None):
        if id is None or parent_id is None:
            abort(401)
        id = int(id)
        parent_id = str(parent_id)
        client_id = users.get_current_user().user_id()
        if client_id != parent_id:
            # change to un auth
            abort(401)
        form_key = ndb.Key('Organization', parent_id, 'Form', id)
        form = form_key.get()
        print form
        form_key.delete()
        return '', 200