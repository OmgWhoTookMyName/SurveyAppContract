import { expect } from "chai";
import { network } from "hardhat";

const { ethers } = await network.connect();

describe("CampaignManager", function (){
  it("Should emit the campaign started event when calling the campaign start function", async function () {
    const cm = await ethers.deployContract("CampaignManager");

    const [owner, addr1, addr2, addr3] = await ethers.getSigners();
    const user = [addr1,addr2,addr3];

    const campaignFund = 100000;
    const devFee = campaignFund * .01;
    const fundLessFee = campaignFund - devFee;

    await expect(cm.StartCampaign(user, 10n, {
      value: 100000
    })).to.emit(cm, "CampaignCreated").withArgs(1n, BigInt(fundLessFee));
  });

  //What happens if you pass in no wei?

    it("Should revert when calling the campaign start function with no wei", async function () {
    const cm = await ethers.deployContract("CampaignManager");

    const [owner, addr1, addr2, addr3] = await ethers.getSigners();
    const user = [addr1,addr2,addr3];

    await expect(cm.StartCampaign(user, 10n)).to.revertedWith('Insufficient wei');
  });
  //What happens if you pass in 1 wei?
  //What happens when you pass in the minimum viable amount of wei?
  //1 wei among many people
  //Pass in 101 people
  //Pass in no people
  
});