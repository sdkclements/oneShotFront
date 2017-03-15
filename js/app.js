//code goes here suckas


angular
    .module("oneshot", [
        "ui.router",
        "ngResource"
    ])

.config([
    "$stateProvider",
    RouterFunction
])

.factory("OneShotFactory", [
    "$resource",
    OneShotFactoryFunction
])



.controller("TabIndexController", [
    "OneShotFactory",
    TabIndexControllerFunction
])

.controller("TabNewController", [
    "OneShotFactory",
    "$state",
    TabNewControllerFunction
])

.controller("TabShowController", [
    "OneShotFactory",
    "$stateParams",
    TabShowControllerFunction
])




//Shots Controllers//
.controller("ShotIndexController", [
    "OneShotFactory",
    ShotIndexControllerFunction
])

.controller("ShotNewController", [
    "OneShotFactory",
    "$state",
    ShotNewControllerFunction
])

.controller("ShotShowController", [
    "OneShotFactory",
    "$stateParams",
    ShotShowControllerFunction
])

//Chasers Controllers//

.controller("ChaserNewController", [
    "OneShotFactory",
    "$state",
    ChaserNewControllerFunction
])

.controller("ChaserShowController", [
    "OneShotFactory",
    "$stateParams",
    ChaserShowControllerFunction
])



function RouterFunction($stateProvider) {
    $stateProvider
        .state("tabIndex", {
            url: "/tabs",
            templateUrl: "js/ng-views/index.html",
            controller: "TabIndexController",
            controllerAs: "vm"
        })

    .state("tabShow", {
        url: "/tabs/:id",
        templateUrl: "js/ng-views/show.html",
        controller: "TabShowController",
        controllerAs: "vm"
    })
    .state("shotIndex", {
        url: "/tabs/:tab_id/shots",
        templateUrl: "js/ng-views/shot-index.html",
        controller: "ShotIndexController",
        controllerAs: "vm"
    })
    .state("shotShow", {
        url: "/tabs/:tab_id/shots/:id",
        templateUrl: "js/ng-views/shot-show.html",
        controller: "ShotIndexController",
        controllerAs: "vm"
    })
}

function OneShotFactoryFunction($resource) {

    return {
        tabs: $resource("http://localhost:3000/tabs/:id.json", {}, {
            query: {
                method: "GET",
                params: {},
                isArray: true
            },
            get: {
                method: "GET",
                params: {},
                isArray: false
            },
            create: {
                method: "POST"
            },
            update: {
                method: "PUT"
            }
        }),
        shots: $resource("http://localhost:3000/tabs/:tab_id/shots.json", {}, {
            query: {
                method: "GET",
                params: {},
                isArray: true
            },
            get: {
                method: "GET",
                params: {},
                isArray: false
            }
        }),
        chasers: $resource("http://localhost:3000/tabs/:tab_id/shots/:shot_id/chasers.json", {}, {
            query: {
                method: "GET",
                params: {},
                isArray: true
            },
            get: {
                method: "GET",
                params: {},
                isArray: false
            }
        })

    }
}





//Tabs Functions//
function TabIndexControllerFunction(OneShotFactory) {
    this.tabs = OneShotFactory.tabs.query()
    

}

function TabNewControllerFunction(OneShotFactory) {
    this.tab = new OneShotFactory.tabs;
    this.create = function() {
        this.tab.$save(function(tab) {
            $state.go("tabShow", {
                id: tab.id
            })
        })
    }
}

function TabShowControllerFunction(OneShotFactory, $stateParams) {
    this.tab = OneShotFactory.tabs.get({
        id: $stateParams.id
    })
    
    this.shots = OneShotFactory.shots.query({
        tab_id: $stateParams.id
    
    })
    
}

//Shots Functions//
function ShotIndexControllerFunction(OneShotFactory) {
    this.shots = OneShotFactory.shots.query()
}

function ShotNewControllerFunction(OneShotFactory) {
    this.shot = new OneShotFactory.shots;
    this.create = function() {
        this.shot.$save(function(tab) {
            $state.go("tabShow", {
                id: tab.id
            })
        })
    }
}

function ShotShowControllerFunction(OneShotFactory, $stateParams) {
    this.shot = OneShotFactory.shots.get({
        tab_id: $stateParams.id
    });
}

//Chasers Functions//
function ChaserNewControllerFunction(OneShotFactory) {
    this.chaser = new OneShotFactory.chasers;
    this.create = function() {
        this.chaser.$save(function(tab) {
            $state.go("tabShow", {
                id: tab.id
            })
        })
    }
}

function ChaserShowControllerFunction(OneShotFactory, $stateParams) {
    this.chaser = OneShotFactory.get({
        id: $stateParams.id
    });
}

 

