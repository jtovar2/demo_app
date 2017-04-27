from google.appengine.ext import ndb
import ndb_util

class Entity(object):
    def to_json(self):
        return ndb_util.entity_to_dict(self)

    @classmethod
    def entity_from_dict(cls, data_dict, parent_key=None):
        valid_properties = {}
        for cls_property in cls._properties:
            if cls_property in data_dict:
                valid_properties.update({cls_property: data_dict[cls_property]})
        # logging.info(valid_properties)
        # Update the id from the data_dict
        if 'id' in data_dict:  # if creating a new entity
            valid_properties['id'] = data_dict['id']
        # Add the parent
        if parent_key is not None:
            valid_properties['parent'] = parent_key
        try:
            entity = cls(**valid_properties)
        except Exception as e:
            print e
            return False
        return entity

class User(ndb.Model, Entity):
    first_name = ndb.StringProperty()
    last_name = ndb.StringProperty()
    email = ndb.StringProperty()
    works_for_organizations = ndb.KeyProperty(repeated=True)
    filled_forms = ndb.KeyProperty(repeated=True)

    def add_filled_form(self, filled_form_key):
        if self.filled_forms is None:
            self.filled_forms = []
        self.filled_forms.append(filled_form_key)
        self.put()

    def remove_filled_form(self, filled_form_key):
        if self.filled_forms is None:
            return
        self.filled_forms.remove(filled_form_key)
        self.put()
    def add_organization(self, org_key):
        if self.works_for_organizations is None:
            self.works_for_organizations = []
        self.works_for_organizations.append(org_key)
        self.put()

    def delete_organization(self, org_key):
        if self.works_for_organizations is None:
            return
        self.works_for_organizations.remove(org_key)
        self.put()

class Organization(ndb.Model, Entity):
    name = ndb.StringProperty()
    email = ndb.StringProperty()
    workers = ndb.KeyProperty(repeated=True)
    inventory = ndb.JsonProperty()

    def add_worker(self, worker_key):
        if self.workers is None:
            self.workers = []
        self.workers.append(worker_key)
        self.put()

    def remove_worker(self, workey_key_to_be_deleted):
        if self.workers is None:
            return
        self.workers.remove(workey_key_to_be_deleted)
        self.put()

    def set_inventory(self, new_inventory):
        self.inventory = new_inventory
        self.put()


class Form(ndb.Model, Entity):
    data = ndb.JsonProperty()

    @classmethod
    def query_by_org(cls, org_key):
        return cls.query(ancestor=org_key)

class Place(ndb.Model, Entity):
    address = ndb.JsonProperty()

    @classmethod
    def query_by_org(cls, org_key):
        return cls.query(ancestor=org_key)

class ClockIn(ndb.Model, Entity):
    time = ndb.DateTimeProperty(auto_now_add=True)
    org = ndb.KeyProperty()
    place = ndb.KeyProperty()

class FilledForm(ndb.Model, Entity):
    data = ndb.JsonProperty()
    creator = ndb.KeyProperty()
    end = ndb.DateTimeProperty(auto_now_add=True)
    place = ndb.KeyProperty()
    start = ndb.DateTimeProperty()

    @classmethod
    def query_by_org(cls, org_key):
        return cls.query(ancestor=org_key).order(-cls.end)

class Blob(ndb.Model, Entity):
    created = ndb.DateTimeProperty(auto_now_add=True)
    creator = ndb.KeyProperty()
    photo_or_nah = ndb.BooleanProperty()