// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract CampaignManager{

    struct Campaign {
        address campaigner;
        mapping( address => bool ) partic;
        uint256 fund;
        uint8 incent; //incentive percentage
    }

    event CampaignCreated(uint16 curCampIndex);

    uint8 devFee = 1; //1% dev fee
    uint16 campIndex = 0;
    mapping(uint => Campaign) campaigns; 


    function StartCampaign(address[] calldata participants, uint8 incentPercent) public payable {
        require(participants.length <= 100, "");
        uint16 ci = campIndex++;
        Campaign storage c = campaigns[ci];

        //Set the Parties
        c.campaigner = msg.sender;
        for(uint i=0; i < participants.length; i++){
            c.partic[participants[i]] = false;
        }

        //Decipher the funds
        c.fund = msg.value - (percentFinder(msg.value, 1));
        c.incent = incentPercent;

        emit CampaignCreated(ci);
    }

    function percentFinder(uint256 camp_amount, uint256 per) public returns (uint256){
        uint256 trunc = 100;
        uint256 raw = camp_amount * per;

        return (raw / trunc);
    }

}