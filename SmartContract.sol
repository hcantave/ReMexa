pragma solidity ^0.5.0 ;

contract mexremit{
    address public manager;
    address public sender;
    address payable public receiver;
    address[] public senders;
    
    constructor() public payable{
        manager = msg.sender;
    }
    
    function deposit() payable public{
    }
    
    function returnPoolbalance() public view returns(uint){
        return address(this).balance;
    }
    
    function send(address payable personTosend) payable public {
        sender = msg.sender;
        receiver = personTosend;
        receiver.transfer(address(this).balance);
    }
    
}