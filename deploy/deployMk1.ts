import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import verify from "../utils/verify"
import "dotenv/config"

const funk: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {

  console.log('Starting...')

  const { getNamedAccounts, deployments } = hre
  const { deploy } = deployments
  const { deployer } = await getNamedAccounts()

  const smartContract = await deploy("MyToken", {
    from: deployer,
    args: [],
    log: true,
    waitConfirmations: 1,
  })
  console.log(`MyToken at ${smartContract.address}`)

  console.log('Start verify...');

  if (process.env.NODE_ENV != 'local') {
    await verify(smartContract.address, [])
  }

  console.log('Verification finish');
}

export default funk
funk.tags = ["all"]

