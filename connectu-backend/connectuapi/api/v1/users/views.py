from django.contrib.auth.models import User
import base64
from django.core.files.base import ContentFile
import base64
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .serializer import (
    ProfileSerializer,
    EditAuthorSerializer,
    EditUserSerializer,
    GetAuthor,
    SearchSerializer,
    FollowingSerializer,
)
from users.models import Author
from api.v1.posts.serializer import PostSerializer
import requests
import json
from django.conf import settings
import wget

class ProfileView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ProfileSerializer

    def retrieve(self, request, username):
        if User.objects.filter(username=username).exists():
            user = User.objects.get(username=username)
            posts = user.author.posts.filter(
                is_deleted=False).order_by('-timestamp')

            is_author = False
            if request.user.username == username:
                is_author = True
            context = {
                'request': request
            }
            user_obj = ProfileSerializer(user.author, context=context)
            post_obj = PostSerializer(posts, many=True, context=context)
            response_obj = {
                'statusCode': 6000,
                'data': user_obj.data,
                'is_author': is_author,
                'posts': post_obj.data
            }
            return Response(response_obj)
        else:
            response_obj = {
                'statusCode': 6001,
                'message': 'User not found'
            }
            return Response(response_obj)


class EditProfileView(generics.RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = EditUserSerializer

    def get_object(self):
        return self.request.user


class GetUserDataView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = GetAuthor

    def retrieve(self, request):
        user = request.user
        user.refresh_from_db()
        author_data = GetAuthor(user.author, context={'request': request})
        image = author_data.data['image']

        response_data = {
            'username': user.username,
            'image': image
        }

        return Response(response_data)


class SearchView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = SearchSerializer

    def get_queryset(self):
        q = self.request.GET.get('q')
        users_instance = User.objects.filter(username__icontains=q)
        return users_instance

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        response_data = {
            'statusCode': 6000,
            'users': serializer.data
        }
        return Response(response_data)


class FollowUserView(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = FollowingSerializer


class GetFollowersView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = FollowingSerializer

    def get_queryset(self):
        username = self.kwargs.get('username')
        user = Author.objects.get(user__username=username)
        return user.followers.all()


class GetFollowingView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = FollowingSerializer

    def get_queryset(self):
        username = self.kwargs.get('username')
        user = Author.objects.get(user__username=username)
        return user.following.all()

