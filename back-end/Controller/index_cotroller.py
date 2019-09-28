import pymongo
import unicodedata as un
from nltk.tokenize import sent_tokenize, word_tokenize
from math import cos, sqrt
import pandas as pd
import re
import json
import os
import requests
import pickle
import datetime
import numpy as np
import operator
from bson.int64 import Int64
import geopy.distance

def index():
    # Coder here
    return "Hello Index "

myclient = pymongo.MongoClient("mongodb://localhost:27017/")
db = myclient["merchant"]
coll = db["mer"]
def replace(text):
    x =  text.replace("đ","d")
    return x

def split_tag(text):
    tag = word_tokenize(text)
    return tag

def normal(text):
    text = text.lower()
    text = replace(text)
    text = un.normalize('NFKD',text).encode('ascii', errors='ignore').decode('utf-8')
    return text

def search(text, long, lat,page):
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
    for i in lst_dict:
        i['km'] = distance(i['longitude'], i['latitude'], long, lat)
    lst_dict = sorted(lst_dict, key = lambda d: d['km'])
    if page is None:
        return lst_dict
    else:
        return lst_dict[0:50]

def distance(lon1, lat1, lon2, lat2): 
    # R = 6371 #radius in m 
    coords_1 = (lat1, lon1)
    coords_2 = (lat2, lon2) 
    return geopy.distance.vincenty(coords_1, coords_2).km

def user(user_id,long,lat):
    transList = list(db['tran'].find({'user_id':Int64(user_id)},{'_id':0}))
    merList = []
    for i in transList:
        mer = coll.find_one({'store_id':Int64(i['store_id'])},{'_id':0,'':0})
        if mer is not None:
            mer['amount'] = i['amount']
            mer['km'] = distance(float(mer['longitude']),float(mer['latitude']),long,lat)
            merList.append(mer)
    
    return merList


def ReadModel(cat):
    mymodel = None
    try:
        with open("./TrainModel/"+ cat +".pkl", 'rb') as model:
            # print(cat)
            mymodel = pickle.load(model)
    except IOError:
        print("File not found!!")
    return mymodel

def FindListCategory():
    return ['coffee chains and milk tea', 'mass merchant', 'fast food', 'restaurant', 'shopping', 'cvs', 'mass ecom', 'supermarket']

def predict():
    listCategory = FindListCategory()
    dictmodel = {}
    for cat in listCategory:
        model = ReadModel(cat)
        if model is not None:
            dictmodel[cat] = model
    
    today = datetime.datetime.now()
    param = pd.DataFrame(np.array([[(today.hour + 1) % 7,1]]), columns=['hour','dayofweek_number'])
    pred = {}
    for cat in listCategory:
        neg , pos = dictmodel[cat].predict_proba(param)[0]
        if pos > neg:
            pred[cat] = pos

    return sorted(pred, key=pred.get, reverse=True)
def cate(long,lat,page):
    lstcat = predict()
    lst = []
    for i in coll.find({},{'_id':0}):
        if (i['category'].lower() in lstcat):
            i['km'] = distance(i['longitude'],i['latitude'],long,lat)
            lst.append(i)
    lst = sorted(lst, key = lambda d: d['km'])
    return lst[(page-1)*15:page*15-1]
