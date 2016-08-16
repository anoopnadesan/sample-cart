/**
 * Cart app controllers.
 */
(function () {
    angular.module('cart.controllers', [])
        .controller('CartController', function ($scope, $state, $timeout, $window, $modal, Cart) {

            /* 
             * Load cart data using Cart service 
             */
            $scope.loadCart = function () {
                $scope.subtotal = 0;
                Cart.getData(function (data) {
                    $scope.cart = data;

                    /* 
                     * Discount calculation 
                     */
                    if ($scope.cart.length < 3)
                        $scope.discount = 0;
                    else if ($scope.cart.length == 3)
                        $scope.discount = .05;
                    else if ($scope.cart.length > 3 && $scope.cart.length < 11)
                        $scope.discount = .1;
                    else if ($scope.cart.length > 10)
                        $scope.discount = .25;

                    Cart.cartData = data;
                });
            };
            $scope.loadCart();

            /* 
             * Subtotal and discount calulatiion for each item 
             */
            $scope.setSubtotal = function (item) {
                if (item) {
                    $scope.subtotal += item.p_quantity * item.p_price;
                    $scope.discountAmount = $scope.discount * $scope.subtotal;
                }
            };

            /* 
             * Open edit modal window for selected item 
             */
            $scope.open = function (idx) {
                var modalInstance = $modal.open({
                    templateUrl: '../partials/cart-edit.html',
                    controller: 'CartEditController',
                    resolve: {
                        productIdx: function () {
                            return idx;
                        }
                    }
                });
            };

            /* 
             * Cart update request handler 
             */
            $scope.$on('handleCartUpdateRequest', function () {
                $scope.cart = Cart.cartData;
                $scope.updateSubtotal();
            });

            /* 
             * Update cart info with quantity 
             */ 
            $scope.changeCart = function (val) {
                /* Validation pending */
                //if(!isNaN(val) && val>0) {
                    Cart.cartData = $scope.cart;
                    $scope.updateSubtotal();
                //}
            };

            /* 
             * Updating subtotal and discount for all items 
             */
            $scope.updateSubtotal = function () {
                $scope.subtotal = 0;
                angular.forEach($scope.cart, function (item, index) {
                    $scope.setSubtotal(item);
                });
            };
        })
        .controller('CartEditController', function ($scope, $state, $stateParams, $modalInstance, Cart, productIdx) {
            
            /* 
             * Product info from cart service data 
             */
            $scope.product = Cart.cartData[productIdx];

            /* 
             * Close edit modal window 
             */
            $scope.close = function () {
                $modalInstance.dismiss('cancel');
            };

            /* 
             * Update cart information after edit 
             */
            $scope.updateCart = function () {
                $scope.product.p_quantity = $scope.qty_selected.value;
                Cart.cartData[productIdx] = $scope.product;
                Cart.broadcastItem();
                $scope.close();
            };

            /*
             * Item quantity info updated 
             */
            $scope.qty_selected = {'label':$scope.product.p_quantity,'value':$scope.product.p_quantity};

            /*
             * Sample array data quantity dropdown 
             */
            $scope.qty_array =
                (function (start, len) {
                    var arr = [];
                    for (let iqty = start; iqty <= len; iqty++)
                        arr.push({ 'label': iqty, 'value': iqty });
                    return arr;
                })(1, 100);
        });
})();