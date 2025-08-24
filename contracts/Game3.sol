// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Game3 {
    mapping(address => uint) public balances;

    function buy() external payable {
        balances[msg.sender] += msg.value;
    }

    function win(address addr1, address addr2, address addr3) external {
        require(balances[addr1] > 0);
        require(balances[addr2] > 0);
        require(balances[addr3] > 0);
        require(addr1 != addr2 && addr2 != addr3 && addr3 != addr1);

        emit Winner(msg.sender);
    }

    event Winner(address winner);
}
