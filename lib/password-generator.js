'use strict'

const Composite = require('atom').CompositeDisposable
const atom = global.atom

// TODO: gh #4 - remove human-confusing chars (l)
const lowercaseDic = 'abcdefghijkmnopqrstuvwxyz'
const uppercaseDic = 'ABCDEFGHJKLMNPQRSTUVWXYZ'
const numberDic    = '23456789'
const symbolsDic   = '!"#%&\'()*+,-./:;<=>?@[\\]^_`{}~'

const lowercaseDicConfusing = 'l'
const uppercaseDicConfusing = 'IO'
const numberDicConfusing    = '10'
const symbolsDicConfusing   = '$|'

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
		useConfusingChars: {
			type:    'boolean',
			default: false,
			order:   3,
		},
		useLowerCaseLetters: {
			type:    'boolean',
			default: true,
			order:   4,
		},
		useUpperCaseLetters: {
			type:    'boolean',
			default: true,
			order:   5,
		},
		useNumbers: {
			type:    'boolean',
			default: true,
			order:   6,
		},
		useSymbols: {
			type:    'boolean',
			default: false,
			order:   7,
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

	getCharDomain: function(){
		let currentDictionary = ''
		const useConfusingChars = atom.config.get('atom-password-generator.useConfusingChars')

		if(atom.config.get('atom-password-generator.useLowerCaseLetters')) {
			currentDictionary += lowercaseDic
			if (useConfusingChars) {
				currentDictionary += lowercaseDicConfusing
			}
		}
		if(atom.config.get('atom-password-generator.useUpperCaseLetters')) {
			currentDictionary += uppercaseDic
			if (useConfusingChars) {
				currentDictionary += uppercaseDicConfusing
			}
		}
		if(atom.config.get('atom-password-generator.useNumbers')) {
			currentDictionary += numberDic
			if (useConfusingChars) {
				currentDictionary += numberDicConfusing
			}
		}
		if(atom.config.get('atom-password-generator.useSymbols')) {
			currentDictionary += symbolsDic
			if (useConfusingChars) {
				currentDictionary += symbolsDicConfusing
			}
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
		let domain = this.getCharDomain()

		if (domain.length <= 0) {
			// TODO: gh #7 localize!
			const txtHead = 'No chars for password'
			const txtBody = 'All sets of chars are disabled in Setting. Plz, enable at least one!\n\n❤❤❤'

			atom.notifications.addWarning(
				txtHead, {
					description: txtBody,
					dismissable: false,
				})

			domain = '.'
		}

		const pwd = this.getRandomString(domain, len)
		const editor = atom.workspace.getActiveTextEditor()

		if (editor) {
			return editor.insertText(pwd)
		} else {
			// TODO: gh #7 localize!
			const txtHead = 'Active Text Editor missed'
			const txtBody = 'Plz, put the cursor into the editor pane and try again!\n\n❤❤❤'

			atom.notifications.addInfo(
				txtHead, {
					description: txtBody,
					dismissable: false,
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
