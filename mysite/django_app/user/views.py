from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets, filters, status
from rest_framework.parsers import JSONParser

from .models import User
from .serializer import UserSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view, action, parser_classes


@api_view(['GET', 'PUT', 'DELETE'])
@parser_classes([JSONParser])
def snippet_detail(request, pk):
    """
    Retrieve, update or delete a code snippet.
    """
    try:
        user = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = UserSerializer(user)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



class UserViewSet(viewsets.ModelViewSet):
    # ModelViewSetの実装
    serializer_class = UserSerializer
    queryset = User.objects.all

    # 全てのレコードを取得する
    def list(self, request):
        queryset = User.objects.all().order_by('-created_at')
        serializer_class = UserSerializer(queryset,many=True)
        return Response(serializer_class.data)

    # 主キーで一意のレコードを取得する
    def retrieve(self, request, pk=None):
        queryset = User.objects.all()
        user = get_object_or_404(queryset, pk=pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)

    # 主キーで一意のレコードを更新する
    def update(self, request, pk=None):
        name = request.data['name']
        User.objects.filter(id=pk).update(name = name)

    # 主キーでいちいのレコードを削除する
    def destroy(self, request,  pk=None):
        User.objects.filter(id=pk).delete()
        pass
