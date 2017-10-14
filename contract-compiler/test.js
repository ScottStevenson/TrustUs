window.onload = function() {
  BrowserSolc.loadVersion("soljson-v0.4.17+commit.bdeb9e52.js", function(compiler) {
    contract = "contract x { function g() {} }";
    document.write("<h2>input contract:</h2>" + contract);
    document.write("<h2>output:</h2><pre>" + solcCompile(compiler, contract));
  });
}

/* compiles 'source' solidity code, using 'compiler' */
function solcCompile(compiler, source) {
  result = compiler.compile(source, 1); // 1 = optimize
  return JSON.stringify(collectOutput(result), null, 2);
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
