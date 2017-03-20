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
            abort(401)
        client_id = users.get_current_user().user_id()
        org_key = ndb.Key('Organization', parent_id)
        org = org_key.get()
        ##maybe client is user
        user_key = ndb.Key('User', client_id)
        if user_key not in org.workers or client_id != parent_id:
            # Change to un authorized
            abort(401)

        form_key = ndb.Key('Form', parent_id, 'Form', id)
        form = form_key.get()
        if form is None:
            abort(401)
        return form.to_json()

    def put(self, parent_id, id=None):
        if id is None or parent_id is None:
            abort(401)
        client_id = users.get_current_user().user_id()
        if client_id != parent_id:
            # change to un auth
            abort(401)

        form_key = ndb.Key('Organization', parent_id, 'Form', id)

        form = form_key.get()
        if form is None:
            abort(401)
        body  = request.get_json(force=True)
        form = form.entity_from_dict(body, parent_key=ndb.Key('Organization', parent_id))
        if form is False:
            abort(401)
        else:
            form.put()
            return form.to_json()

    def post(self, parent_id):
        if parent_id is None:
            abort(401)
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
        client_id = users.get_current_user().user_id()
        if client_id != parent_id:
            # change to un auth
            abort(401)
        form_key = ndb.Key('Organization', parent_id, 'Form', id)
        form_key.delete()
        return '', 200