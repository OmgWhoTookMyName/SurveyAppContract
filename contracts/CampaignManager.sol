// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract CampaignManager{

    struct Campaign {
        address campaigner;
        mapping( address => bool ) partic;//Participants
        uint256 fund;
        uint256 fundPerPart;
        uint8 incent; //incentive percentage
        uint256 incentPerPart;
    }

    event CampaignCreated(uint16 curCampIndex, uint256 fundAmount);

    uint8 devFee = 1; //1% dev fee
    uint16 campIndex = 0;
    mapping(uint16 => Campaign) campaigns; 


    function StartCampaign(address[] calldata participants, 
                        uint8 incentPercent) public payable {
        require(participants.length <= 100 && participants.length > 0, 
        "0 to 100 participants");
        require(participants.length <= msg.value, "Insufficient wei for campaign");
        if(incentPercent > 0){
            require((participants.length * 2)<= msg.value, "Insufficient wei for incentive");
        }

        uint16 ci = ++campIndex;
        Campaign storage c = campaigns[ci];

        //Set the Parties
        c.campaigner = msg.sender;
        for(uint i=0; i < participants.length; i++){
            c.partic[participants[i]] = false;
        }

        //Decipher the funds
        c.fund = msg.value - (percentFinder(msg.value, 1));

        if(incentPercent == 0){
            c.incentPerPart = 0;
            c.fundPerPart = c.fund / participants.length;
        }
        else{
            uint256 totalIncent = percentFinder(c.fund, incentPercent);
            c.incentPerPart = totalIncent / participants.length;
            c.fundPerPart = (c.fund - totalIncent) / participants.length;
        }

        emit CampaignCreated(ci, c.fund);
    }

    function percentFinder(uint256 camp_amount, uint256 per) pure public returns (uint256){
        require(camp_amount > 0 && per > 0, "Invalid percentage number");
        
        uint256 trunc = 100;
        uint256 raw = camp_amount * per;

        return (raw / trunc);
    }

    function getCampFund(uint16 cInd) public view returns (uint256){
        return campaigns[cInd].fund;
    }


}