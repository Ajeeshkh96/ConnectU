from django.db.models import Q
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from posts.models import Posts, Comment, PostImages
from .serializer import PostSerializer, PostIdSerializer, CommentsSerializer
from django.contrib.auth.models import User
from users.models import Author
from rest_framework.decorators import api_view, permission_classes


class GetPostsView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PostSerializer

    def get_queryset(self):
        following_users = self.request.user.author.following.all()
        posts = []

        for user in following_users:
            user_posts = user.posts.all()
            for post in user_posts:
                posts.append(post)
        return posts


class LikePostView(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PostSerializer

    def update(self, request, post_id):
        author = request.user.author

        if Posts.objects.filter(id=post_id).exists():
            post = Posts.objects.get(id=post_id)

            if author.liked_posts.filter(id=post_id).exists():
                post.likes.remove(author)
                like_count = post.likes.count()
                response_obj = {
                    'status': 'success',
                    'liked': False,
                    'count': like_count
                }
                return Response(response_obj)
            else:
                post.likes.add(author)
                like_count = post.likes.count()
                response_obj = {
                    'status': 'success',
                    'liked': True,
                    'count': like_count
                }
                return Response(response_obj)
        else:
            response_obj = {
                'statusCode': 6001,
                'message': 'Post Not Found',
            }
            return Response(response_obj)


class SavePostView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PostSerializer

    def retrieve(self, request, post_id):
        author = request.user.author

        if Posts.objects.filter(id=post_id).exists():
            post = Posts.objects.get(id=post_id)

            if author.saved_posts.filter(id=post_id).exists():
                author.saved_posts.remove(post)
                response_obj = {
                    'status': 'success',
                    'saved': False
                }
            else:
                author.saved_posts.add(post)
                response_obj = {
                    'status': 'success',
                    'saved': True
                }

            return Response(response_obj)


class CreatePostView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PostSerializer

    def create(self, request):
        images = request.data.getlist('images')

        new_post = Posts.objects.create(
            author=request.user.author,
            description=request.data['description'],
            location=request.data['location']
        )

        for image in images:
            PostImages.objects.create(
                post=new_post,
                image=image
            )

        post = PostSerializer(new_post, context={'request': request})
        response_obj = {
            'statusCode': 6000,
            'data': post.data
        }

        return Response(response_obj)


class GetPostView(generics.RetrieveAPIView):
    queryset = Posts.objects.filter(is_deleted=False)
    serializer_class = PostSerializer

    def retrieve(self, request, *args, **kwargs):
        post_id = kwargs.get('post_id')
        queryset = self.get_queryset().filter(id=post_id)
        if queryset.exists():
            post = queryset.first()
            serializer = self.get_serializer(post)
            response_data = {
                'statusCode': 6000,
                'data': serializer.data
            }
            return Response(response_data)
        else:
            response_data = {
                'statusCode': 6001,
                'message': 'Post not found'
            }
            return Response(response_data)


class SavedPostsView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PostIdSerializer

    def get_queryset(self):
        return self.request.user.author.saved_posts.filter(is_deleted=False)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        response_data = {
            'statusCode': '6000',
            'data': serializer.data
        }
        return Response(response_data)


class DeletePostView(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PostSerializer

    def update(self, request, post_id):
        if Posts.objects.filter(id=post_id).exists():
            post = Posts.objects.get(id=post_id)
            post.is_deleted = True
            post.save()
            response_data = {
                'statusCode': 6000,
                'message': f'post with id {post_id} is deleted successfully'
            }
            return Response(response_data)
        response_data = {
            'statusCode': 6000,
            'message': f'post with {post_id} is deleted successfully'
        }
        return Response(response_data)


class UpdatePostView(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PostSerializer

    def get_queryset(self):
        post_id = self.kwargs['post_id']
        return Posts.objects.filter(id=post_id)


class CreateCommentView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CommentsSerializer

    def create(self, request, post_id):
        message = request.data.get('message')
        if message is not None:
            author = request.user.author
            post = Posts.objects.get(id=post_id)
            new_comment = Comment.objects.create(
                author=author,
                message=message,
                post=post
            )
            serialized_data = CommentsSerializer(
                new_comment, context={'request': request})

            response_data = {
                'statusCode': 6000,
                'data': serialized_data.data
            }
            return Response(response_data)
        else:
            response_data = {
                'statusCode': 6001,
                'message': 'Comment message cannot be blank'
            }
            return Response(response_data)


class DeleteCommentView(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CommentsSerializer

    def get_queryset(self):
        comment_id = self.kwargs['comment_id']
        return Comment.objects.filter(id=comment_id)

