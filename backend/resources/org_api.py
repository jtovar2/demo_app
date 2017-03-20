from flask import Flask, request, abort
import json
import ndb_util
import model


from google.appengine.api import users
from google.appengine.ext import ndb
from flask_restful import Resource

#TODO auth stuff
class OrganizationApi(Resource):
    def get(self, id=None):
        if id is None:
            abort(401)
        org_key = ndb.Key('Organization', id)
        org = org_key.get()
        if org is None:
            abort(401)
        client_id = users.get_current_user().user_id()
        # maybe the client tahts making the http is an user taht wroks for org
        user_key = ndb.Key('User', client_id)
        if client_id != id or org_key not in org.workers:
            # change this to unauthorized
            abort(401)
        return org.to_json()

    def put(self, id=None):
        client_id = users.get_current_user().user_id()
        if id is None or client_id != id:
            abort(401)
        org_key = ndb.Key('Organization', id)
        org = org_key.get()
        if org is None:
            abort(401)
        body = request.get_json(force=True)
        org = org.entity_from_dict(body)
        if org is False:
            abort()
        else:
            org.put()
            return org.to_json()

    def post(self):
        body = request.get_json(force=True)
        body['id'] = users.get_current_user().user_id()
        org = model.Organization()
        org = org.entity_from_dict(body)
        print org
        if org is False:
            abort()
        else:
            org.put()
            return org.to_json()
    def delete(self,id=None):
        client_id = users.get_current_user().user_id()
        if id is None or client_id != id:
            abort(401)
        org_key = ndb.Key('Organization', id)
        org_key.delete()
        return '', 200