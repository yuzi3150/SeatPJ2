from django.http import HttpResponse, Http404
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from mysite.django_app.webscraping.modules.main_web_scraping import MainWebScraping

@api_view(['GET'])
def executeMainWebScraping(request):
    try:
        if "inputDateFrom" in request.GET and "inputDateTo" in request.GET and "dlPath" in request.GET:
            # query_paramが指定されている場合の処理
            inputDateFrom = request.GET.get("inputDateFrom")
            inputDateTo = request.GET.get("inputDateTo")
            dlPath = request.GET.get("dlPath")

            mainWebScraping=MainWebScraping()
            mainWebScraping.execute(inputDateFrom,inputDateTo,dlPath)
        else:
            pass
        content = {'message': 'OK'}
        return Response(content, status=status.HTTP_200_OK)

    except:
        content = {'message': 'ERROR'}
        return Response(content, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def executeJockeyScraping(request):
    try:
        if "inputIdFrom" in request.GET and "inputIdTo" in request.GET and "dlPath" in request.GET:
            # query_paramが指定されている場合の処理
            inputIdFrom = request.GET.get("inputIdFrom")
            inputIdTo = request.GET.get("inputIdTo")
            dlPath = request.GET.get("dlPath")

        else:
            pass
        content = {'message': 'OK'}
        return Response(content, status=status.HTTP_200_OK)

    except Exception as e:
        print(e)
        content = {'message': 'ERROR'}
        return Response(content, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
