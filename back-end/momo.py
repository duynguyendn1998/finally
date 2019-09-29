import pymongo
import unicodedata as un
from nltk.tokenize import sent_tokenize, word_tokenize
from nltk.stem import PorterStemmer
from math import cos, sqrt
import pandas as pd
import re
import json
from flask import Flask,request, jsonify
import os
import requests
from bson.int64 import Int64
import geopy.distance

porter = PorterStemmer()
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
db = myclient["merchant"]
coll = db["mer"]
def replace(text):
    x =  text.replace("đ","d")
    return x

def normal(text):
    text = text.lower()
    text = replace(text)
    text = un.normalize('NFKD',text).encode('ascii', errors='ignore').decode('utf-8')
    return text

def split_tag(text):
    tag = word_tokenize(text)
    return tag

def search(text):
    lst_dict= []
    add = normal(text)
    lst_text = split_tag(add)
    for i in coll.find():
        tag = str(i['store_name'])+" "+str(i['store_address'])
        tag = normal(tag)
        lst_tag = split_tag(tag)
        p = len(set(lst_text)&set(lst_tag))
        if(p == len(lst_text)):
            i['_id'] = str(i['_id'])
            lst_dict.append(i)
    if not lst_dict:
        for i in coll.find():
            tag = str(i['store_name'])+" "+str(i['store_address'])
            tag = normal(tag)
            lst_tag = split_tag(tag)
            p = len(set(lst_text)&set(lst_tag))
            lst_cat = split_tag(i['category'].lower())
            p_cat = len(set(lst_text)&set(lst_cat))
            if(p_cat > 0 or p >=2):
                i['_id'] = str(i['_id'])
                lst_dict.append(i)
    return lst_dict
R = 6371 #radius in m 
def distance(lon1, lat1, lon2, lat2): 
    coords_1 = (lat1, lon1)
    coords_2 = (lat2, lon2)
    return geopy.distance.vincenty(coords_1, coords_2).km
                   
momo = Flask(__name__)

@momo.route("/classify",methods = ['GET'])
def classify():
    text = request.args.get('text', None)
    long = float(request.args.get('long', None))
    lat = float(request.args.get('lat', None))
                                               
    assert text is not None
    storelist = search(text)
    for i in storelist:
        if float(i['latitude']) > 90:
            print(i['store_id'])
        i['km'] = distance(float(i['longitude']), float(i['latitude']), long,lat)
    storelist = filter(lambda x: x['km'] <= 5, storelist) 
    storelist = sorted(storelist, key= lambda d: d['km'])
    
    return jsonify(storelist)
    ##app.send_static_file('html/index.html')
@momo.route("/user",methods = ['GET'])
def user():
    user_id = float(request.args.get('user_id', None))
    transList = list(coll.find({'user_id':NumberLong(user_id)},{'_id':0}))
    assert user_id is not None
    return jsonify(transList)
if __name__ == '__main__':
    momo.run()