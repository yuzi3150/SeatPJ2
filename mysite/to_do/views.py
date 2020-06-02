from rest_framework import viewsets, filters
from .models import Todo
from .serializer import TodoSerializer

from rest_framework.decorators import api_view

# ViewSetは「APIのクエリーをどう解釈するかを決めるためのもの」
class TodoViewSet(viewsets.ModelViewSet):
    # Todoリストをすべて取得する
    queryset = Todo.objects.all().order_by('-created_at')
    serializer_class = TodoSerializer


