from django.contrib.auth.models import User
from rest_framework import serializers
from users.models import Author


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name', 'username', 'email')




class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Author
        fields = ('id','name','user','image','bio','created_at')

class EditAuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ('name', 'bio')


class EditUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email',)


class GetAuthor(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ('id','name', 'bio', 'image')


class SearchSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('username', 'image', 'id')

    def get_image(self, instance):
        request = self.context.get('request', None)
        return request.build_absolute_uri(instance.author.image.url)