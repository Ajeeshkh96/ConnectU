from django.urls import path
from . import views

urlpatterns = [
    path('UserList/', views.UserList.as_view(), name="user-list"),
    path('UserStatusUpdate/<int:user_id>/', views.UserStatusUpdate.as_view(), name="user-status-update"),
    path('admin_login/', views.AdminLoginView.as_view(), name='admin-login'),
    path('admin_logout/', views.AdminLogoutView.as_view(), name='admin-logout'),

    path('UserPost/', views.UserPost.as_view(), name="user-post"),
    path('UserPostDelete/<int:post_id>/', views.UserPostDelete.as_view(), name="user-post-delete"),
]
