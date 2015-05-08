'use strict';

// inject Post service from post.js
app.controller('PostsCtrl', function ($scope, $location, Post, Auth)
{
  $scope.posts = Post.all;
  $scope.user = Auth.user;
});