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
  web3.eth.getAccounts((err, accounts) => {
    let account = accounts[0];
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
      value: web3.toWei(1, "ether"),
      gas: '2000000'
    }, (err, contract) => {
      console.log(contract);
      if (typeof contract.address !== 'undefined') {
        console.log('Mined', contract.address, contract.transactionHash);
      }
    })
  })
}

export function deployContract(web3, form){
  BrowserSolc.loadVersion("soljson-v0.4.17+commit.bdeb9e52.js", function(compiler) {
    /* Compile */
    let output = solcCompile(compiler, contract);
    console.log("output", output);

    /* Deploy */
    deploy(web3, output[0]['bytecode'], JSON.parse(output[0]['abi']), fform);
  });
}
