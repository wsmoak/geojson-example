
describe('Controller: MainCtrl', function() {
  // new instance of the module before each test
  beforeEach(module('geojsonApp'));
  var ctrl;
  
  //new instance of the controller before each test
  beforeEach(inject(function($controller) {
    ctrl = $controller('MainCtrl');
  }));
  
  it('should have items available on load', function() {
    expect(ctrl.items).toBeDefined();
  });
  
});