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
    deceasedPulseTriggerRate = _deceasedPulseTriggerRate;
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
}
