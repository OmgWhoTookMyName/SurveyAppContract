pragma solidity ^0.8.28;

import {Mathtester} from "./Mathtester.sol";
import {Test} from "forge-std/Test.sol";

contract MathtesterTest is Test {
    Mathtester mt;

    function setUp()public {
        mt = new Mathtester();
    }

    function test_PercentFunc() public {
        uint256 answer = 100;

        mt.mathdoer(1000, 10);

        require(mt.percNum() == answer, "Answer should be 100");
    }

    function test_trunc() public {
        mt.truncChecker(101, 100);

        require(mt.percNum() == 1, "Answer should be 1");
    }   

}