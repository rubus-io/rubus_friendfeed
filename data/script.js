var App = angular.module('App', []);


App.controller('FriendFeedCtrl', ['$scope', '$http', '$sce', function($scope, $http, $sce) {

  $scope.parsing = true;

  $http.jsonp('entries.jsonp?callback=JSON_CALLBACK')
    .success(function(data){

            var posts = [];
            var text;
            var likes = [];
            var comments = [];
            var url;
            var date;
            var thumbnails = [];

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

                url = data[i].url.replace( /^http:/, "https:" );
                date = data[i].date.replace( /^(.*)T(.*)Z$/, "$1 $2");

                var thumbnails = [];
                if (data[i].thumbnails) {
                    for (var j=0; j<data[i].thumbnails.length; j++) {
                        if (data[i].thumbnails[j].player == undefined) {

                            small_img = data[i].thumbnails[j].url.replace( /^.*\/(.*)$/, "$1");
                            big_img = data[i].thumbnails[j].link.replace( /^.*\/(.*)$/, "$1");

                            thumbnails.push({
                                height : data[i].thumbnails[j].height,
                                width : data[i].thumbnails[j].width,
                                small_img : small_img,
                                big_img : big_img,
                            });
                        }
                    }
                }

                posts.push({
                    text : text,
                    likes : likes,
                    comments : comments,
                    url : url,
                    date : date,
                    thumbnails : thumbnails,
                });

            }

            $scope.posts = posts;
            $scope.parsing = false;
        });
}]);
