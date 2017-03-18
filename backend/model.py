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
            return False
        return entity
class User(ndb.Model, Entity):
    user = ndb.UserProperty()
    email = ndb.StringProperty()
    works_for_organizations = ndb.KeyProperty(repeated=True)
    filled_forms = ndb.KeyProperty(repeated=True)

class Organization(ndb.Model, Entity):
    user = ndb.UserProperty()
    email = ndb.StringProperty()
    workers = ndb.KeyProperty(repeated=True)
    forms = ndb.KeyProperty(repeated=True)
    inventory = ndb.JsonProperty()

class Form(ndb.Model, Entity):
    data = ndb.JsonProperty()

class FilledForm(ndb.Model, Entity):
    data = ndb.JsonProperty()
    creator = ndb.KeyProperty()
    created = ndb.DateProperty(auto_now_add=True)



