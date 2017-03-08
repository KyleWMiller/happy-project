(function() {
  'use strict';

  angular.module('happyApp', ['ui.router', 'epControllers', 'epFactory', 'prodFactory', 'countrySelect', 'jsPDF', 'docFactory', 'historyFactory'])
    .config(MainRouter)

  function MainRouter($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('HomePage', {
        url: '/',
        templateUrl: '/html/home.html'
      })
    $stateProvider
      .state('DocumentsPage', {
        url: '/Docs/:poNum',
        templateUrl: '/html/docs.html'
      })
    $stateProvider
      .state('HistoryPage', {
        url: '/Hist',
        templateUrl: '/html/po.html'
      })

    $urlRouterProvider.otherwise('/')
  }
}());
