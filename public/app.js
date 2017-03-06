(function() {
  'use strict';

  angular.module('happyApp', ['ui.router', 'happyShipService', 'epControllers', 'epFactory', 'prodFactory', 'countrySelect', 'jsPDF', 'docFactory', 'historyFactory'])
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
        params: {
          poNum: null
        },
        templateUrl: '/html/docs.html',
        resolve: {
          poNum: function(poFactory, $transtion$) {
            console.log($transtion$.params().poNum)
            return poFactory.getOnePO($transtion$.params().poNum)
          }
        }
      })
    $stateProvider
      .state('HistoryPage', {
        url: '/Hist',
        templateUrl: '/html/po.html'
      })

    $urlRouterProvider.otherwise('/')
  }
}());
