"http://localhost:8080/_ah/login?email=asdfasd%40hotmail.com&action=Login"
import requests
import json


login_url = "http://localhost:8080/_ah/login"
def login_user(session, email):
    login_info = {'email': email, 'action': 'Login'}
    r = session.get(login_url, params=login_info)


def logout_user(session, email):
    login_info = {'email': email, 'action': 'Logout'}
    r = session.get(login_url, params=login_info)


def create_user(user_email):
    session = requests.Session()
    login_user(session, user_email)
    user_dict = {
        'first_name': 'Javier',
        'last_name': 'again',
        'email': '911@gmail.com'
    }
    user_url = 'http://localhost:8080/rest/user'
    response = session.post(user_url, data=json.dumps(user_dict), auth=(user_email, ''))
    logout_user(session, user_email)
    return response.text

def create_org(org_email):
    session = requests.Session()
    login_user(session, org_email)
    org_dict = {
        'name' : 'orgo1',
        'email' : 'Another@gmail.com'
    }
    org_url = 'http://localhost:8080/rest/org'
    response = session.post(org_url, data=json.dumps(org_dict), auth=(org_email, ''))
    logout_user(session, org_email)
    return response.text



user = create_user('javier@gmail.com')
print user
print '--------------------------'
org = create_org('orgo1@gmail.com')
print org
print '--------------------------'