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
    this.tabs = OneShotFactory.tabs.query(function(res){
        console.log(res)
    })

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
    });
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
    this.shot = OneShotFactory.get({
        id: $stateParams.id
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
=======
  .module("oneshot",[
      "ui.router",
      "ngResource"
   ])

   .config([
     "$stateProvider",
     RouterFunction
   ])

   .factory("TabShotFactory", [
     "$resource",
     TabShotFactoryFunction
   ])

//Tabs Controllers//
   .controller("TabIndexController", [
   "TabShotFactory",
   TabIndexControllerFunction
  ])

 .controller("TabNewController", [
   "TabShotFactory",
   "$state",
   TabNewControllerFunction
  ])

 .controller("TabShowController", [
   "TabShotFactory",
   "$stateParams",
   TabShowControllerFunction
  ])

//Shots Controllers//
  .controller("ShotIndexController", [
  "TabShotFactory",
  ShotIndexControllerFunction
  ])

  .controller("ShotNewController", [
  "TabShotFactory",
  "$state",
  ShotNewControllerFunction
  ])

  .controller("ShotShowController", [
  "TabShotFactory",
  "$stateParams",
  ShotShowControllerFunction
  ])

  //Chasers Controllers//

  .controller("ChaserNewController", [
  "TabShotFactory",
  "$state",
  ChaserNewControllerFunction
  ])

  .controller("ChaserShowController", [
  "TabShotFactory",
  "$stateParams",
  ChaserShowControllerFunction
  ])



function RouterFunction($stateProvider){
  $stateProvider
  .state("tabIndex", {
    url: "/",
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
}

function TabShotFactoryFunction ($resource) {
  return $resource("http://localhost:3000/tabs/:id")
}


//Tabs Functions//
function TabIndexControllerFunction( TabShotFactory ) {
  this.tabs = TabShotFactory.query()
}

function TabNewControllerFunction ( TabShotFactory ) {
this.tab = new TabShotFactory();
this.create = function(){
  this.tab.$save(function(tab) {
    $state.go("tabShow", {id: tab.id})
    })
  }
}

function TabShowControllerFunction( TabShotFactory, $stateParams) {
  this.tab = TabShotFactory.get({id: $stateParams.id});
}

//Shots Functions//
function ShotIndexControllerFunction( TabShotFactory ) {
  this.tabs.shots = TabShotFactory.query()
}

function ShotNewControllerFunction ( TabShotFactory ) {
this.tab.shot = new TabShotFactory();
this.create = function(){
  this.tab.shot.$save(function(tab) {
    $state.go("tabShow", {id: tab.id})
    })
  }
}

function ShotShowControllerFunction( TabShotFactory, $stateParams) {
  this.tab.shot = TabShotFactory.get({id: $stateParams.id});
}

//Chasers Functions//
function ChaserNewControllerFunction ( TabShotFactory ) {
this.shot.chaser = new TabShotFactory();
this.create = function(){
  this.shot.chaser.$save(function(tab) {
    $state.go("tabShow", {id: tab.id})
    })
  }
}

function ChaserShowControllerFunction( TabShotFactory, $stateParams) {
  this.shot.chaser = TabShotFactory.get({id: $stateParams.id});
}
>>>>>>> 2eb7ea34c8c7c9f900e9775bc649114402a1b8b2
