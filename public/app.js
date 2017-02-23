(function() {


    angular.module('happyApp', ['epControllers', 'epFactory','prodFactory', 'ui.router', 'countrySelect', 'jsPDF', 'docFactory', 'historyFactory'])
      .config(MainRouter)

      function MainRouter ($stateProvider, $urlRouterProvider, $httpProvider){

      $stateProvider
        .state('HomePage', {
          url: '/',
          templateUrl: '/html/home.html'
        })
      $stateProvider
        .state('DocumentsPage', {
          url: '/Docs',
          templateUrl: '/html/docs.html'
        })
      $stateProvider
        .state('HistoryPage', {
          url: '/Hist',
          templateUrl:'/html/po.html'
        })


        $urlRouterProvider.otherwise('/')
    }


}());
