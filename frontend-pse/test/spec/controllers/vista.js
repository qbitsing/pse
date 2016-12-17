'use strict';

describe('Controller: VistaCtrl', function () {

  // load the controller's module
  beforeEach(module('frontendPseApp'));

  var VistaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    VistaCtrl = $controller('VistaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(VistaCtrl.awesomeThings.length).toBe(3);
  });
});
