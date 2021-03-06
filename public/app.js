(function() {
  'use strict';

  angular.module('happyApp', ['ui.router', 'epController', 'epFactory', 'prodFactory', 'countrySelect', 'jsPDF', 'docFactory', 'historyFactory'])
    .config(MainRouter)
    .directive('realTimeCurrency', realTimeCurrency)

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
    // Does not exist yet, but built for a db crawling window
    // $stateProvider
    //   .state('HistoryPage', {
    //     url: '/Hist',
    //     templateUrl: '/html/po.html'
    //   })

    $urlRouterProvider.otherwise('/')
  }

  function sharable(){

  }

  function realTimeCurrency($filter, $locale) {
    var decimalSep = $locale.NUMBER_FORMATS.DECIMAL_SEP
    var toNumberRegex = new RegExp('[^0-9\\' + decimalSep + ']', 'g')
    var trailingZerosRegex = new RegExp('\\' + decimalSep + '0+$')
    var filterFunc = function(value) {
      return $filter('currency')(value)
    }

    function getCaretPosition(input) {
      if (!input) return 0
      if (input.selectionStart !== undefined) {
        return input.selectionStart
      } else if (document.selection) {
        // Curse you IE
        // HAHA
        input.focus()
        var selection = document.selection.createRange()
        selection.moveStart('character', input.value ? -input.value.length : 0)
        return selection.text.length
      }
      return 0
    }

    function setCaretPosition(input, pos) {
      if (!input) return 0
      if (input.offsetWidth === 0 || input.offsetHeight === 0) {
        return // Input's hidden
      }
      if (input.setSelectionRange) {
        input.focus()
        input.setSelectionRange(pos, pos)
      } else if (input.createTextRange) {
        // Curse you IE
        // ROFL
        var range = input.createTextRange()
        range.collapse(true)
        range.moveEnd('character', pos)
        range.moveStart('character', pos)
        range.select()
      }
    }

    function toNumber(currencyStr) {
      return parseFloat(currencyStr.replace(toNumberRegex, ''), 10)
    }

    return {
      restrict: 'A',
      require: 'ngModel',
      link: function postLink(scope, elem, attrs, modelCtrl) {
        modelCtrl.$formatters.push(filterFunc)
        modelCtrl.$parsers.push(function(newViewValue) {
          var oldModelValue = modelCtrl.$modelValue
          var newModelValue = toNumber(newViewValue)
          modelCtrl.$viewValue = filterFunc(newModelValue)
          var pos = getCaretPosition(elem[0])
          elem.val(modelCtrl.$viewValue)
          var newPos = pos + modelCtrl.$viewValue.length -
            newViewValue.length
          if ((oldModelValue === undefined) || isNaN(oldModelValue)) {
            newPos -= 3
          }
          setCaretPosition(elem[0], newPos)
          return newModelValue
        })
      }
    }
  }

}());
