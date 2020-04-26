'use strict'


const createRunner = require('@atom/mocha-test-runner').createRunner
const mochaOptions = require('../.mocharc.js')

console.log(mochaOptions)

// optional options to customize the runner
const extraOptions = {
	testSuffixes: ['-spec.js', '-spec.coffee']
}



const optionalConfigurationFunction = function (mocha, {terminate}) {
	// If provided, atom-mocha-test-runner will pass the mocha instance
	// to this function, so you can do whatever you'd like to it.

	// The "terminate" function may be called to prevent the test suite from running. If it's called with an argument,
	// that will be used as the exit status of the main process.


}

module.exports = createRunner(
	mochaOptions
	//extraOptions
	, optionalConfigurationFunction
)
