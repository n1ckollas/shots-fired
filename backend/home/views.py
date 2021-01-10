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


class AllCases(APIView):

    def get(self, request):

        max_extract_date = None
        data = client.get('cwmx-mvra', select="MAX(extract_date)")
        if (len(data) > 0):
            max_extract_date = data[-1]["MAX_extract_date"]
        else:
            dates = client.get('cwmx-mvra', select="distinct extract_date")
            dates = [x["extract_date"] for x in dates]
            dates.sort(key = lambda date: datetime.strptime(date, "%Y-%m-%dT%H:%M:%S.%f"))
            max_extract_date = dates[-1]


        data = client.get('cwmx-mvra', select="*", 
            where="extract_date = '%s'" % (max_extract_date),
            order="specimen_date"
        )

        number_confirmed_data = []
        number_deaths_data = []
        number_hospitalized_data = [] 
        number_tested_data = []

        ep = datetime(1970, 1, 1, 0, 0)
        date_to_specimen_map = {}

        for d in data:
            date = datetime.strptime(d['specimen_date'], "%Y-%m-%dT%H:%M:%S.%f")
            date_time_stamp = (date - ep).total_seconds() * 1000;
            number_confirmed_data.append([date_time_stamp, int(d['number_confirmed'])])
            number_deaths_data.append([date_time_stamp, int(d['number_deaths'])])
            number_hospitalized_data.append([date_time_stamp, int(d['number_hospitalized'])])
            number_tested_data.append([date_time_stamp, int(d['number_tested'])])
         
        number_confirmed_data.sort(key=sort_first)
        number_deaths_data.sort(key=sort_first)
        number_hospitalized_data.sort(key=sort_first)
        number_tested_data.sort(key=sort_first)

        result = {
            'number_confirmed': number_confirmed_data,
            'number_deaths': number_deaths_data,
            'number_hospitalized': number_hospitalized_data,
            'number_tested': number_tested_data,
        }

        return Response(result)
    
class Shootings(APIView):

    def get(self, request):
        if "date" in request.query_params:
            print("GET DIFFERENT API")
            date = request.query_params['date']
            print(date)
            data = client.get('5ucz-vwe8', select="*", where="'occur_date' > '2020-09-21T00:00:00.000'", limit=100)
            return Response(data)
        data = client.get('5ucz-vwe8', order="occur_date", limit=2000)
        series = []
        ep = datetime(1970, 1, 1, 0, 0)
        date_to_occurance_map = {}

        for d in data:
            if(d["occur_date"] in date_to_occurance_map.keys()):
                date_to_occurance_map[d["occur_date"]] += 1
            else:
                date_to_occurance_map[d["occur_date"]] = 1
        

        for occurance_date in date_to_occurance_map.keys():
            date = datetime.strptime(occurance_date, "%Y-%m-%dT%H:%M:%S.%f")
            date_stamp = (date - ep).total_seconds() * 1000
            series.append([date_stamp, date_to_occurance_map[occurance_date]])
  
        return Response(series)

class ShootingsPerDate(APIView):

    def get(self, request):
        print("SHOOTINGS PER DATE")
        data = client.get('5ucz-vwe8', order="occur_date", limit=2000)
        series = []
        ep = datetime(1970, 1, 1, 0, 0)
        date_to_occurance_map = {}

        for d in data:
            if(d["occur_date"] in date_to_occurance_map.keys()):
                date_to_occurance_map[d["occur_date"]] += 1
            else:
                date_to_occurance_map[d["occur_date"]] = 1
        

        for occurance_date in date_to_occurance_map.keys():
            date = datetime.strptime(occurance_date, "%Y-%m-%dT%H:%M:%S.%f")
            date_stamp = (date - ep).total_seconds() * 1000
            series.append([date_stamp, date_to_occurance_map[occurance_date]])
  
        return Response([]) 