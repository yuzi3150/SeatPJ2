from rest_framework import viewsets

from .models import Seat
from .serializer import SeatSerializer
from rest_framework.decorators import api_view
from django.http import HttpResponse, Http404, JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
class SeatViewSet(viewsets.ModelViewSet):
    # 一覧取得(GET)
    def list(self, request):
        # ModelViewSetの実装
        queryset = Seat.objects.all().order_by('seat_id')
        serializer_class = SeatSerializer(queryset, many=True)
        return Response(serializer_class.data)

    def retrieve(self, request, *args, **kwargs):
        pass

    #  PATCH送信
    def partial_update(self, request, *args, **kwargs):
        # クライアントから送信されたキー・ユーザ名を変数に代入
        seat_id = kwargs["pk"]
        user_name =request.data["user_name"]
        # UPDATEを実行
        seat_data = Seat.objects.filter(seat_id__exact =seat_id).update(user_name = user_name)
        content = {'message': 'OK'}
        return Response(content, status=status.HTTP_200_OK)

    def perform_update(self, serializer):
        pass

    # PUT送信
    def update(self, request,pk):
        pass



@api_view(['GET'])
def retrieveAllSeat(request):
    queryset = Seat.objects.all().order_by('seat_id')
    pass

