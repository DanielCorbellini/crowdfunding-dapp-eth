// SPDX-License-Identifier: MIT

pragma solidity ^0.8.31;

import "./Campaign.sol";

contract CampaignFactory {
    Campaign[] public deployedCampaigns;

    function createCampaign(uint minimumContribution) public {
        Campaign newCampaign = new Campaign(minimumContribution, msg.sender);
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (Campaign[] memory) {
        return deployedCampaigns;
    }
}
