exports = module.exports = {
	'env': {
		'mocha': true,
	},
	'globals': {
		'expect': true
	},

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
	}
}
