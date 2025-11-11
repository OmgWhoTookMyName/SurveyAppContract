import { expect } from "chai";
import { network } from "hardhat";

const { ethers } = await network.connect();

describe("CampaignMananger", function (){
  it("Should emit the Increment event when calling the inc() function", async function () {
    const cm = await ethers.deployContract("CampaignMananger");

    const [owner, addr1, addr2, addr3] = await ethers.getSigners();

    const user = [addr1,addr2,addr3];


    await expect(cm.StartCampaign(user, 10n)).to.emit(cm, "CampaignCreated").withArgs(1n);
    //await expect(counter.inc()).to.emit(counter, "Increment").withArgs(1n);
  });


}