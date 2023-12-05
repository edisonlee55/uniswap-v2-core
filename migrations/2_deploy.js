require("dotenv").config({ path: "../.env" });

const UniswapV2Factory = artifacts.require("UniswapV2Factory");
const FeeToSetter = artifacts.require("FeeToSetter");
const FeeTo = artifacts.require("FeeTo");

const OwnerAddress = process.env.OWNER_ADDRESS;

module.exports = async function (deployer, network, accounts) {
    console.log("Deploying to network: " + network);
    console.log("Deployer address: " + accounts[0]);

    console.log("Owner address: " + OwnerAddress);

    await deployer.deploy(UniswapV2Factory, accounts[0]); // _feeToSetter

    await deployer.deploy(FeeTo, OwnerAddress); // owner_

    await deployer.deploy(FeeToSetter,
        UniswapV2Factory.address, // factory_
        1701336600, // vestingEnd_ (must be in the future)
        OwnerAddress, // owner_
        FeeTo.address, // feeTo_
    );

    await UniswapV2Factory.setFeeToSetter(FeeToSetter.address); // _feeToSetter
};
