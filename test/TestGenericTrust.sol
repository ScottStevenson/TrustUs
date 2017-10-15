pragma solidity ^0.4.15;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/GenericTrust.sol";

contract TestGenericTrust {

  function testConstruction() {
    GenericTrust genericTrust =
      new GenericTrust(0x05fe3bf44e4ba31284576955c991ac412b52a335,
      0x1da1bc9a5ec7355670cce76ae26b120f5456b99d,
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
