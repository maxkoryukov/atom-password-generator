AtomPasswordGeneratorView = require './atom-password-generator-view'
{CompositeDisposable} = require 'atom'

module.exports = AtomPasswordGenerator =
  atomPasswordGeneratorView: null
  modalPanel: null
  subscriptions: null

  activate: (state) ->
    @atomPasswordGeneratorView = new AtomPasswordGeneratorView(state.atomPasswordGeneratorViewState)
    @modalPanel = atom.workspace.addModalPanel(item: @atomPasswordGeneratorView.getElement(), visible: false)

    # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    @subscriptions = new CompositeDisposable

    # Register command that toggles this view
    @subscriptions.add atom.commands.add 'atom-workspace', 'atom-password-generator:toggle': => @toggle()

  deactivate: ->
    @modalPanel.destroy()
    @subscriptions.dispose()
    @atomPasswordGeneratorView.destroy()

  serialize: ->
    atomPasswordGeneratorViewState: @atomPasswordGeneratorView.serialize()

  short: ->
    s = ''
    dic = "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
    len = dic.length
    for n in [0..7]
      s += dic[ Math.floor(Math.random() * len) ]
    editor = atom.workspace.getActiveTextEditor()
    editor.insertText(s)

  long: ->
    s = ''
    dic = "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
    len = dic.length
    for n in [0..11]
      s += dic[ Math.floor(Math.random() * len) ]
    editor = atom.workspace.getActiveTextEditor()
    editor.insertText(s)
