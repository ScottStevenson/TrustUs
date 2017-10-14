pragma solidity ^0.4.10;

contract GenericTrust {
  address public trustor;
  address public beneficiary;
  bool public revocable;
  bool public deceasedPulseTriggerEnabled;
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
    bool _deceasedConfirmerTriggerEnabled, // TODO: intake array of confirmers?
    uint _numRequiredDeathConfirmations,
    bool _fixedDateTriggerEnabled,
    uint _fixedDate,
    bool _piggyBankTriggerEnabled,
    uint _piggyBankTriggerAmount
  )
    payable
    non_zero_address(trustor)
    non_zero_address(beneficiary)
  {
    deploymentDate = block.timestamp;

    if (_fixedDateTriggerEnabled) {
      require(_fixedDate > deploymentDate);
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

  // TODO: Only supports fixed date trigger
  function withdrawAll()
           only_beneficiary
           trust_not_closed
           public {

    if(fixedDateTriggerEnabled && block.timestamp > fixedDate)
      beneficiary.transfer(this.balance);

    Withdraw(msg.sender, this.balance);

    trustClosed = true;

  }

  // TODO
  function revoke()
           only_trustor
           only_revocable
           trust_not_closed
           public {

           trustor.transfer(this.balance);
           trustClosed = true;
  }

  // TODO
  function pulse(uint nextPulse)
           only_trustor
           trust_not_closed
           public {

  }

  // TODO
  function pulse()
           only_trustor
           trust_not_closed
           public {

  }

  // TODO
  function confirmDeceased() public {

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
}
