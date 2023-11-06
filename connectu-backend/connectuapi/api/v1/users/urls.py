from django.urls import path
from . import views


urlpatterns = [
    path('update/',views.EditProfileView.as_view()),
    path('get-user-data/',views.GetUserDataView.as_view()),
    path('search/',views.SearchView.as_view()),
    path('<str:user_id>/follow/',views.FollowUserView.as_view()),
    path('<str:username>/',views.ProfileView.as_view()),
    path('<str:username>/followers/',views.GetFollowersView.as_view()),
    path('<str:username>/following/',views.GetFollowingView.as_view()),
]