'use strict';

app.controller('ProfileCtrl', function($scope, $routeParams, Profile)
{
	var uid = $routeParams.userId;

	$scope.profile = Profile.get(uid);

	// because getPosts() returns a promise that resolves
	// to the data we want, we need to make sure we're
	// binding $scope.posts after the function finishes executing 
	Profile.getPosts(uid).then(function(posts)
	{
		$scope.posts = posts;
	});
});