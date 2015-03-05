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
                return True

#check if entity has the property series (which shows, which series it belogs to)
def has_series_property( json_l ):
    if 'claims' in json_l and 'P179' in json_l['claims']:
        return True

#check for the different series

#check if entity belongs to buffy
def check_serie_buffy( json_l ):
    if '183513' in json_l['claims']['P179'][0]['mainsnak']:
        if '183513' == json_l['claims']['P179'][0]['mainsnak']['datavalue']['value']['numeric-id']:
            return True

def check_serie_firefly( json_l ):
     if '11622' in json_l['claims']['P179'][0]['mainsnak']:
         if '11622' == json_l['claims']['P179'][0]['mainsnak']['datavalue']['value']['numeric-id']:
             return True



file = gzip.open('20141215.json.gz')

for line in file:
    line = line.rstrip().rstrip(',')
    try:
        json_l = json.loads(line)
    except ValueError, e:
        continue
    if is_episode( json_l ) and has_series_property( json_l ):
        if check_serie_buffy( json_l ):
            print json_l['id']
