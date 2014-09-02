var App = angular.module('App', []);


App.controller('FriendFeedCtrl', ['$scope', '$http', '$sce', function($scope, $http, $sce) {

  $scope.parsing = true;

  $http.jsonp('entries.jsonp?callback=JSON_CALLBACK')
    .success(function(data){

            var posts = [];
            var text;
            var likes = [];

            for (var i=0; i<data.length; i++) {

                text = data[i].body;
                text = $sce.trustAsHtml(text);

                if (data[i].likes) {
                    likes = data[i].likes;
                } else {
                    likes = [];
                }

                posts.push({
                    text : text,
                    likes : likes,
                });

            }

            $scope.posts = posts;
            $scope.parsing = false;
        });
}]);
