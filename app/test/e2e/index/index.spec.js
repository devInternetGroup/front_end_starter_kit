describe('hello-protractor', function () {

	describe('index', function () {
		it('should desplat correct title', function () {
			browser.get('/');
			expect(browser.getTitle()).toBe('Web Starter Kit');
		});
	});
});
