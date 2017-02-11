'use strict';

describe('Directive: tablaBotones', function () {

  // load the directive's module
  beforeEach(module('frontendPseApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<tabla-botones></tabla-botones>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the tablaBotones directive');
  }));
});
