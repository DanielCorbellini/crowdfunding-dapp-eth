// SPDX-License-Identifier: MIT

pragma solidity ^0.8.31;

import "./DataStructures.sol";

contract Campaign {
    address public manager;
    uint public minimumContribution;
    uint public goal;
    uint public totalContributed;
    mapping(address => bool) public approvers;
    Request[] public requests;
    uint public approversCount;

    // modifier to check if caller is owner
    modifier restricted() {
        require(msg.sender == manager, "You are not the manager");
        _;
    }

    constructor(uint minimum, address managerAddress, uint goalAmount) {
        require(minimum > 0, "Minimum contribution must be greater than 0");
        require(goalAmount > 0, "Goal must be greater than 0");

        manager = managerAddress;
        minimumContribution = minimum;
        goal = goalAmount;
    }

    function contribute() public payable {
        require(
            msg.value >= minimumContribution,
            "Minimum contribution not met"
        );

        totalContributed += msg.value;
        if (!approvers[msg.sender]) {
            approversCount++;
            approvers[msg.sender] = true;
        }
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

    function getSummary()
        public
        view
        returns (uint, uint, uint, uint, address, uint, uint)
    {
        return (
            minimumContribution,
            address(this).balance,
            requests.length,
            approversCount,
            manager,
            goal,
            totalContributed
        );
    }

    function getRequestsCount() public view returns (uint) {
        return requests.length;
    }
}
