pragma solidity ^0.5.0 ;

contract Remittance {
   address public manager;
   address public sender;
   address payable public recipient;
   address payable public eth_invest_pool;
   uint256 amountToinvest;
  

   constructor() public payable{
       manager = msg.sender;
       emit ContractCreated(manager, msg.value);
   }

   event FundsSent(address _from, address _to, uint amount); //integrate with front end
   event ContractCreated(address sender, uint amount);     // integrate with front end

   function deposit() payable public{
   }

   function getContractBalance() public view returns(uint) {
       return address(this).balance;
   }

   function send(address payable personTosend) payable public {
      //send eth present in contract
       sender = msg.sender;
       recipient = personTosend;
       recipient.transfer(address(this).balance);
       emit FundsSent(sender, personTosend, address(this).balance);
   }
}
