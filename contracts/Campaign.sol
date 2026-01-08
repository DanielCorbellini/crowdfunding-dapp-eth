// SPDX-License-Identifier: MIT

pragma solidity ^0.8.31;

import "./DataStructures.sol";

contract Campaign {
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    Request[] public requests;
    uint public approversCount;

    // modifier to check if caller is owner
    modifier restricted() {
        require(msg.sender == manager, "You are not the manager");
        _;
    }

    constructor(uint minimum) {
        manager = msg.sender;
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require(
            msg.value >= minimumContribution,
            "Minimum contribution not met"
        );

        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(
        string memory description,
        uint value,
        address payable recipient
    ) public restricted {
        Request storage newRequest = requests.push();

        newRequest.description = description;
        newRequest.value = value;
        newRequest.recipient = recipient;
        newRequest.complete = false;
        newRequest.approvalCount = 0;
    }

    function approveRequest(uint index) public {
        Request storage request = requests[index];

        require(approvers[msg.sender], "You are not an approver");
        require(
            !request.approvals[msg.sender],
            "You have already approved this request"
        );

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];
        require(!request.complete, "Request already completed");
        require(
            request.approvalCount > approversCount / 2,
            "Not enough approvals"
        );

        (bool success, ) = request.recipient.call{value: request.value}("");
        require(success, "Transfer failed");

        request.complete = true;
    }
}
