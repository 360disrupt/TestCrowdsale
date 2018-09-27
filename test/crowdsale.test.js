const TestBurnableToken = artifacts.require("./TestBurnableToken.sol");
const TestBurnableCrowdsale = artifacts.require("./TestBurnableCrowdsale.sol");

contract('TestBurnableToken', function(accounts) {
  it("should put 10000 TestBurnableToken in the first account", function() {
    return TestBurnableToken.deployed().then(function(instance) {
      return instance.balanceOf.call(accounts[0]);
    }).then(function(balance) {
      assert.equal(web3.fromWei(balance.toString(10)), 10000, "10000 wasn't in the first account");
    });
  });
});




contract('TestBurnableCrowdsale', function(accounts) {
  function ApproveTokens() {
    return TestBurnableToken.deployed()
      .then(function(tokenDeployed) {
        instanceToken = tokenDeployed;
        return TestBurnableCrowdsale.deployed()
      })
      .then(function(crowdsaleDeployed) {
        instanceCrowdsale = crowdsaleDeployed;
        instanceToken.approve(instanceCrowdsale.address,web3.toWei(1000, "ether"))
        return null
      })
      .then(function() {
        return instanceCrowdsale.remainingTokens()
      })
  }

  // it("should have 0 remaining tokens before approval", function() {
  //   creator = web3.eth.accounts[0]
  //   return TestBurnableCrowdsale.deployed().then(function(instance) {
  //    instance.balanceOf(creator).then(balance => web3.fromWei(balance.toString(10)))

  //     instance.remainingTokens().then(function(balance) {
  //       assert.equal(web3.fromWei(balance.toString(10)), 0, "Balance was not 0");
  //     })
  //   })
  // })

  it("should have 0 remaining tokens before approval", function() {
    return TestBurnableCrowdsale.deployed().then(function(instance) {
      instance.remainingTokens().then(function(balance) {
        assert.equal(web3.fromWei(balance.toString(10)), 0, "Balance was not 0");
      })
    })
  })

  it("should have 1000 remaining tokens after approval", function() {
    return ApproveTokens().then(function(balance) {
      assert.equal(web3.fromWei(balance.toString(10)), 1000, "Balance is 1000");
    })
  });

  it("remaining tokens should be 500 after buying", function() {
    // let instanceToken = null;
    // let instanceCrowdsale = null;
    let purchaser = web3.eth.accounts[2];

    return ApproveTokens().then(function(balance) {
      assert.equal(web3.fromWei(balance.toString(10)), 1000, "Remaining tokens are not 1000");
      return instanceCrowdsale.sendTransaction({ from: purchaser, value: web3.toWei(0.1, "ether")})
    })
    .then(function(){
      instanceCrowdsale.remainingTokens().then(function(balance) {
        assert.equal(web3.fromWei(balance.toString(10)), 500, "Remaining tokens are not 500");
      })
    })
  });

});