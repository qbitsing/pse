'use strict';

describe('Controller: ActividadesCtrl', function () {

  // load the controller's module
  beforeEach(module('frontendPseApp'));

  var ActividadesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ActividadesCtrl = $controller('ActividadesCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ActividadesCtrl.awesomeThings.length).toBe(3);
  });
});
