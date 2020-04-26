/*
################################################################################
#                                                                              #
# db    db  .8888.  dP     888888b 8888ba   .8888.     d8b   db 888888b d8888P #
# 88    88 d8'  `8b 88     88      88  `8b d8'  `8b    88V8  88 88        88   #
# Y8    8P 88    88 88    a88aaa   88aa8P' 88    88    88 V8 88 88aaa     88   #
# `8b  d8' 88    88 88     88      88  `8b 88    88    88  V888 88        88   #
#  `8bd8'  Y8.  .8P 88     88      88  .88 Y8.  .8P dP 88   V88 88        88   #
#    YP     `888P'  88888P 888888P 888888'  `888P'  88 VP    8P 888888P   dP   #
#                                                                              #
################################################################################
#
# Password generator for Atom
#
# Copyright (C) 2016-2020 Volebo <dev@volebo.net>
# Copyright (C) 2016-2020 Maksim Koryukov <maxkoryukov@gmail.com>
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the MIT License, attached to this software package.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
#
# You should have received a copy of the MIT License along with this
# program. If not, see <https://opensource.org/licenses/MIT>.
#
# http://spdx.org/licenses/MIT
#
################################################################################
*/

const path = require('path')

exports = module.exports = {
	'root': true,

	'env': {
		node: true
		//'atom': true,
	},

	'globals': {
		'atom': true,
	},

	// 'parserOptions': {
	// 	'parser': 'babel-eslint'
	// },

	'extends': [
		// 'plugin:vue/essential',
		// 'volebo',
		path.join(__dirname, 'node_modules', 'eslint-config-volebo', 'index.js'),
	],

	'overrides': [
		{
			'files': [
				'**/*.test.js',
				'**/*.spec.js'
			],

			'env': {
				mocha: true
			},

			'globals': {
				'filename2suitename': true,
				'tags': true,
			},

			/*
			'rules': {
				'no-unused-expressions': 'off',   // because of `expect(x).to.be.true`
				'camelcase': 'off',  // don't care...
				'comma-dangle': ['error', {
					'arrays': 'only-multiline',
					'objects': 'only-multiline',
					'imports': 'only-multiline',
					'exports': 'only-multiline',
					'functions': 'ignore',
				}]
			},
			*/

		}
	],
}
