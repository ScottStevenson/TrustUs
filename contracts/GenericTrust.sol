pragma solidity ^0.4.10;

contract GenericTrust {
  address public trustor;
  address public trustee;
  bool public revocable;
  bool public deceasedPulseTriggerEnabled;
  bool public deceasedConfirmerTriggerEnabled;
  uint public numRequiredDeathConfirmations;
  bool public fixedDateTriggerEnabled;
  uint public fixedDate;
  bool public piggyBankTriggerEnabled;
  uint public piggyBankTriggerAmount;

  bool public trustorAlive = true;
  // TODO: Add deceased confirmer array

  function GenericTrust(
    address _trustor,
    address _trustee,
    bool _revocable,
    bool _deceasedPulseTriggerEnabled,
    bool _deceasedConfirmerTriggerEnabled, // TODO: intake array of confirmers?
    uint _numRequiredDeathConfirmations,
    bool _fixedDateTriggerEnabled,
    uint _fixedDate,
    bool _piggyBankTriggerEnabled,
    uint _piggyBankTriggerAmount
  )
    non_zero_address(trustor)
    non_zero_address(trustee)
  {
    trustor = _trustor;
    trustee = _trustee;
    revocable = _revocable;
    deceasedPulseTriggerEnabled = _deceasedPulseTriggerEnabled;
    deceasedConfirmerTriggerEnabled = _deceasedConfirmerTriggerEnabled;
    numRequiredDeathConfirmations = _numRequiredDeathConfirmations;
    fixedDateTriggerEnabled = _fixedDateTriggerEnabled;
    fixedDate = _fixedDate;
    piggyBankTriggerEnabled = _piggyBankTriggerEnabled;
    piggyBankTriggerAmount = _piggyBankTriggerAmount;
  }

  function deposit() only_trustor {

  }

  function withdraw() only_trustee {

  }

  function pulse() only_trustor {

  }

  function confirmDeceased() {

  }

  // Fallback function for receiving payment
  function () public payable {

  }

  modifier only_trustor() {
    require(msg.sender == trustor);
    _;
  }

  modifier only_trustee() {
    require(msg.sender == trustee);
    _;
  }

  modifier non_zero_address(address x) {
    require(x != 0);
    _;
  }
}
