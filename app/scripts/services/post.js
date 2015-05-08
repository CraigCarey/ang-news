'use strict';

app.factory('Post', function ($firebase, FIREBASE_URL)
{
	var ref = new Firebase(FIREBASE_URL);
	var posts = $firebase(ref.child('posts')).$asArray();

	var Post = {

		all: posts,		
		create: function (post)
		{
		  return posts.$add(post).then(function(postRef)
		  {
		  	// By storing this list of posts in a different collection than
		  	// /profile/<uid>, we're able to retrieve a users username and
		  	// md5_hash without also having to download a list of all their posts.
		  	$firebase(ref.child('user_posts').child(post.creatorUID))
		  					.push(postRef.name());
		  });
		},
		get: function (postId)
		{
		  return $firebase(ref.child('posts').child(postId)).$asObject();
		},
		delete: function (post)
		{
		  return posts.$remove(post);
		},
		comments: function (postId) {
		  return $firebase(ref.child('comments').child(postId)).$asArray();
		}
	};

	return Post;
});

