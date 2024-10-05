from django.urls import path
from .views import ListCreateNoteView, DeleteNoteView, UpdateNoteView

urlpatterns = [
    path('notes/', ListCreateNoteView.as_view(), name='notes'),
    path('notes/delete/<int:pk>/', DeleteNoteView.as_view(), name='delete_note'),
    path('notes/update/<int:pk>/', UpdateNoteView.as_view(), name='update_note'),
]