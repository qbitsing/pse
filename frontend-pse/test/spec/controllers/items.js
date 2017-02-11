'use strict';

describe('Controller: ItemsCtrl', function () {

  // load the controller's module
  beforeEach(module('frontendPseApp'));

  var ItemsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ItemsCtrl = $controller('ItemsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ItemsCtrl.awesomeThings.length).toBe(3);
  });
});
