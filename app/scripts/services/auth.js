'use strict';

// injecting the $firebaseSimpleLogin service
app.factory('Auth',
function ($firebaseSimpleLogin, $firebase, FIREBASE_URL, $rootScope)
{
	var ref = new Firebase(FIREBASE_URL);
	var auth = $firebaseSimpleLogin(ref);

	var Auth = {
		/*jshint camelcase: false */

		register: function (user)
		{
			return auth.$createUser(user.email, user.password);
		},
		createProfile: function (user)
		{
			var profile = {
				username: user.username,
				md5_hash: user.md5_hash
			};
			var profileRef = $firebase(ref.child('profile'));
			return profileRef.$set(user.uid, profile);
		},
		login: function (user)
		{
			// provider is password
			return auth.$login('password', user);
		},
		logout: function ()
		{
			auth.$logout();
		},
		resolveUser: function ()
		{
			return auth.$getCurrentUser();
		},
		signedIn: function ()
		{
			return !!Auth.user.provider;
		},
		user: {}
	};

	// event listeners in rootScope
	// $rootScope is similar to $scope but is global across the entire application
	$rootScope.$on('$firebaseSimpleLogin:login', function(e, user)
	{
		angular.copy(user, Auth.user);

		// retrieve user profile on login
		// using AngularFire's $asObject() method to create a dynamic link to a user's profile
		Auth.user.profile = $firebase(ref.child('profile').child(Auth.user.uid)).$asObject();
		console.log('logged in');
		console.log(Auth.user);
		
	});

	$rootScope.$on('$firebaseSimpleLogin:logout', function()
	{
		console.log('logged out');

		// destroy link to profile on log out
		if(Auth.user && Auth.user.profile)
		{
			Auth.user.profile.$destroy();
		}

		angular.copy({}, Auth.user);
	});

	return Auth;
});