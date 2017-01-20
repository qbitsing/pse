'use strict';

describe('Controller: PrestamosCtrl', function () {

  // load the controller's module
  beforeEach(module('frontendPseApp'));

  var PrestamosCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PrestamosCtrl = $controller('PrestamosCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PrestamosCtrl.awesomeThings.length).toBe(3);
  });
});
