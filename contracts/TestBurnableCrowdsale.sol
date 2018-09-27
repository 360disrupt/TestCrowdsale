pragma solidity 0.4.24;

import './TestBurnableToken.sol';
import 'openzeppelin-solidity/contracts/crowdsale/emission/AllowanceCrowdsale.sol';
import 'openzeppelin-solidity/contracts/crowdsale/validation/TimedCrowdsale.sol';


contract TestBurnableCrowdsale is TimedCrowdsale, AllowanceCrowdsale {
    constructor
        (
            uint256 _openingTime,
            uint256 _closingTime,
            uint256 _rate,
            address _wallet,
            StandardBurnableToken _token
        )
        public
        Crowdsale(_rate, _wallet, _token)
        TimedCrowdsale(_openingTime, _closingTime)
        AllowanceCrowdsale(_wallet) {
        }
}