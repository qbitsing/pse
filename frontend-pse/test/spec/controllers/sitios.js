'use strict';

describe('Controller: SitiosCtrl', function () {

  // load the controller's module
  beforeEach(module('frontendPseApp'));

  var SitiosCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SitiosCtrl = $controller('SitiosCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SitiosCtrl.awesomeThings.length).toBe(3);
  });
});
