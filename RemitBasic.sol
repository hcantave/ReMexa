pragma solidity >=0.4.22 <0.6.0;

contract Remittance {
    uint public value;
    address payable public sender;
    address payable public receiver;
    enum State { Created, Locked, Inactive }
    State public state;
 
    constructor() public payable {
        sender = msg.sender;
        value = msg.value;
    }

    modifier condition(bool _condition) {
        require(_condition);
        _;
    }


    modifier onlySender() {
        require(
            msg.sender == sender,
            "Only seller can call this."
        );
        _;
    }

    modifier inState(State _state) {
        require(
            state == _state,
            "Invalid state."
        );
        _;
    }

    event TransacConfirmed();
    event MoneyReceived();

    function confirmPurchase()
        public
        inState(State.Created)
        condition(msg.value == ( value))
        payable
    {
        emit TransacConfirmed();
        state = State.Locked;
    }
    function withdraw() public {
        msg.sender.transfer(address(this).balance);
    }

    function deposit(uint256 amount) payable public {
        require(msg.value == amount);
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
    function() external payable{
    }

    function confirmReceived()
        public
        onlySender
        inState(State.Locked)
    {
        emit MoneyReceived();
        state = State.Inactive;
        //receiver.transfer(value);
        sender.transfer(address(this).balance);
    }
}