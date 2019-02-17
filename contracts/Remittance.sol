pragma solidity ^0.4.21 ;

contract Remittance {
   address public manager;
   address public sender;
   address public recipient;
  

   function Remittance () payable public {
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

   function send(address personTosend) payable public {
       sender = msg.sender;
       recipient = personTosend;
       recipient.transfer(address(this).balance);
       emit FundsSent(sender, personTosend, address(this).balance);
   }  

}
