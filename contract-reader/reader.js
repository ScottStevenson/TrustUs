window.onload = function() {
  /* contract.txt is read into contract */

  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.log('No web3? You should consider trying MetaMask!')
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  // Read contract address from url; store in window.address
  address = window.location.hash;
  if (typeof address !== 'undefined') {
    address = address.substr(1); // remove leading '#'
  }

  // Read contract details
  readContract(address);
}

// Main program entry point
function readContract(address) {

  // Read account details
  web3.eth.getAccounts((err, accounts) => {
    account = accounts[0];

    // Reference contract
    contract = web3.eth.contract(JSON.parse(abi));
    myContract = contract.at(address);
    console.log(myContract);

    document.getElementById('btnPulse').addEventListener('click', function(){
      pulse(web3, myContract);
    });

    /* getbalance */
    web3.eth.getBalance(address, (err, result) => {
      document.getElementById('balance').innerHTML = "Balance: ETH " + (result.toNumber() / 10**18);
    });

    /* static call format */
    myContract.trustClosed.call((err, result) => {
      console.log('Trust Closed: ' + result);
    });

    /* static call format */
    myContract.lastPulse.call((err, result) => {
      console.log('Last Pulse: ' + result.toNumber());
    });

    myContract.revocable.call((err, result) => {
      console.log("revocable?", result);
      document.getElementById('revocable').innerHTML = result;
    });

    myContract.isTrustorDeceased.call((err, result) => {
      console.log('Is Trustor Deceased: ' + result);
      document.getElementById('deceased').innerHTML = result;
    });
  });
}

function pulse(web3, contract) {
  /* transaction call format */
  contract.pulse({
    gas: 99000
  }, (err, result) => {
    console.log("pulse()", err, result);
  });
}
