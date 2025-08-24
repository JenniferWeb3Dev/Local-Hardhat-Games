// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Game4 {
    mapping(address => uint256) public balances;

    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }

    function win() public {
        require(balances[msg.sender] >= 1 ether, "Not enough ether deposited");
        payable(msg.sender).transfer(address(this).balance);
        emit Winner(msg.sender);
    }

    event Winner(address winner);
}
