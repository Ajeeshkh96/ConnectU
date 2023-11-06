from django.urls import path
from . import views

urlpatterns = [
    path('all/', views.GetPostsView.as_view()),
    path('create-new/', views.CreatePostView.as_view()),
    path('saved-posts/', views.SavedPostsView.as_view()),
    path('<str:post_id>/', views.GetPostView.as_view()),
    path('<str:post_id>/update/', views.UpdatePostView.as_view()),
    path('<str:post_id>/delete/', views.DeletePostView.as_view()),
    path('<str:post_id>/like/', views.LikePostView.as_view()),
    path('<str:post_id>/save-post/', views.SavePostView.as_view()),
    path('<str:post_id>/comments/create/', views.CreateCommentView.as_view()),
    path('comments/<str:comment_id>/delete/', views.DeleteCommentView.as_view()),
]