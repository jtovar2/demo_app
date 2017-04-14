from flask import Flask, request, abort
import json
import ndb_util
from model import User


from google.appengine.api import users
from google.appengine.ext import ndb
from google.appengine.api import app_identity
from google.appengine.api import mail

from flask_restful import Resource
from google.appengine.runtime import apiproxy_errors


base_url = 'http://localhost:9000/#!/'
app_name = 'DemolisherApp'
new_user_message = '<p> Create a new account at {app_name} today</p>' \
                   '<form action="{path}" method="get">'\
                   '<input type="submit" value="Sign Up">' \
                   '</form>'

user_message = '<p>Join the team and start demoing today</p' \
                '<form action="{path}" method="get">' \
               '<input type="submit" value="Join">' \
               '</form>'


class InviteUserToOrg(Resource):
    def get(self, org_id, user_email):
        print "we in here"
        client_id = users.get_current_user().user_id()
        user_email = str(user_email)
        print user_email
        org_id = str(org_id)
        if org_id != client_id:
            abort(401)

        org_key = ndb.Key('Organization', org_id)
        org = org_key.get()
        sender = 'demolisherapp@demolisherapp.appspot.com'
        ender = '{}@appspot.gserviceaccount.com'.format(
            app_identity.get_application_id())
        subject = 'Welcome to the ' + org.name +  ' Team!'

        body = '<h3>{org_name} has invited you to join their team</h3>' \
               '<hr>'
        query = User.query()
        query = query.filter(User.email == user_email)
        query_results = query.fetch()
        if len(query_results) == 0:
            add_new_user_path = base_url + 'signup?referral=' + org_id
            print add_new_user_path
            body = body + new_user_message.format(path=add_new_user_path, app_name=app_name)
        else:
            user = query_results[0]
            user_id = query_results[0].key.id()
            add_user_path = base_url  + 'rest/org/add_user/' + org_id + '/' + user_id
            print add_user_path
            body = body + user_message.format(path=add_user_path)

        response = mail.send_mail(sender=sender, to=user_email, subject=subject, body="", html=body)


        return response


class AddUserToOrg(Resource):
    def get(self, org_id, user_id):
        client_id = users.get_current_user().user_id()
        if client_id != user_id:
            abort(401)
        org_key = ndb.Key('Organization', org_id)
        org = org_key.get()
        user_key = ndb.Key('User', user_id)
        user = user_key.get()

        user.add_organization(org_key)
        org.add_worker(user_key)

        return user.to_json()

class GetAllWorkersForOrg(Resource):
    def get(self, org_id):
        client_id = users.get_current_user().user_id()
        if client_id != org_id:
            abort(401)
        org_key = ndb.Key('Organization', org_id)
        org = org_key.get()
        workers_entities = ndb.get_multi(org.workers)
        workers_json = []
        for entity in workers_entities:
            workers_json.append(entity.to_json())
        return {"workers" : workers_json}


