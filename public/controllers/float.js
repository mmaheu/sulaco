angular.module('floatController', [])

  // inject the pool service factory into our controller
  .controller('floatController', ['$scope','$http','Pools', function($scope, $http, Pools) {
    $scope.formData = {};
    $scope.loading = true;

    // GET =====================================================================
    // when landing on the page, get all pools and show them
    // use the service to get all the pools
    Pools.get()
      .success(function(data) {
        $scope.pools = data;
        $scope.loading = false;
      });

    // CREATE ==================================================================
    // when submitting the add form, send the text to the node API
    $scope.createPool = function() {

      // validate the formData to make sure that something is there
      // if form is empty, nothing will happen
      if ($scope.formData.text != undefined) {
        $scope.loading = true;

        // call the create function from our service (returns a promise object)
        Pools.create($scope.formData)

          // if successful creation, call our get function to get all the new pools
          .success(function(data) {
            $scope.loading = false;
            $scope.formData = {}; // clear the form so our user is ready to enter another
            $scope.pools = data; // assign our new list of pools
          });
      }
    };

    // DELETE ==================================================================
    // delete a pool after checking it
    $scope.deletePool = function(id) {
      $scope.loading = true;

      Pools.delete(id)
        // if successful creation, call our get function to get all the new pools
        .success(function(data) {
          $scope.loading = false;
          $scope.pools = data; // assign our new list of pools
        });
    };
  }]);
