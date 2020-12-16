from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions
from datetime import datetime
import requests


class Home(APIView):

    def get(self, request):
        r = requests.get("https://data.cityofnewyork.us/resource/rc75-m7u3.json?$order=date_of_interest")
        data = r.json()
        categories = []
        series = []
        print(data)

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
        r = requests.get("https://data.cityofnewyork.us/resource/rc75-m7u3.json?$order=date_of_interest")
        data = r.json()
        series = []
        ep = datetime(1970, 1, 1, 0, 0)
        
        for d in data:
            date = datetime.strptime(d['date_of_interest'], "%Y-%m-%dT%H:%M:%S.%f")
            x = (date - ep).total_seconds() * 1000;
            series.append([x, int(d['bk_death_count'])])

        return Response(series)