from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from users.models import Author
from posts.models import Posts, PostImages
from django.contrib.auth import logout
from django.shortcuts import get_object_or_404
from django.conf import settings
import os


class AdminLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return JsonResponse({'message': 'Login successful'})
        else:
            return JsonResponse({'message': 'Login failed'}, status=401)

class AdminLogoutView(APIView):
    def post(self, request):
        logout(request)
        request.session.flush()
        return Response({'message': 'Logged out successfully'}, status=status.HTTP_200_OK)


class UserList(APIView):
    def get(self, request):
        authors = Author.objects.all()
        # Serialize user data to JSON
        author_data = [{'id': author.id, 'username': author.user.username, 'is_active': author.user.is_active, 'is_staff': author.user.is_staff, 'email': author.user.email} for author in authors]
        return Response(author_data)


class UserStatusUpdate(APIView):
    def put(self, request, user_id):
        try:
            author = Author.objects.get(id=user_id)
            user = User.objects.get(author=author)
            user.is_active = not user.is_active  # Toggle the is_active field (True to False or vice versa)
            user.save()
            return Response({'message': 'User status updated successfully'}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)


class UserPost(APIView):
    def get(self, request):
        posts = Posts.objects.all()
        post_data = []

        for post in posts:
            image = PostImages.objects.filter(post=post).first()
            image_url = image.image.url if image else None

            if image_url:
                # Construct the local URL using localhost
                local_host_url = "http://localhost:8000"
                # Remove the leading '/' from image_url if it exists
                if image_url.startswith("/"):
                    image_url = image_url[1:]
                filepath = f"{local_host_url}/{image_url}"
            else:
                filepath = None

            post_data.append({
                'id': post.id,
                'username': post.author.user.username,
                'email': post.author.user.email,
                'image': filepath,
            })
        return Response(post_data)


class UserPostDelete(APIView):

    def get(self, request):
        posts = Posts.objects.all()
        post_data = []

        for post in posts:
            image = PostImages.objects.filter(post=post).first()
            image_url = image.image.url if image else None
            post_data.append({
                'id': post.id,
                'username': post.author.user.username,
                'email': post.author.user.email,
                'image': image_url,
            })

        return Response(post_data)

    def delete(self, request, post_id):
        post = get_object_or_404(Posts, id=post_id)
        # Check if the user has permission to delete the post here.
        # Perform the post deletion.
        post.delete()
        return JsonResponse({'message': 'Post deleted successfully'})


