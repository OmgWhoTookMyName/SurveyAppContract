// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract Mathtester {

    uint256 public percNum;

    event Mathness(uint256 ok);

    function mathdoer(uint256 camp_amount, uint256 per) public {
        uint256 trunc = 100;
        uint256 raw = camp_amount * per;

        percNum = raw / trunc;

        emit Mathness(raw / trunc);
    }

}