require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");
require("./tasks/block-number");

module.exports = {
  defaultNetwork: "goerli",
  networks: {
    goerli: {
      url: process.env.RPC_URL_GOERLI,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 5,
    },
  },
  solidity: "0.8.17",
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};
