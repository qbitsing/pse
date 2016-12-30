'use strict';

describe('Controller: Login1Ctrl', function () {

  // load the controller's module
  beforeEach(module('frontendPseApp'));

  var Login1Ctrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    Login1Ctrl = $controller('Login1Ctrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(Login1Ctrl.awesomeThings.length).toBe(3);
  });
});
