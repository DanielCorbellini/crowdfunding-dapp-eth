// SPDX-License-Identifier: MIT

pragma solidity ^0.8.31;

struct Request {
    string description;
    uint value;
    address payable recipient;
    bool complete;
    uint approvalCount;
    mapping(address => bool) approvals;
}
