angular.module('poolService', [])

	// super simple service
	// each function returns a promise object
	.factory('Pools', ['$http',function($http) {
		return {
			get : function(id) {
				return $http.get('/api/pools/' + id);
			},
			create : function(poolData) {
				return $http.post('/api/pools', poolData);
			},
			delete : function(id) {
				return $http.delete('/api/pools/' + id);
			}
		}
	}]);
