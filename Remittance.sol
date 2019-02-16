pragma solidity >=0.4.22 <0.6.0;
contract Remittance {
    
    address public sender;
    address public receiver;
    uint256 public amount; 
    
    // **** use events to pass along return values from contract to frontend ****
    // stores all the data contained when user sends funds
    event LogSendFunds(address indexed sender, uint timestamp, uint amount);

    // stores all data contained when user submits an answer
    event LogConvertFunds(uint timestamp, uint amount);

    // stores key to question, address of withdrawer and time stamp
    event LogReceiveFunds(address receiver, uint timestamp, uint amount);
    
    constructor (address _sender, address _receiver) public {
       sender = _sender;
       receiver = _receiver;
    }
    
    
    function send(address payable _receiver) onlySender() payable public {

        amount = msg.value;
        
        _receiver.transfer(msg.value);
        
        emit LogSendFunds(_receiver, block.timestamp, msg.value);
        
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
    
    
    
    
    
    
}