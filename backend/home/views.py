from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions
from datetime import datetime
from sodapy import Socrata
from tokens.auth_tokens import nyc_stats_app_token, user_name, password
import requests

client = Socrata('data.cityofnewyork.us',
                 nyc_stats_app_token,
                 username=user_name,
                 password=password)


def sort_first(val, **args):
    return val[0]


class Home(APIView):

    def get(self, request):
        data = client.get('rc75-m7u3', order='date_of_interest')
        categories = []
        series = []

        bk = { 'name': 'Brooklyn',       'data': [] }
        bx = { 'name': 'Bronx',          'data': [] }
        mn = { 'name': 'Manhattan',      'data': [] }
        qn = { 'name': 'Queens',         'data': [] }
        si = { 'name': 'Staten Island',  'data': [] }

        for d in data:
            date = datetime.strptime(d['date_of_interest'], "%Y-%m-%dT%H:%M:%S.%f")
            categories.append(date.strftime("%b %d %Y")) 

            bk['data'].append(int(d['bk_death_count']))
            bx['data'].append(int(d['bx_death_count']))
            mn['data'].append(int(d['mn_death_count']))
            qn['data'].append(int(d['qn_death_count']))
            si['data'].append(int(d['si_death_count']))

        series.append(bk)
        series.append(bx)
        series.append(mn)
        series.append(qn)
        series.append(si)

        data_set = {"categories": categories, "series":series}

        return Response(data_set)


class DeathCountPerBorough(APIView):

    def get(self, request):
        data = client.get('cwmx-mvra')
        series = []
        ep = datetime(1970, 1, 1, 0, 0)
        
        for d in data:
            date = datetime.strptime(d['specimen_date'], "%Y-%m-%dT%H:%M:%S.%f")
            x = (date - ep).total_seconds() * 1000;
            series.append([x, int(d['number_deaths'])])

        series.sort(key=sort_first)

        return Response(series)
    
class Shootings(APIView):

    def get(self, request):
        return Response({'happy': 'world'}) 