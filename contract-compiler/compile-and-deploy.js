window.onload = function() {
  /* contract.txt is read into contract */

  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.log('No web3? You should consider trying MetaMask!')
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  BrowserSolc.loadVersion("soljson-v0.4.17+commit.bdeb9e52.js", function(compiler) {
    /* Compile */
    output = solcCompile(compiler, contract);
    console.log("output", output);

    /* Deploy */
    deploy(output[0]['bytecode'], JSON.parse(output[0]['abi']));
  });
}

/* compiles 'source' solidity code, using 'compiler' */
function solcCompile(compiler, source) {
  result = compiler.compile(source, 1); // 1 = optimize
  return collectOutput(result);
}

/* returns JSON containing 'bytecode', 'abi' for each resulting contract */
function collectOutput(jsonObj) {
  jsonObj = jsonObj['contracts'];
  outputObj = [];

  /* iterate over contracts; collect Bytecode, ABI  */
  for(var key in jsonObj) {
    if(jsonObj.hasOwnProperty(key)) {
      // read bytecode, interface
      outputObj.push({
        contract: key,
        bytecode: jsonObj[key].bytecode,
        abi: jsonObj[key].interface
      });
    }
  }

  return outputObj;
}

function deploy(_source, _abi) {
  console.log("entered deploy", _source, _abi);
  web3.eth.getAccounts((err, accounts) => {
    account = accounts[0];
    console.log("account", account);

    var contract = web3.eth.contract(_abi)
    contract.new(
      '0x413c5d52ad3c7c86004e960c3eb2b01706ea4140',
      '0x1da1bc9a5ec7355670cce76ae26b120f5456b99d',
      true,
      true,
      61,
      false,
      0,
      false,
      0,
      false,
      0,
    {
      from: account,
      data: _source,
      gas: '2000000'
    }, (err, contract) => {
      console.log(contract);
      if (typeof contract.address !== 'undefined') {
        console.log('Mined', contract.address, contract.transactionHash);
      }
    })
  })
}
