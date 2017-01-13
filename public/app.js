(function() {


    angular.module('happyApp', ['epControllers', 'epFactory','prodFactory', 'ui.router', 'countrySelect'])
      .config(MainRouter)

      function MainRouter ($stateProvider, $urlRouterProvider, $httpProvider){

      $stateProvider
        .state('HomePage', {
          url: '/',
          templateUrl: '/html/home.html'
        })

        $urlRouterProvider.otherwise('/')
    }


}());
