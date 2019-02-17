const path = require("path");
const fs = require("fs");
const solc = require("solc");
const lotteryPath = path.resolve(__dirname, "contracts", "Remittance.sol");

const source = fs.readFileSync(lotteryPath, "utf8");
const output = solc.compile(source, 1).contracts[":Remittance"];
console.log(output.interface);
console.log(output.bytecode);

module.exports = output;
