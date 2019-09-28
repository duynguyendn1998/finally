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

def search(text):
    lst_dict= []
    add = normal(text)
    lst_text = split_tag(add)
    for i in coll.find():
        tag = i['store_name']+" "+i['store_address']
        tag = normal(tag)
        lst_tag = split_tag(tag)
        p = len(set(lst_text)&set(lst_tag))
        if(p == len(lst_text)):
            i['_id'] = str(i['_id'])
            lst_dict.append(i)
    if not lst_dict:
        for i in coll.find():
            tag = i['store_name']+" "+i['store_address']
            tag = normal(tag)
            lst_tag = split_tag(tag)
            p = len(set(lst_text)&set(lst_tag))
            lst_cat = split_tag(i['category'].lower())
            p_cat = len(set(lst_text)&set(lst_cat))
            if(p_cat > 0 or p >=2):
                i['_id'] = str(i['_id'])
                lst_dict.append(i)
    return lst_dict

def distance(lon1, lat1, lon2, lat2): 
    R = 5000 #radius in m 
    x = (lon2-lon1) * cos(0.5*(lat2+lat1)) 
    y = (lat2-lat1) 
    return R * sqrt( x*x + y*y )

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
def cate():
    lstcat = predict()
    lst = []
    for cat in lstcat:
        for i in coll.find():
            if (cat == i['category'].lower()):
                i['_id'] = str(i['_id'])
                lst.append(i)
    return lst
