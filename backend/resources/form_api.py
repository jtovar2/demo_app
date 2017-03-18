om flask import Flask, request, abort
import json
import ndb_util
import model


from google.appengine.api import users
from google.appengine.ext import ndb
from flask_restful import Resource


class FormView(Resource):
    def get(self, parent_id, id=None):
        if id is None or parent_id is None:
            abort(401)
        form_key = ndb.Key('Organization', parent_id, 'Form', id)
        form = form_key.get()
        if form is None:
            abort(401)
        return form.to_json()

    def put(self, parent_id, id=None):
        if id is None or parent_id is None:
            abort(401)

        form_key = ndb.Key('Organization', parent_id, 'Form', id)

        form = form_key.get()
        if form is None:
            abort(401)
        body  = request.get_json(force=True)
        body['parent'] = ndb.Key('Organization', parent_id)
        form = form.entity_from_dict(body)
        if form is False:
            abort(401)
        else:
            form.put()
            return form.to_json()

    def post(self, parent_id):
        if parent_id is None:
            abort(401)
