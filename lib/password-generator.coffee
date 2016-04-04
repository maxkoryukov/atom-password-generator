{CompositeDisposable} = require 'atom'

module.exports = AtomPasswordGenerator =
  subscriptions: null

  activate: (state) ->
    @subscriptions = new CompositeDisposable
    @subscriptions.add atom.commands.add 'atom-workspace', 'password-generator:short': => @short()
    @subscriptions.add atom.commands.add 'atom-workspace', 'password-generator:long': => @long()

  deactivate: ->
    @subscriptions.dispose()

  serialize: ->

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
