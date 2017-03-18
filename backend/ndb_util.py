import json
import datetime
import calendar

import functools
from google.appengine.ext import ndb

def entity_to_dict(entity, json_fields=None):
    """Build a new dict so that the entity can be JSON serializable"""

    result = entity.to_dict()
    record = {}

    # Populate the new dict with JSON serializiable values
    for key in result.iterkeys():
        if isinstance(result[key], datetime.datetime):
            record[key] = result[key].isoformat()
            continue

        if isinstance(result[key], ndb.GeoPt):
            record[key] = {}
            record[key]['lat'] = result[key].lat
            record[key]['lon'] = result[key].lon
            continue

        if isinstance(result[key], ndb.Key):
            record[key] = result[key].id()
            continue

        if isinstance(result[key], list):
            serial_list = []
            for item in result[key]:
                if isinstance(item, datetime.datetime):
                    serial_list.append(item.isoformat())
                    continue
                if isinstance(item, ndb.GeoPt):
                    temp_dict = {}
                    temp_dict["lat"] = item.lat
                    temp_dict["lon"] = item.lon
                    serial_list.append(temp_dict)
                    continue
                if isinstance(item, ndb.Key):
                    id = item.id()
                    serial_list.append(id)
                    continue
                serial_list.append(item)
            record[key] = serial_list
            continue

        if json_fields != None and key in json_fields:
            record[key] = json.loads(result[key])
            continue

        record[key] = result[key]

    # Add the key so that we have a reference to the record
    record['key'] = entity.key.id()
    record['kind'] = entity.key.kind()

    return record

def query_to_dict_list(query, json_fields=None):
    query_results = query.fetch()
    print query_results
    print "##############"
    if json_fields != None:
        return list(map(functools.partial(entity_to_dict, json_fields=json_fields), query_results))
    return list(map(entity_to_dict, query_results))