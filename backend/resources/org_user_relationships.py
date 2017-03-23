from flask import Flask, request, abort
import json
import ndb_util
from model import User


from google.appengine.api import users
from google.appengine.ext import ndb
from google.appengine.api import app_identity
from google.appengine.api import mail

from flask_restful import Resource


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
        client_id = users.get_current_user().user_id()
        user_email = str(user_email)
        org_id = str(org_id)
        if org_id != client_id:
            abort(401)

        org_key = ndb.Key('Organization', org_id)
        org = org_key.get()
        sender = 'demolisherapp@demolisherapp.appspot.com'
        sender = '{}@appspot.gserviceaccount.com'.format(
            app_identity.get_application_id())
        subject = 'Welcome to the ' + org.name +  ' Team!'

        body = '<h3>{org_name} has invited you to join their team</h3>' \
               '<hr>'
        query = User.query(User.email == user_email).fetch()
        if len(query) == 0:
            add_new_user_path = base_url + 'signup?referal=' + org_id
            body = body + new_user_message.format(path=add_new_user_path)
        else:
            user = query[0].get()
            user_id = query[0].id()
            add_user_path = 'http://locahost:9000'  + '/rest/org/add_user/' + org_id + '/' + user_id
            body = body + user_message.format(path=add_user_path)
        response = mail.send_email(sender=sender, to=user_email, subject=subject, body=body)
        return response