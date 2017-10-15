var GenericTrust = artifacts.require("./GenericTrust.sol");

contract('TestGenericTrust', function(accounts) {
  it("should allow piggyBankWithdrawals if trigger enabled", function() {
    return GenericTrust.new(
      accounts[0], accounts[1], false, false, 1, false, 1, false, 1, true, 100).then(function(_instance) {
        _instance.deposit(100).then(function(_instance) {
          return _instance.withdrawAll()
        }).then(function(result) {
          assert(result.valueOf() === true, "operation failed - should pass");
        }).catch(function(err) {
          if(err.name == "AssertionError") {
            throw err;
          }
        });
      });
  });

  it("should not allow piggyBankWithdrawals if trigger is not enabled", function(){
    /* -------------------------------------------------------------- 👇 -- */
    return GenericTrust.new(
      accounts[0], accounts[1], false, false, 1, false, 1, false, 1, false, 0).then(function(_instance){
      return _instance.withdrawAll()
    }).then(function(result){
      assert(result.valueOf() !== true, "operation succeeded - should fail");
    }).catch(function(err){
      if(err.name == "AssertionError"){
        throw err;
      }
    });
  });
});
