// The account that created the tokens
creator = web3.eth.accounts[0]

// The account that will buy Test tokens.
purchaser = web3.eth.accounts[2]

// The address of the Test token instance that was created when the crowdsaleInstance contract was deployed
// assign the result of TestBurnableCrowdsale.deployed() to the variable crowdsaleInstance
TestBurnableCrowdsale.deployed().then(inst => { crowdsaleInstance = inst })

crowdsaleInstance.token().then(addr => { tokenAddress = addr } )
tokenAddress

TestBurnableTokenInstance = TestBurnableToken.at(tokenAddress)

//balances before
TestBurnableTokenInstance.balanceOf(creator).then(balance => web3.fromWei(balance.toString(10)))
TestBurnableTokenInstance.balanceOf(purchaser).then(balance => web3.fromWei(balance.toString(10)))


//alowance
TestBurnableTokenInstance.approve(crowdsaleInstance.address,web3.toWei(1000, "ether"))
crowdsaleInstance.remainingTokens().then(balance => web3.fromWei(balance.toString(10)))

//buy and balances after buying
crowdsaleInstance.sendTransaction({ from: purchaser, value: web3.toWei(1, "ether")})
crowdsaleInstance.remainingTokens().then(balance => web3.fromWei(balance.toString(10)))

TestBurnableTokenInstance.balanceOf(purchaser).then(balance => web3.fromWei(balance.toString(10)))
TestBurnableTokenInstance.balanceOf(creator).then(balance => web3.fromWei(balance.toString(10)))



