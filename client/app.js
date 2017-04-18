var app = angular.module('friendApp',['ngRoute']);

/////////////////////// ROUTES ///////////////////////
app.config(function($routeProvider){
  $routeProvider
    .when('/new',{
      templateUrl:'../partials/new.html',
      controller: 'newController'
    })
    .when('/edit/:_id',{
      templateUrl:'../partials/edit.html',
      controller: 'editController'
    })
    .otherwise('/');
});


/////////////////////// FACTORIES ///////////////////////
app.factory('friendsFactory', function($http){
  var friends=[];
  var factory = {};


  factory.allFriends = function(callback){
    $http.get('/friends').then(function(response){
      friends = response.data
      console.log(friends)
      callback(friends);
    })
  }

  factory.getFriend = function(id,callback){
    $http.get('/friends/'+id).then(function(response){
      friend = response.data;
      console.log(friend);
      callback(friend)
    })
  }

  factory.addFriends = function(newFriend, callback){

    console.log("CREATE STEP 2: A Request was made to your server to POST /friends fromyour factory with the following data:", newFriend);

    $http.post('/friends',newFriend).then(function(returned_data){
      console.log("CREATE Step 3: Your server has completed the request(with a response) and gave you back this data:", returned_data);
      friend = returned_data.data;

      console.log("CREATE Step 4: The data from the server was set to a private variable to store in the factory",friend);
      callback(returned_data.data);

    }).catch(function(error){
      console.log(error)
    })
  }

  factory.deleteFriend = function(currentFriend, callback){
    console.log('Hit the Factory')
    $http.delete('/friends/'+currentFriend._id).then(function(response){
    console.log('Return from hitting the DB');
    console.log(response.data);
    callback();
    })
  }

  factory.updateFriends = function(editedFriend, callback){
  }
  return factory;
})

/////////////////////// CONTROLLERS ///////////////////////

app.controller('editController', function($scope, $routeParams, $location, friendsFactory){
  console.log('editController Engaged')
  console.log($routeParams)
  $scope.currentFriend = {};

  friendsFactory.getFriend($routeParams._id, function(friend){
    $scope.currentFriend = friend
    // console.log($scope)
  });

  $scope.updateFriend = function(){
    friends.Factory.updateFriend($scope.currentFriend, function(return_data){
      console.log(return_data);
    });
  }

  $scope.deleteFriend = function(currentFriend){
    console.log('this works')
    console.log(currentFriend)
    friendsFactory.deleteFriend(currentFriend, function(){
    $location.url('/')
    })
  }
});

app.controller('newController', function($scope, friendsFactory){
  $scope.friends = [];

  friendsFactory.allFriends(function(friends){
    $scope.friends = friends
  });

  $scope.addFriend = function(){
    console.log('CREATE FRIEND PROCESS INITIATED', $scope.newFriend);
    console.log("CREATE Step 1: The Controller is calling the factory's create() function and passing a friend object and a callback", $scope.newFriend)

    friendsFactory.addFriends($scope.newFriend, function(newFriendAfterServer){
      console.log("CREATE Step 5: The response data was sent back to the controller via a callback parameter:", newFriendAfterServer);

    $scope.createdFriend = newFriendAfterServer;
      console.log("CREATE Step 6: The data was then assigned to self/scope, so that the view will update with the new data")
    })
  }
});
