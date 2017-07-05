'use strict';

var composite = require('atom').CompositeDisposable;

var AtomPasswordGenerator = {

	config: {
		shortLength: {
			type:    'integer',
			default: 8,
			order:   0 },
		longLength: {
			type:    'integer',
			default: 12,
			order:   1 },
		useLowerCaseLetters: {
			type:    'boolean',
			default: true,
			order:   2 },
		useUpperCaseLetters: {
			type:    'boolean',
			default: true,
			order:   3 },
		useNumbers: {
			type:    'boolean',
			default: true,
			order:   4 },
		useSymbols: {
			type:    'boolean',
			default: false,
			order:   5 }
	},

	subscriptions: null,

	activate: function(state) {
		this.subscriptions = new composite;
		this.subscriptions.add(atom.commands.add('atom-workspace', {
			'password-generator:short': (function(_this) {
				return function() {
					return _this.short();
				};
			})(this)
		}));
		return this.subscriptions.add(atom.commands.add('atom-workspace', {
			'password-generator:long': (function(_this) {
				return function() {
					return _this.long();
				};
			})(this)
		}));
	},

	deactivate: function() {
		return this.subscriptions.dispose();
	},

	serialize: function() {},

	lowercaseDic: 'abcdefghijklmnopqrstuvwxyz',
	uppercaseDic: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
	numberDic:    '1234567890',
	symbolsDic:   ' !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~',

	getCurrentDictionary: function(){
		var currentDictionary = '';

		if(atom.config.get('atom-password-generator.useLowerCaseLetters'))
			currentDictionary += this.lowercaseDic;
		if(atom.config.get('atom-password-generator.useUpperCaseLetters'))
			currentDictionary += this.uppercaseDic;
		if(atom.config.get('atom-password-generator.useNumbers'))
			currentDictionary += this.numberDic;
		if(atom.config.get('atom-password-generator.useSymbols'))
			currentDictionary += this.symbolsDic;

		return currentDictionary;
	},

	getRandomString: function(dict, N){
		let s = '';
		let len = dict.length;
		for (let i = 0; i < N; i++) {
			s += dict[Math.floor(Math.random() * len)];
		}
		return s;
	},

	short: function() {
		let editor = atom.workspace.getActiveTextEditor();
		return editor.insertText(this.getRandomString(this.getCurrentDictionary(), atom.config.get('atom-password-generator.shortLength')));
	},

	long: function() {
		let editor = atom.workspace.getActiveTextEditor();
		return editor.insertText(this.getRandomString(this.getCurrentDictionary(), atom.config.get('atom-password-generator.longLength')));
	}
};

module.exports = AtomPasswordGenerator;
