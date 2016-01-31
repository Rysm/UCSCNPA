angular.module('app.routes', ['ionic', 'app.controllers', 'app.routes', 'app.services', 'app.directives','firebase','ngStorage', 'ngCordova','firebase','ngMessages'])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    .state('maps', {
      url: '/nearby',
      templateUrl: 'templates/maps.html',
      controller: 'mapsCtrl'
    })
      .state('login', {
      url: '/login',
      templateUrl: 'templates/login/login.html',
      controller:'loginController'
    })
    .state('forgot', {
      url: '/forgot',
      templateUrl: 'templates/forgot/forgotPassword.html',
      controller:'forgotController'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'templates/register/createAccount.html',
      controller:'registerController'
    })


    .state('menu.home', {
      url: '/home',
      views: {
        'side-menu21': {
          templateUrl: 'templates/home.html',
          controller: 'homeCtrl'
        }
      }
    })

    .state('menu.Search', {
      url: '/search',
      views: {
        'side-menu21': {
          templateUrl: 'templates/search.html',
          controller: 'SearchCtrl'
        }
      }
    })

    .state('menu', {
      url: '/home-menu',
      abstract:true,
      templateUrl: 'templates/menu.html'
    })

    .state('menu.requestEvent', {
      url: '/request',
      views: {
        'side-menu21': {
          templateUrl: 'templates/requestEvent.html',
          controller: 'RequestEventCtrl'
        }
      }
    })

    .state('menu.createEvent', {
      url: '/create',
      views: {
        'side-menu21': {
          templateUrl: 'templates/createEvent.html',
          controller: 'createEventCtrl'
        }
      }
    })

    .state('menu.editOrg', {
      url: '/edit',
      views: {
        'side-menu21': {
          templateUrl: 'templates/editOrg.html',
          controller: 'editOrgCtrl'
        }
      }
    })

    .state('menu.createOrg', {
      url: '/page7',
      views: {
        'side-menu21': {
          templateUrl: 'templates/createOrg.html',
          controller: 'createOrgCtrl'
        }
      }
    })

    .state('menu.profile', {
      url: '/profile',
      views: {
        'side-menu21': {
          templateUrl: 'templates/profile.html',
          controller: 'profileCtrl'
        }
      }
    })

    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
