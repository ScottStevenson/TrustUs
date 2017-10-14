var solc = require('solc')
var input = 'contract x { function g() {} }'
// Setting 1 as second paramateractivates the optimiser
var output = solc.compile(input, 1)
for (var contractName in output.contracts) {
	// code and ABI that are needed by web3
	console.log(contractName + ': ' + output.contracts[contractName].bytecode)
	console.log(contractName + '; ' + output.contracts[contractName].interface)
}
