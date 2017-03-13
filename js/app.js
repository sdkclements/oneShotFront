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
