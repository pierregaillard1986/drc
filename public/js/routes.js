const routes = ($routeProvider, $httpProvider, $locationProvider) => {
    $locationProvider.html5Mode(false).hashPrefix('');
    $routeProvider
        .when('/', {
            templateUrl: 'views/main.html',
            controller: 'mainController',
            controllerAs: 'vm',
            // resolve: {
            //     connected: checkIsConnected
            // }
        })
        .when('/login', {
          templateUrl: 'views/login.html',
          controller: 'loginController',
          controllerAs: 'vm'
        })
        .when('/microsPoussins', {
            templateUrl: 'views/users/rugbySchoolController/microsPoussinsController.html',
            controller: 'microsPoussinsController',
            controllerAs: 'vm'
        })
        .when('/miniPoussins', {
            templateUrl: 'views/users/rugbySchoolController/miniPoussinsController.html',
            controller: 'miniPoussinsController',
            controllerAs: 'vm'
        })
        .when('/Poussins', {
            templateUrl: 'views/users/rugbySchoolController/PoussinsController.html',
            controller: 'PoussinsController',
            controllerAs: 'vm'
        })
        .when('/benjamins', {
            templateUrl: 'views/users/rugbySchoolController/benjaminsController.html',
            controller: 'benjaminsController',
            controllerAs: 'vm'
        })
        .when('/minimes', {
            templateUrl: 'views/users/rugbySchoolController/minimesController.html',
            controller: 'minimesController',
            controllerAs: 'vm'
        })
        .when('/cadets', {
            templateUrl: 'views/users/cadetJuniorsController/cadetsController.html',
            controller: 'cadetsController',
            controllerAs: 'vm'
        })
        .when('/juniors', {
            templateUrl: 'views/users/cadetJuniorsController/juniorsController.html',
            controller: 'juniorsController',
            controllerAs: 'vm'
        })
        .when('/seniors', {
            templateUrl: 'views/users/seniorsController/seniorsController.html',
            controller: 'seniorsController',
            controllerAs: 'vm'
        })

        .otherwise({
            redirectTo: '/'
        });

    $httpProvider.interceptors.push(($q, $location, $rootScope, $window, sessionFactory) => {
        return {
            request(config) {

                config.headers = config.headers || {};
                if ($window.localStorage.token) {
                    sessionFactory.token = $window.localStorage.token;
                    sessionFactory.user = JSON.parse($window.localStorage.getItem('currentUser'));
                    config.headers.authorization = $window.localStorage.token;
                }
                return config;
            },
            responseError(response) {
                if (response.status === 401 || response.status === 403) {
                    $rootScope.$emit('loginStatusChanged', false);
                    $location.path('/login');
                }
                return $q.reject(response);
            }
        };
    });

};

const loginStatus = ($rootScope, $window, sessionFactory) => {

    if ($window.localStorage.currentUser) {
        sessionFactory.user = JSON.parse($window.localStorage.getItem('currentUser'));
    }

    $rootScope.$on('loginStatusChanged', (event, isLogged) => {
        $window.localStorage.setItem('currentUser', JSON.stringify(sessionFactory.user));
        $window.localStorage.token = sessionFactory.token;
        sessionFactory.isLogged = isLogged;
    });

};

const checkIsConnected = ($q, $http, $location, $window, $rootScope) => {
    let deferred = $q.defer()

    $http.get('/api/loggedin').then(() => {
        $rootScope.$emit('loginStatusChanged', true);
        // Authenticated
        deferred.resolve();
    }).catch(() => {
        $window.localStorage.removeItem('token');
        $window.localStorage.removeItem('currentUser');
        $rootScope.$emit('loginStatusChanged', false);
        // Not Authenticated
        deferred.reject();
        $location.url('/login');
    });

    return deferred.promise;
};
