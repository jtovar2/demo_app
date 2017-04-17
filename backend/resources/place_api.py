from flask import Flask, request, abort
import json
import ndb_util
import model


from google.appengine.api import users
from google.appengine.ext import ndb
from flask_restful import Resource


class PlaceApi(Resource):
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

        place_key = ndb.Key('Organization', parent_id, 'Place', id)
        place = place_key.get()
        if place is None:
            print 'fails thrid one'
            abort(401)
        print "WTTTTTFFFffffffffffffff"
        print place.to_json()
        return place.to_json()

    def put(self, parent_id, id=None):
        if id is None or parent_id is None:
            abort(401)
        parent_id = str(parent_id)
        id = int(id)
        client_id = users.get_current_user().user_id()
        if client_id != parent_id:
            # change to un auth
            abort(401)

        place_key = ndb.Key('Organization', parent_id, 'Place', id)

        place = place_key.get()
        if place is None:
            abort(401)
        body = request.get_json(force=True)
        body['id'] = id
        place = place.entity_from_dict(body, parent_key=ndb.Key('Organization', parent_id))
        if place is False:
            abort(401)
        else:
            place.put()
            return place.to_json()

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
        place = model.Place()
        place = place.entity_from_dict(body, parent_key=parent_key)
        if place is False:
            abort(401)
        else:
            place.put()
            return place.to_json()

    def delete(self, parent_id, id=None):
        if id is None or parent_id is None:
            abort(401)
        id = int(id)
        parent_id = str(parent_id)
        client_id = users.get_current_user().user_id()
        if client_id != parent_id:
            # change to un auth
            abort(401)
        place_key = ndb.Key('Organization', parent_id, 'Place', id)
        place = place_key.get()
        print place
        place_key.delete()
        return '', 200