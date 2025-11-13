import { expect } from "chai";
import { network } from "hardhat";

const { ethers } = await network.connect();

describe("CampaignManager", function (){
  it("Should emit the campaign started event when calling the campaign start function", async function () {
    const cm = await ethers.deployContract("CampaignManager");
    const [owner, addr1, addr2, addr3] = await ethers.getSigners();
    const user = [addr1,addr2,addr3];

    await expect(cm.StartCampaign(user, 10n)).to.emit(cm, "CampaignCreated").withArgs(1n);
  });

  //What happens if you pass in no wei?
  //What happens if you pass in 1 wei?
  //1 wei among many people
  //Pass in 101 people
  //Pass in no people
  
});