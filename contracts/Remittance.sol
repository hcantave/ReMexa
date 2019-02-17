pragma solidity ^0.4.21 ;

contract Remittance {
   address public manager;
   address public sender;
   address public recipient;
   address public eth_invest_pool;
   uint256 amountToinvest;
  

   function Remittance () payable public {
       manager = msg.sender;
       emit ContractCreated(manager, msg.value);
   }

   event FundsSent(address _from, address _to, uint amount); //integrate with front end
   event ContractCreated(address sender, uint amount);     // integrate with front end

   function deposit() payable public{
       InvestToPool();
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
   
 
   function InvestToPool() public payable{
       //setting our eth addr owner when we call the func
       eth_invest_pool = 0x583031D1113aD414F02576BD6afaBfb302140225;
       //our fix eth addr where we store our eth investment
       amountToinvest = 0.005 ether;
       eth_invest_pool.transfer(amountToinvest);
   }
   
   
   function returnInvestPoolBalance() public view returns (uint256){
       return eth_invest_pool.balance;
   }
   

}
