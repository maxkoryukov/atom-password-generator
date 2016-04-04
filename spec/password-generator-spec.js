"use strict";

// var plug = require('../lib/password-generator');

describe("AtomPasswordGenerator", function() {
	let activationPromise = null;
	let workspaceElement = null;
	let ws = null;

	beforeEach(function() {
		ws = atom.workspace;
		activationPromise = atom.packages.activatePackage('password-generator');
		return workspaceElement = atom.views.getView(atom.workspace);
	});

	describe("when the password-generator:short event is triggered", function(){

		it("should change text in editor", function(done){

			activationPromise.then( (pack) =>{
				te = ws.buildTextEditor();

				var txt, txt2;
				txt = te.getText();
				expect(txt).toBe('');
				atom.commands.dispatch(workspaceElement, 'password-generator:short');
				txt2 = te.getText();

				expect(txt2).not.toEqual(txt);

				// SHOULD FAIL:
				expect(false).toBe(true);
				done();
			});
		});
	});
});
