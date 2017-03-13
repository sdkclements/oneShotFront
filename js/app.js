//code goes here suckas

angular
  .module("oneshot",[
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
//Tabs Controllers//
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



function RouterFunction($stateProvider){
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
    controller: "GrumbleShowController",
    controllerAs: "vm"
  })
}

function OneShotFactoryFunction ($resource) {
  return $resource("http://localhost:3000/tabs/:id")
}

//Tabs Functions//
function TabIndexControllerFunction( OneShotFactory ) {
  this.tabs = OneShotFactory.query()
}

function TabNewControllerFunction ( OneShotFactory ) {
this.tab = new OneShotFactory();
this.create = function(){
  this.tab.$save(function(tab) {
    $state.go("tabShow", {id: tab.id})
    })
  }
}

function TabShowControllerFunction( OneShotFactory, $stateParams) {
  this.tab = OneShotFactory.get({id: $stateParams.id});
}

//Shots Functions//
function ShotIndexControllerFunction( OneShotFactory ) {
  this.tabs.shots = OneShotFactory.query()
}

function ShotNewControllerFunction ( OneShotFactory ) {
this.tab.shot = new OneShotFactory();
this.create = function(){
  this.tab.shot.$save(function(tab) {
    $state.go("tabShow", {id: tab.id})
    })
  }
}

function ShotShowControllerFunction( OneShotFactory, $stateParams) {
  this.tab.shot = OneShotFactory.get({id: $stateParams.id});
}

//Chasers Functions//
function ChaserNewControllerFunction ( OneShotFactory ) {
this.shot.chaser = new OneShotFactory();
this.create = function(){
  this.shot.chaser.$save(function(tab) {
    $state.go("tabShow", {id: tab.id})
    })
  }
}

function ChaserShowControllerFunction( OneShotFactory, $stateParams) {
  this.shot.chaser = OneShotFactory.get({id: $stateParams.id});
}
