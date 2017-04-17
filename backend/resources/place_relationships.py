from flask import Flask, request, abort
import json
import ndb_util
from model import Place


from google.appengine.api import users
from google.appengine.ext import ndb
from flask_restful import Resource


PLACES_PER_PAGE = 20

class PlacesByOrgApi(Resource):
    def get(self, id):
        id = str(id)
        org_key = ndb.Key('Organization', id)
        client_id = users.get_current_user().user_id()
        if client_id != id:
            user_key = ndb.Key('User', client_id)
            user = user_key.get()
            if user is None or org_key not in user.works_for_organizations:
                abort(401)
        query = Place.query_by_org(org_key)
        response = {'places' : ndb_util.query_to_dict_list(query)}
        return response