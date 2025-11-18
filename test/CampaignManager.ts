import { expect } from "chai";
import { network } from "hardhat";

const { ethers } = await network.connect();

describe("Campaign start function", function (){
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

    await expect(cm.StartCampaign(user, 10n)).to.revertedWith('Insufficient wei for campaign');
  });

  //What happens if you pass in 1 wei?
    it("Should revert when calling campaign start with 1 wei", async function () {
    const cm = await ethers.deployContract("CampaignManager");

    const [owner, addr1, addr2, addr3] = await ethers.getSigners();
    const user = [addr1,addr2,addr3];


    await expect(cm.StartCampaign(user, 10n, {
      value: 1
    })).to.revertedWith('Insufficient wei for campaign');
  });


  //What happens when you pass in the minimum viable amount of wei?
  //TODO: Check the funds per participant and incentive, what do we expect them to be?
    it("Should emit the campaign started event when calling with minimum wei", async function () {
    const cm = await ethers.deployContract("CampaignManager");

    const [owner, addr1, addr2, addr3] = await ethers.getSigners();
    const user = [addr1,addr2,addr3];

    const campaignFund = user.length;
    const devFee = campaignFund * .01;
    const fundLessFee = campaignFund - devFee;

    //With campaigns < 100 wei fees are not extracted
    await expect(cm.StartCampaign(user, 0n, {
      value: campaignFund
    })).to.emit(cm, "CampaignCreated").withArgs(1n, BigInt(Math.round(fundLessFee)));

    const perPar = await cm.getCampPerParticipant(1n);

    expect(perPar).to.equal(1n);
  });


  //What happens if you're just shy of the minimum?
      it("Should revert when calling campaign start without minimum wei", async function () {
    const cm = await ethers.deployContract("CampaignManager");

    const [owner, addr1, addr2, addr3] = await ethers.getSigners();
    const user = [addr1,addr2,addr3];

    const campaignFund = user.length - 1;
    const devFee = campaignFund * .01;
    const fundLessFee = campaignFund - devFee;

    //With campaigns < 100 wei fees are not extracted
    await expect(cm.StartCampaign(user, 10n, {
      value: campaignFund
    })).to.revertedWith('Insufficient wei for campaign');
  });


  //What is the minimum amount viable to collect a dev fee?
  //Need at least 100 wei per person to collect fee
      it("Should collect dev fee on campaign start with at least 100 wei per participant", async function () {
    const cm = await ethers.deployContract("CampaignManager");

    const [owner, addr1, addr2, addr3] = await ethers.getSigners();
    const user = [addr1,addr2,addr3];

    const campaignFund = user.length * 100;
    const devFee = campaignFund * .01;
    const fundLessFee = campaignFund - devFee;

    await expect(cm.StartCampaign(user, 1n, {
      value: campaignFund
    })).to.emit(cm, "CampaignCreated").withArgs(1n, BigInt(Math.trunc(fundLessFee)));
  });

  //Minimum viable to send an incentive
  //1 wei among many people
  //Pass in 101 people
  //Pass in no people
  
});