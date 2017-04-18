from flask import Flask, request, abort
import json
import ndb_util
from model import ClockIn


from google.appengine.api import users
from google.appengine.ext import ndb
from flask_restful import Resource



class ClockInApi(Resource):
    def get(self, user_id):
        if user_id is None:
            abort(401)
        clockin_key = ndb.Key("ClockIn", user_id)

        client_id = users.get_current_user().user_id()
        if client_id != user_id:
            #change to unauthorized
            abort(401)
        clockin = clockin_key.get()
        if clockin is None:
            return {"status": "not_clocked_in"}, 203
        return clockin.to_json(), 201

    def post(self, org_id, user_id, place_id):
        if user_id is None or org_id is None or place_id is None:
            abort(401)
        user_key = ndb.Key('User', user_id)
        user = user_key.get()
        clockin_key = ndb.Key("ClockIn", user_id)
        client_id = users.get_current_user().user_id()
        org_key = ndb.Key("Organization", org_id)
        place_key = ndb.Key("Place", place_id)
        if client_id != user_id or org_key not in user.works_for_organizations:
            # change to unauthorized
            abort(401)
        clockIn = ClockIn(place=place_key, org=org_key, id=user_id)
        clockIn.put()
        return clockIn.to_json(), 201

    def delete(self, user_id):
        if user_id is None:
            abort(401)
        client_id = users.get_current_user().user_id()
        if client_id != user_id:
            # change to unauthorized
            abort(401)
        clockIn_key = ndb.Key("ClockIn", user_id)
        clockIn_key.delete()
        return "OK", 203