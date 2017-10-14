## Compiling Solidity in browser

1. Load the `BrowserSolc` library

```html
<script src="./browser-solc.min.js" type="text/javascript"></script>
```

2. Pick your version of `solc-js`, and compile

```javascript
window.onload = function() {
  BrowserSolc.loadVersion("soljson-v0.4.17+commit.bdeb9e52.js", function(compiler) {
    contract = "contract x { function g() {} }";
    console.log(solcCompile(compiler, contract));
  });
};

/* compiles 'source' solidity code, using 'compiler' */
function solcCompile(compiler, source) {
  result = compiler.compile(source, 1); // 1 = optimize
  return JSON.stringify(collectOutput(result));
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
```
