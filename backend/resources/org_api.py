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
        id = str(id)
        if id is None:
            print "soo id is None"
            abort(401)
        org_key = ndb.Key('Organization', id)
        org = org_key.get()
        if org is None:
            print 'org doesnt exists'
            abort(401)
        client_id = users.get_current_user().user_id()
        # maybe the client tahts making the http is an user taht wroks for org
        user_key = ndb.Key('User', client_id)
        if client_id != id and user_key not in org.workers:
            abort(401)
        print str(type(org.workers)) + '  ' + str(org.workers) + ' ' + str(user_key)
        return org.to_json()

    def put(self, id=None):
        id = str(id)
        client_id = users.get_current_user().user_id()
        if id is None or client_id != id:
            print id + ' ' + client_id
            print "first one"
            abort(401)
        org_key = ndb.Key('Organization', id)
        org = org_key.get()
        print org
        if org is None:
            print "second one"
            abort(401)
        body = request.get_json(force=True)
        body['id'] = id
        if body['workers'] > 0:
            body['workers'] = self._generate_kind_keys(body['workers'], 'User')
        org = org.entity_from_dict(body)
        if org is False:
            print "third one"
            abort(401)
        else:
            key = org.put()
            print key
            return org.to_json()

    def post(self):
        body = request.get_json(force=True)
        body['id'] = users.get_current_user().user_id()
        org_key = ndb.Key('Organization', body['id'])
        if org_key.get() != None:
            abort(401)
        org = model.Organization()
        org = org.entity_from_dict(body)
        print org
        if org is False:
            abort()
        else:
            org.put()
            return org.to_json()
    def delete(self,id=None):
        id = str(id)
        client_id = users.get_current_user().user_id()
        if id is None or client_id != id:
            abort(401)
        org_key = ndb.Key('Organization', id)
        org_key.delete()
        return '', 200
    def _generate_kind_keys(self, ids, kind):
        keys = []
        for id in ids:
            keys.append(ndb.Key(kind, id))
        return keys