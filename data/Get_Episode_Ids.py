# This Python file uses the following encoding: utf-8
#!/usr/bin/python
import gzip
import json

__author__ = "Lucie-Aimée Kaffee"
__email__ = "lucie.kaffee@gmail.com"
__license__ = "GNU GPL v2+"

#check if entity is an isntance of episode (Q1983062)
def is_episode( json_l ):
    if 'claims' in json_l and 'P31' in json_l['claims']:
        if 'datavalue' in json_l['claims']['P31'][0]['mainsnak']:
            instance_of_id = json_l['claims']['P31'][0]['mainsnak']['datavalue']['value']['numeric-id']
            if instance_of_id == 1983062:
                print "test1"
                return True

#check if entity has the property series (which shows, which series it belogs to)
def has_series_property( json_l ):
    if 'claims' in json_l and 'P179' in json_l['claims']:
        print "test2"
        return True

#check for the different series

#check if entity belongs to buffy
def check_serie_buffy( json_l ):
    if '183513' in json_l['claims']['P179'][0]['mainsnak']:
        if json_l['claims']['P179'][0]['mainsnak']['datavalue']['value']['numeric-id'] == 183513:
            print buffy
            return True

def check_serie_firefly( json_l ):
     if '11622' in json_l['claims']['P179'][0]['mainsnak']:
         if json_l['claims']['P179'][0]['mainsnak']['datavalue']['value']['numeric-id'] == 11622:
             print firefly
             return True



file = gzip.open('20141215.json.gz')
data = {}
for line in file:

    line = line.rstrip().rstrip(',')
    try:
        json_l = json.loads(line)
    except ValueError, e:
        continue
    if is_episode( json_l ) and has_series_property( json_l ):
        seriesid = 'Q' + str(json_l['claims']['P179'][0]['mainsnak']['datavalue']['value']['numeric-id']);
        episodeid = json_l['id']
        print seriesid + ": " + episodeid
        if not data or not seriesid in data:
            epiArray = []
            episodes = { "Episodes" : epiArray }
            data = { seriesid : episodes }

        data[seriesid]["Episodes"].append(episodeid)

json_data = json.dumps(data)
print json_data
