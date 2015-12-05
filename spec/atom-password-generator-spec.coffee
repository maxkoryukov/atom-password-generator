AtomPasswordGenerator = require '../lib/atom-password-generator'

# Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
#
# To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
# or `fdescribe`). Remove the `f` to unfocus the block.

describe "AtomPasswordGenerator", ->
	[ws, activationPromise, workspaceElement] = []
	beforeEach ->
		ws = atom.workspace
		activationPromise = atom.packages.activatePackage('atom-password-generator')
		workspaceElement = atom.views.getView(atom.workspace)

	describe "when the atom-password-generator:short event is triggered", ->
		it "text in editor changes", ->
			waitsForPromise ->
				activationPromise

			te = ws.buildTextEditor()
			waitsForPromise ->
				ws.open ''

			# TODO : need to set active
			return

			expect(te).toExist()

			runs ->
				txt = te.getText()
				expect(txt).toBe ''
				atom.commands.dispatch workspaceElement, 'atom-password-generator:short'
				txt2 = te.getText()
				expect(txt2).not.toEqual txt
