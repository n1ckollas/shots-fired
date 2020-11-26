from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions

import requests


class Home(APIView):

    def get(self, request):
        r = requests.get("https://data.cityofnewyork.us/resource/rc75-m7u3.json")
        return Response(r.json())