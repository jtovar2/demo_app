from flask import Flask, request, abort
import json
import ndb_util
import model


from google.appengine.api import users
from google.appengine.ext import ndb
from flask_restful import Resource


class FilledFormApi(Resource):
    def get(self, parent_id, id=None):
        if id is None or parent_id is None:
            abort(401)
        filled_form_key = ndb.Key("Organization", parent_id, "FilledForm", id)
        filled_form = filled_form_key.get()
        if filled_form is None:
            abort(401)
        client_id = users.get_current_user().user_id()
        user_key = ndb.Key('User', client_id)
        if parent_id != client_id or filled_form.creator != user_key:
            #change to unauthorized
            abort(401)
        return filled_form.to_json()

    def put(self, parent_id, id=None):
        if id is None or parent_id is None:
            abort(401)

        filled_form_key = ndb.Key('Organization', parent_id, 'FilledForm', id)
        filled_form = filled_form_key.get()
        if filled_form is None:
            abort(401)

        client_id = users.get_current_user().user_id()
        user_key = ndb.Key('User', client_id)
        if parent_id != client_id or filled_form.creator != user_key:
            # change to unauthorized
            abort(401)
        else:
            filled_form.put()
            return filled_form.to_json()

    def post(self, parent_id):
        if parent_id is None:
            abort(401)
        parent_key = ndb.Key('Organization', parent_id)

        body = request.get_json(force=True)

        client_id = users.get_current_user().user_id()
        body['creator'] = ndb.Key('User', client_id)
        org = parent_key.get()
        if body['creator'] not in org.workers:
            ##change to unauth
            abort(401)

        filled_form = model.FilledForm()
        creator = body['creator'].get()
        if creator is None or filled_form is False:
            abort(401)
        else:
            filled_form_key = filled_form.put()
            creator.add_filled_form(filled_form_key, parent_key=parent_key)
            return filled_form.to_json()

    def delete(self, parent_id, id=None):
        if parent_id is None or id is None:
            abort(401)

        filled_form_key = ndb.Key('Organization', parent_id, 'FilledForm', id)
        filled_form = filled_form_key.get()
        if filled_form is None:
            abort(401)

        client_id = users.get_current_user().user_id()
        user_key = ndb.Key('User', client_id)
        if parent_id != client_id or filled_form.creator != user_key:
            # change to unauthorized
            abort(401)

        creator = filled_form.creator.get()
        creator.remove_filled_form(filled_form_key=filled_form_key)
        creator.put()
        filled_form_key.delete()