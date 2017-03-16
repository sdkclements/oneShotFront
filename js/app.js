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
      "$state",
      OneShotFactoryFunction
  ])
  .controller("TabIndexController", [
      "OneShotFactory",
      TabIndexControllerFunction
  ])
  // .controller("TabNewController", [
  //     "OneShotFactory",
  //     "$state",
  //     TabNewControllerFunction
  // ])
  .controller("TabShowController", [
      "OneShotFactory",
      "$state",
      "$stateParams",
      TabShowControllerFunction
  ])
  //Shots Controllers//
  .controller("ShotIndexController", [
      "OneShotFactory",
      ShotIndexControllerFunction
  ])
  // .controller("ShotNewController", [
  //     "OneShotFactory",
  //     "$state",
  //     ShotNewControllerFunction
  // ])
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
        controller: "ShotShowController",
        controllerAs: "vm"
    })
}

function OneShotFactoryFunction($resource) {
    return {
        tabs: $resource("https://one-shot-backend.herokuapp.com/tabs/:id.json", {}, {
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
        shots: $resource("https://one-shot-backend.herokuapp.com/tabs/:tab_id/shots.json", {}, {
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
        shot: $resource("https://one-shot-backend.herokuapp.com/tabs/:tab_id/shots/:id.json", {}, {
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
        chasers: $resource("https://one-shot-backend.herokuapp.com/tabs/:tab_id/shots/:shot_id/chasers.json", {}, {
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
// function TabIndexControllerFunction(OneShotFactory) {
//   this.tabs = OneShotFactory.tabs.query()
// }
//
// function TabNewControllerFunction(OneShotFactory) {
//   this.tab = new OneShotFactory.tabs;
//   this.create = function() {
//     this.tab.$save(function(tab) {
//       $state.go("tabShow", {
//         id: tab.id
//       })
//     })
//   }
// }
function TabIndexControllerFunction(OneShotFactory, $state) {
    this.tabs = OneShotFactory.tabs.query(function(res){
        console.log(res)
    })
// function TabNewControllerFunction(OneShotFactory) {
    this.newTab = new OneShotFactory.tabs;
    this.create = function($state) {
        this.newTab.$save(this.newTab).then ( () =>
        this.tab = {}, $state.go("tabIndex") )
      }
  }
function TabShowControllerFunction(OneShotFactory, $state, $stateParams) {
  this.tab = OneShotFactory.tabs.get({
    id: $stateParams.id
  })
  this.shots = OneShotFactory.shots.query({
    tab_id: $stateParams.id
  })
  this.newShot = new OneShotFactory.shots;
  this.create = () => {
    this.newShot.tab_id = this.tab.id
    this.newShot.$save(this.newShot).then ( (res) => {
    this.shot = {}
    $state.go("shotIndex", {tab_id: this.tab.id})
    })
  }
}
//Shots Functions//
// function ShotIndexControllerFunction(OneShotFactory) {
//   this.shots = OneShotFactory.shots.query()
// }
//
// function ShotNewControllerFunction(OneShotFactory) {
//   this.shot = new OneShotFactory.shots;
//   this.create = function() {
//     this.shot.$save(function(tab) {
//       $state.go("tabShow", {
//         id: tab.id
//         })
//     })
//   }
// }
function ShotIndexControllerFunction(OneShotFactory, $state) {
    this.shots = OneShotFactory.shots.query(function(res){
        console.log(res)
    })
// function ShotNewControllerFunction(OneShotFactory) {
    // this.newShot = new OneShotFactory.shots;
    // this.create = function($state) {
    //     this.newShot.$save(this.newShot).then ( () =>
    //     this.shot = {}, $state.go("shotIndex") )
    //   }
  }
function ShotShowControllerFunction(OneShotFactory, $stateParams) {
  this.shot = OneShotFactory.shot.get({
    tab_id: $stateParams.id,
    id: $stateParams.id
  })
  this.chasers = OneShotFactory.chasers.query({
    tab_id: $stateParams.id,
    shot_id: $stateParams.id
  })
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