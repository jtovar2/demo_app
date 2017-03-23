from flask import Flask, request, abort
import json
import ndb_util
import model


from google.appengine.api import users
from google.appengine.ext import ndb
from flask_restful import Resource

class UserApi(Resource):
    def get(self, id=None):
        if id is None:
            abort(401)
        user_key = ndb.Key('User', id)
        user = user_key.get()
        if user is None:
            abort(401)

        client_id = users.get_current_user().user_id()
        # maybe the client tahts making the http is an org
        org_key = ndb.Key('Organization', client_id)
        if client_id != id or org_key not in user.works_for_organizations:
            #change this to unauthorized
            abort(401)
        return user.to_json()

    def put(self,id=None):
        client_id = users.get_current_user().user_id()
        if id is None or id != client_id:
            abort(401)
        user_key = ndb.Key('User', id)
        user = user_key.get()
        if user is None:
            abort(401)
        body = request.get_json(force=True)
        user = user.entity_from_dict(body)
        if user is False:
            abort(401)
        user.put()
        return user.to_json()

    def post(self):
        body = request.get_json(force=True)
        body['id'] = users.get_current_user().user_id()
        user_key = ndb.Key('User', body['id'])
        if user_key.get() != None:
            abort(401)
        user = model.User()
        user = user.entity_from_dict(body)
        if user is False:
            abort(401)
        user.put()
        return user.to_json()

    def delete(self, id=None):
        client_id = users.get_current_user().user_id()
        if id is None or id != client_id:
            abort(401)
        user_key = ndb.Key('User', id)
        user = user_key.get()
        organizations = ndb.get_multi(user.works_for_organizations)
        for org in organizations:
            org.remove_worker(user_key)
        ndb.put_multi(organizations)
        user_key.delete()
        return "", 200
