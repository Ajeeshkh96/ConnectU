from django.http.response import HttpResponse

# Create your views here.

def index(request):
    return HttpResponse('ConnectU - a social media platform')