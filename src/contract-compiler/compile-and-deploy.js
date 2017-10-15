import './browser-solc.min'
import Web3 from 'web3'
let web3

let contract = `
pragma solidity ^0.4.15;
contract GenericTrust {
  address public trustor;
  address public beneficiary;
  bool public revocable;
  bool public deceasedPulseTriggerEnabled;
  uint public deceasedPulseTriggerRate; // In seconds
  uint public lastPulse;
  bool public deceasedConfirmerTriggerEnabled;
  uint public numRequiredDeathConfirmations;
  bool public fixedDateTriggerEnabled;
  uint public fixedDate; // All dates in unix time (seconds since epoch)
  bool public piggyBankTriggerEnabled;
  uint public piggyBankTriggerAmount;
  bool public trustorAlive = true;
  uint public deploymentDate;
  bool public trustClosed = false;
  // TODO: Add deceased confirmer array
  event Deposit(address fromAddress, uint256 ethAmount);
  event Withdraw(address toAddress, uint256 ethAmount);
  event Pulse();
  function GenericTrust(
    address _trustor,
    address _beneficiary,
    bool _revocable,
    bool _deceasedPulseTriggerEnabled,
    uint _deceasedPulseTriggerRate,
    bool _deceasedConfirmerTriggerEnabled, // TODO: intake array of confirmers?
    uint _numRequiredDeathConfirmations,
    bool _fixedDateTriggerEnabled,
    uint _fixedDate,
    bool _piggyBankTriggerEnabled,
    uint _piggyBankTriggerAmount
  )
    payable
    non_zero_address(_trustor)
    non_zero_address(_beneficiary)
  {
    deploymentDate = block.timestamp;
    if (_fixedDateTriggerEnabled) {
      require(_fixedDate > deploymentDate);
    }
    if (deceasedPulseTriggerEnabled) {
      require(_deceasedPulseTriggerRate > 0);
      lastPulse = block.timestamp;
    }
    trustor = _trustor;
    beneficiary = _beneficiary;
    revocable = _revocable;
    deceasedPulseTriggerEnabled = _deceasedPulseTriggerEnabled;
    deceasedConfirmerTriggerEnabled = _deceasedConfirmerTriggerEnabled;
    numRequiredDeathConfirmations = _numRequiredDeathConfirmations;
    fixedDateTriggerEnabled = _fixedDateTriggerEnabled;
    fixedDate = _fixedDate;
    piggyBankTriggerEnabled = _piggyBankTriggerEnabled;
    piggyBankTriggerAmount = _piggyBankTriggerAmount;
  }
  function deposit()
           only_trustor
           trust_not_closed
           payable
           public {
    Deposit(msg.sender, msg.value);
  }
  // TODO: Only supports fixed date & pulse triggers
  function withdrawAll()
           only_beneficiary
           trust_not_closed
           public {
    // OR of conditions which permit beneficiary to withdraw
    if((fixedDateTriggerEnabled && block.timestamp > fixedDate) ||
    (deceasedPulseTriggerEnabled && block.timestamp > lastPulse + deceasedPulseTriggerRate)) {
      beneficiary.transfer(this.balance);
      Withdraw(msg.sender, this.balance);
      trustClosed = true;
    }
  }
  function revoke()
           only_trustor
           only_revocable
           trust_not_closed
           public {
    trustor.transfer(this.balance);
    trustClosed = true;
  }
  function pulse()
           only_trustor
           trust_not_closed
           trustor_not_deceased
           public {
    lastPulse = block.timestamp;
  }
  // TODO
  function confirmDeceased() public {
  }
  function isClosed() constant public returns (bool) {
    return trustClosed;
  }
  // TODO implement confirmers functionality
  function isTrustorDeceased() constant public returns (bool) {
    return (deceasedPulseTriggerEnabled && block.timestamp > lastPulse + deceasedPulseTriggerRate);
  }
  // Fallback function for receiving payment
  // Only accept from one trustor for now
  function ()
          payable
          only_trustor
          trust_not_closed
          public
  {
    Deposit(msg.sender, msg.value);
  }
  modifier only_trustor() {
    require(msg.sender == trustor);
    _;
  }
  modifier only_beneficiary() {
    require(msg.sender == beneficiary);
    _;
  }
  modifier only_revocable() {
    require(revocable);
    _;
  }
  modifier trust_not_closed() {
    require(!trustClosed);
    _;
  }
  modifier non_zero_address(address x) {
    require(x != 0);
    _;
  }
  modifier trustor_not_deceased() {
    require(!isTrustorDeceased());
    _;
  }
}`;


// window.onload = function() {
//   /* contract.txt is read into contract */
//
//   // Checking if Web3 has been injected by the browser (Mist/MetaMask)
//   if (typeof web3 !== 'undefined') {
//     // Use Mist/MetaMask's provider
//     window.web3 = new Web3(web3.currentProvider);
//   } else {
//     console.log('No web3? You should consider trying MetaMask!')
//     // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
//     window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
//   }
//
// }

/* compiles 'source' solidity code, using 'compiler' */
function solcCompile(compiler, source) {
  let result = compiler.compile(source, 1); // 1 = optimize
  return collectOutput(result);
}

/* returns JSON containing 'bytecode', 'abi' for each resulting contract */
function collectOutput(jsonObj) {
  jsonObj = jsonObj['contracts'];
  let outputObj = [];

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

function deploy(web3, _source, _abi, form) {
  console.log("deploy()", _source, JSON.stringify(_abi));
  console.log(form)
  web3.eth.getAccounts((err, accounts) => {
    let account = accounts[0];
    let revocable = form.typeOfTrust.value === 'revocable' ? true : false ;
    let pulse = false;
    let fixedDateEnabled = false
    let fixedDate = 0
    let piggyBankEnabled = false
    let piggyBankTriggerAmount = 0
    let pulseRate = 0



    switch(form.trigger.value) {
      case 'Death':
        pulse = true
        pulseRate = form.trigger.details.pulse * 60 * 60 * 24
        break
      case 'Fixed Date':
        fixedDateEnabled = true
        fixedDate = form.trigger.details.fixedDate
        break
      case 'Target Ether Amount':
        piggyBankEnabled = true
        piggyBankTriggerAmount = form.trigger.details['Target Ether Amount']
        break
    }

    console.log(account,
    form.beneficaries.value[0],
    revocable,
    pulse,
    pulseRate,
    false,
    0,
    fixedDateEnabled,
    fixedDate,
    piggyBankEnabled,
    piggyBankTriggerAmount)

    var contract = web3.eth.contract(_abi)

    let contractReturned = contract.new(
      account,
      form.beneficaries.value[0],
      revocable,
      pulse,
      pulseRate,
      false,
      0,
      fixedDateEnabled,
      fixedDate,
      piggyBankEnabled,
      piggyBankTriggerAmount,
    {
      from: account,
      data: _source,
      value: web3.toWei(0, "ether"),
      gas: '2000000'
    }, (err, contractInstance) => {
      console.log('THIS IS THE CONTRACT', contractInstance);
      if (!err) {
        if (!contractInstance.address) {
          // Log transaction hash on first call
          console.log("contract.new#1", contractInstance.transactionHash);

          // Wait for address
          pollForContract(web3, contractInstance.transactionHash);
        } else {
          console.log("contract.new#2", contractInstance.address);
        }
      }
      // if (typeof contractInstance.transactionHash !== 'undefined') {
      //   // wait for transaction to get mined
      //   web3.eth.getTransaction(contractInstance.transactionHash, (err, response) => {
      //     console.log("getTransaction", err, response);
      //   });
      // }
      // if (typeof contractInstance.address !== 'undefined') {
      //   console.log('Mined', contractInstance.address, contractInstance.transactionHash);
      // }
      //
      // console.log('ADDRESS', contractInstance.address)
    })
  })
}

function pollForContract(web3, txHash) {
  web3.eth.getTransactionReceipt(txHash, (err, result) => {
    if (result && typeof result.contractAddress !== 'undefined') {
      console.log("finally", result.contractAddress);
      window.location.replace("http://localhost:8080/#" + result.contractAddress);
    } else {
      window.setTimeout(1000, pollForContract(web3, txHash));
    }
  });
}

export function deployContract(web3, form){
  BrowserSolc.loadVersion("soljson-v0.4.17+commit.bdeb9e52.js", function(compiler) {
    /* Compile */
    let output = solcCompile(compiler, contract);
    console.log("output", output);
    console.log("web3", web3)

    /* Deploy */
    deploy(web3, output[0]['bytecode'], JSON.parse(output[0]['abi']), form);
  });
}
