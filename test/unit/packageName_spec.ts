///<reference path="../testReferences.ts" />

describe('this app', () => {
	beforeEach(module('packageNameApp'));
	it('works', () => {
		expect(myApp.a).to.equal('apple');
	});
});