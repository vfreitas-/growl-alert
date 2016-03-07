
describe('Growl Message', function() {

	it('growl must be defined and must be a function', function() {
		expect(growl).toBeDefined();
		expect(growl).toEqual(jasmine.any(Function));
	});

// 	beforeEach(function() {
// 		spyOn(window, 'growl');
// console.log('before');
// 		window.growl();
// 	});

	it('should assert that growl have been called', function() {
		spyOn(window, 'growl');
		window.growl();
		console.log($('body')[0]);
		expect(window.growl).toHaveBeenCalled();
	// 	window.growl();
	// 	expect(window.growl).toHaveBeenCalled();
	// 	expect($('.container-alert-message')[0]).toBeInDOM();
	});


});
