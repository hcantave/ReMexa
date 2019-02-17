const HDWalletProvider = require("truffle-hdwallet-provider");

const Web3 = require("web3");
const { interface, bytecode } = require("./compile");

const provider = new HDWalletProvider(
  "strike screen gentle plunge exotic hammer name venue debate viable depart sell",
  "https://rinkeby.infura.io/v3/32d63d28421e4bd5837aa2806350d537"
);

console.log("here\n");
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log(accounts);
  console.log("Attempting to deploy from account", accounts[0]);

  // truffle-hdwallet-provider version 0.0.3
  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({
      gas: "1000000",
      from: accounts[0],
      value: web3.utils.toWei("2", "ether")
    });

  //    console.log(result.interface);

  console.log("Contract deployed to", result.options.address);
};

deploy();
