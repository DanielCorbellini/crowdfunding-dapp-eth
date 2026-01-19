// SPDX-License-Identifier: MIT

pragma solidity ^0.8.31;

import "./Campaign.sol";

contract CampaignFactory {
    Campaign[] public deployedCampaigns;

    event CampaignCreated(address indexed campaign, address indexed creator);

    function createCampaign(uint minimumContribution) public {
        Campaign newCampaign = new Campaign(minimumContribution, msg.sender);
        deployedCampaigns.push(newCampaign);

        emit CampaignCreated(address(newCampaign), msg.sender);
    }

    function getDeployedCampaigns() public view returns (Campaign[] memory) {
        return deployedCampaigns;
    }
}
