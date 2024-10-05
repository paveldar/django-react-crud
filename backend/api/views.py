from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import AllowAny
from .serializers import NoteSerializer
from .models import Note

# User-related views


# Note-related views

# View notes & create a note
class ListCreateNoteView(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [AllowAny]
    queryset = Note.objects.all()

    # def perform_create(self, serializer):
    #     serializer.save()


# Delete a note
class DeleteNoteView(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [AllowAny]
    queryset = Note.objects.all()


# Delete a note
class UpdateNoteView(generics.UpdateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [AllowAny]
    queryset = Note.objects.all()








