/**
 * Cart service.
 */
(function() {
    angular.module('cart.services',["ui.bootstrap.modal"])
    .factory('Cart',function($http,$rootScope) {
        return {
            getData : function (responseCall) {
                $http.get("../cart.json").success(
                    function(data) {
                        responseCall(data.productsInCart);
                    }
                )
            },
            cartData : '',
            broadcastItem : function() {
                $rootScope.$broadcast('handleCartUpdateRequest');
            }
        }
    });
})();