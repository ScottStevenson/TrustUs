pragma solidity ^0.4.15;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/GenericTrust.sol";

contract TestGenericTrust {

  function testConstruction() {
    GenericTrust genericTrust =
      new GenericTrust(0xaf59127c395d71af0736ec48a0bc1eadc704a460,
      0x2126e2b0939e0b0b2623d1d30d5cd3e3dead1869,
      true,
      true,
      61,
      false,
      0,
      false, // Fixed Date Trigger Enabled
      0,
      false,
      0);

    Assert.isTrue(genericTrust.isTrustorDeceased(), "Trustor should not be considered deceased.");
    Assert.isFalse(genericTrust.isClosed(), "Trust should not be closed.");
  }
}
