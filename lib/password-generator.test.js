'use strict'

// const expect = require('chai').expect

describe('AtomPasswordGenerator', function() {
	let workspaceElement = null
	let editor = null

	beforeEach(function() {

		return atom.packages.activatePackage('atom-password-generator')
			.then(_unused_pkg => {
				editor = atom.workspace.buildTextEditor()
				workspaceElement = atom.views.getView(atom.workspace)
			})
	})

	describe('when the password-generator:short event is triggered', function(){

		it('should change text in editor', function() {

			const txt = editor.getText()
			expect(txt).toBe('')
			atom.commands.dispatch(workspaceElement, 'password-generator:short')
			const txt2 = editor.getText()

			expect(txt2).not.toEqual(txt)
		})
	})
})
