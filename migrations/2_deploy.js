require("dotenv").config({ path: "../.env" });

const UniswapV2Factory = artifacts.require("UniswapV2Factory");
const FeeToSetter = artifacts.require("FeeToSetter");
const FeeTo = artifacts.require("FeeTo");

const DaoTimelockAddress = process.env.DAO_TIMELOCK_ADDRESS; // DAOTimelock

module.exports = async function (deployer, network, accounts) {
    console.log("Deploying to network: " + network);
    console.log("Deployer address: " + accounts[0]);

    console.log(DaoTimelockAddress);

    await deployer.deploy(UniswapV2Factory, accounts[0]); // _feeToSetter

    await deployer.deploy(FeeTo, DaoTimelockAddress); // owner_

    await deployer.deploy(FeeToSetter,
        UniswapV2Factory.address, // factory_
        1701336600, // vestingEnd_ (must be in the future)
        DaoTimelockAddress, // owner_
        FeeTo.address, // feeTo_
    );

    await UniswapV2Factory.setFeeToSetter(FeeToSetter.address); // _feeToSetter
};
