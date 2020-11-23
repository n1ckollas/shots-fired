from django.shortcuts import render
from django.http import HttpResponse
from django.views import View 

import requests
# Create your views here.
class Home(View):
    greeting = "Hello World"
    
    def get(self, request):
        r = requests.get("https://jsonplaceholder.typicode.com/todos/1")
        print(r.json())
        return HttpResponse(self.greeting)