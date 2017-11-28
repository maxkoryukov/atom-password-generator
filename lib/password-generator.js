'use strict'

const Composite = require('atom').CompositeDisposable
const atom = global.atom

// TODO: gh #4 - remove human-confusing chars (l I | 1 0 O)
const lowercaseDic = 'abcdefghijklmnopqrstuvwxyz'
const uppercaseDic = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const numberDic    = '1234567890'
const symbolsDic   = ' !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'

const AtomPasswordGenerator = {

	config: {
		shortLength: {
			type:    'integer',
			default: 10,
			order:   0,
		},
		mediumLength: {
			type:    'integer',
			default: 15,
			order:   1,
		},
		longLength: {
			type:    'integer',
			default: 20,
			order:   2,
		},
		useLowerCaseLetters: {
			type:    'boolean',
			default: true,
			order:   3,
		},
		useUpperCaseLetters: {
			type:    'boolean',
			default: true,
			order:   4,
		},
		useNumbers: {
			type:    'boolean',
			default: true,
			order:   5,
		},
		useSymbols: {
			type:    'boolean',
			default: false,
			order:   6,
		}
	},

	subscriptions: null,

	activate: function(_unused_state) {
		this.subscriptions = new Composite()

		const commands = {
			'password-generator:short': this.short.bind(this),
			'password-generator:medium': this.medium.bind(this),
			'password-generator:long': this.long.bind(this),
		}

		return this.subscriptions.add(
			atom.commands.add('atom-workspace', commands)
		)
	},

	deactivate: function() {
		return this.subscriptions.dispose()
	},

	getCurrentDictionary: function(){
		let currentDictionary = ''

		if(atom.config.get('atom-password-generator.useLowerCaseLetters')) {
			currentDictionary += lowercaseDic
		}
		if(atom.config.get('atom-password-generator.useUpperCaseLetters')) {
			currentDictionary += uppercaseDic
		}
		if(atom.config.get('atom-password-generator.useNumbers')) {
			currentDictionary += numberDic
		}
		if(atom.config.get('atom-password-generator.useSymbols')) {
			currentDictionary += symbolsDic
		}

		return currentDictionary
	},

	getRandomString: function(dict, N){
		let s = ''
		const len = dict.length
		for (let i = 0; i < N; i++) {
			s += dict[Math.floor(Math.random() * len)]
		}
		return s
	},

	_gen: function(len) {
		const pwd = this.getRandomString(this.getCurrentDictionary(), len)
		const editor = atom.workspace.getActiveTextEditor()

		if (editor) {
			return editor.insertText(pwd)
		} else {
			// TODO: gh #7 localize!
			const txtBody = 'Plz, put the cursor into the editor pane and try again!\n\n❤❤❤'
			const txtHead = 'Active Text Editor missed'

			atom.notifications.addInfo(
				txtHead, {
					description: txtBody,
					dismissable: false,
					icon: 'info',
				})
		}
	},

	short: function() {
		const len = atom.config.get('atom-password-generator.shortLength')
		return this._gen(len)
	},

	medium: function() {
		const len = atom.config.get('atom-password-generator.mediumLength')
		return this._gen(len)
	},

	long: function() {
		const len = atom.config.get('atom-password-generator.longLength')
		return this._gen(len)
	}
}

module.exports = AtomPasswordGenerator
