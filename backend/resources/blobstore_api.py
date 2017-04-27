from google.appengine.ext.webapp import blobstore_handlers
from google.appengine.ext import blobstore

from flask import Flask, request, abort, make_response
import json
import ndb_util
import model
from google.appengine.api import users
from google.appengine.ext import ndb
from flask_restful import Resource
from werkzeug.http import parse_options_header


class BlobstoreURLGen(Resource):
    def get(self,):
        client_id = users.get_current_user().user_id()
        user_key = ndb.Key('User', client_id)
        org_key = ndb.Key('Organization', client_id)
        if user_key.get() != None and org_key.get() != None:
            abort(401)
        upload_url = blobstore.create_upload_url('/rest/upload_photo')
        return upload_url


# [START upload_handler]
class PhotoUploadHandler(Resource):
    def post(self):
        '''
        client_id = users.get_current_user().user_id()
        user_key = ndb.Key('User', client_id)
        org_key = ndb.Key('Organization', client_id)
        if user_key.get() != None and org_key.get() != None:
            abort(401)'''
        f = request.files['file']
        header = f.headers['Content-Type']
        print "??????????????????????? this the header"
        print header
        parsed_header = parse_options_header(header)
        blob_key = ndb.Key('Blob', parsed_header[1]['blob-key'])

        blob = model.Blob(key=blob_key, photo_or_nah=True)
        test_key = blob.put()
        print test_key
        print blob_key
        print blob.to_json()
        return blob.to_json()
# [END upload_handler]

class PhotoApi(Resource):
    def get(self, blob_id):
        blob_info = blobstore.get(blob_id)
        response = make_response(blob_info.open().read())
        response.headers['Content-Type'] = blob_info.content_type
        return response

    def delete(self, blob_id):
        blobstore.delete(blob_id)
        blob_key = ndb.Key('Blob', blob_id)
        blob_key.delete()
        return "OK"
