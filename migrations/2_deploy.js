const TestBurnableToken = artifacts.require("./TestBurnableToken.sol");
const TestBurnableCrowdsale = artifacts.require("./TestBurnableCrowdsale.sol");

module.exports = function(deployer, network, accounts) {

    const openingTime = web3.eth.getBlock('latest').timestamp + 30; // two secs in the future
    const closingTime = openingTime + 60 *15 // 15min
    const rate = 1;//new web3.BigNumber(10);
    const wallet = accounts[0];


    console.log("Deploying openingTime: ", openingTime, " closingTime ", closingTime, " rate ", rate, " wallet ", wallet);

    return deployer
        .then(() => {
            return deployer.deploy(TestBurnableToken, 10000);
        })
        .then(() => {
            return deployer.deploy(
                TestBurnableCrowdsale,
                openingTime,
                closingTime,
                rate,
                wallet,
                TestBurnableToken.address
            );
        });
};