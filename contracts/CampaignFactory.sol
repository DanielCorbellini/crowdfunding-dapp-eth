// SPDX-License-Identifier: MIT

pragma solidity ^0.8.31;

import "./Campaign.sol";

contract CampaignFactory {
    Campaign[] public deployedCampaigns;

    /**
     * @dev Emitted when a new campaign is created.
     * @param campaign The address of the new campaign.
     * @param creator The address of the campaign creator.
     */
    event CampaignCreated(address indexed campaign, address indexed creator);

    function createCampaign(uint minimumContribution, uint goalAmount) public {
        Campaign newCampaign = new Campaign(
            minimumContribution,
            msg.sender,
            goalAmount
        );
        deployedCampaigns.push(newCampaign);

        emit CampaignCreated(address(newCampaign), msg.sender);
    }

    function getDeployedCampaigns() public view returns (Campaign[] memory) {
        return deployedCampaigns;
    }
}
