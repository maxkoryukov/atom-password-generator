"use strict";

var composite = require('atom').CompositeDisposable;

var AtomPasswordGenerator = {
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

	defaultDic: "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ",

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
		return editor.insertText(this.getRandomString(this.defaultDic, 8));
	},

	long: function() {
		let editor = atom.workspace.getActiveTextEditor();
		return editor.insertText(this.getRandomString(this.defaultDic, 12));
	}
};

module.exports = AtomPasswordGenerator;
