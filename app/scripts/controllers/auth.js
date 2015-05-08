'use strict';

// injecting user from the resolve property
app.controller('AuthCtrl', function ($scope, $location, Auth, user)
{
	// If it's populated (they are already logged in)
	if (user)
	{
		// automatically redirect them to the homepage
		$location.path('/');
	}

	// takes a user object from the $scope and sends it to Auth.register
	$scope.register = function ()
	{
		Auth.register($scope.user).then(function(user)
		{
			// call Auth.login on our user object after registration is
			// successful in order to log in the user we created
			return Auth.login($scope.user).then(function()
			{
				user.username = $scope.user.username;
				return Auth.createProfile(user);
			})
			.then(function()
			{
				// then redirect them to the homepage
				$location.path('/');
			});
		},
		function(error)
		{
	      $scope.error = error.toString();
	    });		
	};

	$scope.login = function () {

		// passes a user to the Auth.login() method, then redirects
		Auth.login($scope.user).then(function ()
		{
			$location.path('/');
		}, function (error) {
			$scope.error = error.toString();
		});
	};
});