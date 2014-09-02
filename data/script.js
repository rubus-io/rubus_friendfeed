var App = angular.module('App', []);


App.controller('FriendFeedCtrl', ['$scope', '$http', '$sce', function($scope, $http, $sce) {

  $scope.parsing = true;

  $http.jsonp('entries.jsonp?callback=JSON_CALLBACK')
    .success(function(data){

            var posts = [];
            var text;
            var likes = [];
            var comments = [];

            for (var i=0; i<data.length; i++) {

                text = data[i].body;
                text = $sce.trustAsHtml(text);

                if (data[i].likes) {
                    likes = data[i].likes;
                } else {
                    likes = [];
                }

                if (data[i].comments) {
                    for (var j=0; j<data[i].comments.length; j++) {
                        data[i].comments[j].body = $sce.trustAsHtml(data[i].comments[j].body);
                    }
                    comments = data[i].comments;
                } else {
                    comments = [];
                }

                posts.push({
                    text : text,
                    likes : likes,
                    comments : comments,
                });

            }

            $scope.posts = posts;
            $scope.parsing = false;
        });
}]);
