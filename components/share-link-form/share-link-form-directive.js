angular.module('shareLinkForm', ['siteInfo'])
.directive('shareLinkForm', ['$http', '$state', '$stateParams', 'getSiteInfo', function(
  $http,
  $state,
  $stateParams,
  getSiteInfo
) {

  return {
    restrict: 'EA',
    scope: {
      friend: '='
    },
    templateUrl: '/components/share-link-form/share-link-form.html',
    link: function( scope, $ele, $attrs ) {

      getSiteInfo().then(function(response) {

        scope.url = response.url;
        scope.title = response.title;
        scope.image = response.favIconUrl;

      }) // getSiteInfo()

      scope.shareLink = function(friendID) {

        var promise = $http({
          url: 'https://mybaskets.herokuapp.com/sent_link',
          dataType: 'json',
          method: 'POST',
          params: {
            url: scope.url,
            title: scope.title,
            message: scope.message,
            description: '',
            image: scope.image,
            uniqueId: friendID
          },
          headers: {'Content-Type': 'application/json'}
        }).success(function(response) {

          $state.go('friends.success')

        }).error(function(response) {

          return {'status': false};

        })
        
      } // saveLink()

    } // link

  } // return

}]) 