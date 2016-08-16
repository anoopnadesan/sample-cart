/**
 * Cart app, routing.
 */
(function() {
    angular.module('cart',['ui.router','ui.bootstrap','cart.controllers','cart.services']);
    
    angular.module('cart').config(function($stateProvider,$urlRouterProvider,$httpProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider.state('cart',{
            url:'/cart',
            templateUrl:'partials/cart.html',
            controller:'CartController'
        });
    })
    .run(function($state){
        $state.go('cart');
    });
})();