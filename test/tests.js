
describe('Growl Message', function() {

	jasmine.clock().install();

	it('growl must be defined and must be a function', function() {
		expect(growl).toBeDefined();
		expect(growl).toEqual(jasmine.any(Function));
	});

	it('should assert that growl have been called', function() {
		spyOn(window, 'growl');
		window.growl();
		growl();


		jasmine.clock().tick(1000);

		console.log($('html')[0]);


		expect(window.growl).toHaveBeenCalled();
	// 	window.growl();
	// 	expect(window.growl).toHaveBeenCalled();
		//expect($('.container-alert-message')[0]).toBeInDOM();
	});


});
