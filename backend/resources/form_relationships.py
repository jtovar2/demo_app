from flask import Flask, request, abort
import json
import ndb_util
from model import FilledForm, Form


from google.appengine.api import users
from google.appengine.ext import ndb
from flask_restful import Resource


FORMS_PER_PAGE = 20

class FilledFormsByOrgApi(Resource):
    def get(self, id):
        client_id = users.get_current_user().user_id()
        if client_id != id:
            abort(401)
        org_key = ndb.Key('Organization', id)
        return ndb_util.query_to_dict_list(FilledForm.query_by_org(org_key).fetch(FORMS_PER_PAGE))

class FormsByOrgApi(Resource):
    def get(self, id):
        id = str(id)
        org_key = ndb.Key('Organization', id)
        client_id = users.get_current_user().user_id()
        if client_id != id:
            user_key = ndb.Key('User', client_id)
            user = user_key.get()
            if user is None or org_key not in user.works_for_organizations:
                abort(401)
        query = Form.query_by_org(org_key)
        response = {'forms' : ndb_util.query_to_dict_list(query)}
        return response

class FilledFormByUserInOrgApi(Resource):
    def get(self, org_id, user_id):
        org_key = ndb.Key('Organization', org_id)
        user_key = ndb.Key('User', user_id)
        query = FilledForm.query_by_org(org_key)
        query = query.filter(FilledForm.creator == user_key)
        return ndb_util.query_to_dict_list(query.fetch(FORMS_PER_PAGE))