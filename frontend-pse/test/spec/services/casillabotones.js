'use strict';

describe('Service: CasillaBotones', function () {

  // load the service's module
  beforeEach(module('frontendPseApp'));

  // instantiate service
  var CasillaBotones;
  beforeEach(inject(function (_CasillaBotones_) {
    CasillaBotones = _CasillaBotones_;
  }));

  it('should do something', function () {
    expect(!!CasillaBotones).toBe(true);
  });

});
