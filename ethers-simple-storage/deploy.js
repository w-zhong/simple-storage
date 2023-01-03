const ethers = require("ethers");
const fs = require("fs");
require("dotenv").config();

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL_GOERLI
  );
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  // const encryptedJson = fs.readFileSync("./.encryptedKey.json", "utf8");
  // let wallet = new ethers.Wallet.fromEncryptedJsonSync(
  //   encryptedJson,
  //   process.env.pw
  // );
  // wallet = await wallet.connect(provider);
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );

  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying....");
  const contract = await contractFactory.deploy();
  await contract.deployTransaction.wait(1);
  console.log(`Contract Address: ${contract.address}`);

  //   receipt can only be got after wait for 1 block
  //   console.log("Deploy receipt:");
  //   console.log(receipt);
  // transaction is what we get during deployment
  //   console.log("Deploy transaction:");
  //   console.log(contract.deployTransaction);

  const favoriteNumber = await contract.retrieve();
  console.log(`Current favorite number is ${favoriteNumber.toString()}`);

  const transactionResponse = await contract.store("7");
  await transactionResponse.wait(1);
  const updateFavoriteNumber = await contract.retrieve();
  console.log(`Updated favorite number is ${updateFavoriteNumber.toString()}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
