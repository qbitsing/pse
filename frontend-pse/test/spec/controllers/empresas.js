'use strict';

describe('Controller: EmpresasCtrl', function () {

  // load the controller's module
  beforeEach(module('frontendPseApp'));

  var EmpresasCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EmpresasCtrl = $controller('EmpresasCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(EmpresasCtrl.awesomeThings.length).toBe(3);
  });
});
