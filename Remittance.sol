pragma solidity >=0.4.22 <0.6.0;
import "./FiatContract.sol";

contract Remittance {
    
    address public sender;
    address public receiver;
    uint256 public amount; 

 //   FiatContract price = FiatContract(0x8055d0504666e2B6942BeB8D6014c964658Ca591); // MAINNET ADDRESS
    FiatContract price = FiatContract(0x2CDe56E5c8235D6360CCbb0c57Ce248Ca9C80909); // TESTNET ADDRESS (ROPSTEN)

    
    constructor (address _sender, address _receiver) public {
       sender = _sender;
       receiver = _receiver;
       amount = 0;
    }
    
    
    
    
    function send(address payable _receiver) onlySender() payable public {
        
        _receiver.transfer(msg.value);
        
        emit LogSendFunds(_receiver, block.timestamp, msg.value);
        
    }
    
    // returns $5.00 USD in ETH wei.
    // can be used as a flat fee?
    function FiveETHUSD() public returns (uint256) {
        // returns $0.01 ETH wei
        uint256 ethCent = price.USD(0);
        // $0.01 * 500 = $5.00
        return ethCent * 500;
    }
    
    function OneHundredETHUSD() public returns (uint256) {
        uint256 ethCent = price.USD(0);
        return ethCent * 10000;
    }
    
    // function withdraw() onlyReceiver() public {
        
    // }
    
    
    
    
    modifier onlySender () {
        require(sender == msg.sender);
        _;
    }
    
    modifier onlyReceiver () {
        require(receiver == msg.sender);
        _;
    }
    
    // **** use events to pass along return values from contract to frontend ****
    // stores all the data contained when user sends funds
    event LogSendFunds(address indexed sender, uint timestamp, uint amount);

    // stores all data contained when user submits an answer
    event LogConvertFunds(uint timestamp, uint amount);

    // stores key to question, address of withdrawer and time stamp
    event LogReceiveFunds(address receiver, uint timestamp, uint amount);
    
    
    
    
    
    
}