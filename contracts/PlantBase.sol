pragma solidity ^0.5.0;

import "./ERC721.sol";

contract PlantBase is ERC721 {

    event Planted(address owner, uint256 plantId);

    event Grown(address owner, uint256 plantId, uint256 stats);

    event Refunded(address owner, uint256 plantId);

    struct Plant {
        // Attributes stored here
        uint256 stats;

        // When it was planted
        uint64 plantTime;

        // Which rarity tier it falls into
        uint16 rarityIndex;

        // Wether it's refunded or not
        bool live;

        // Wether it's a seed or not
        bool grown;

        // Stored value in wei
        uint128 value;
    }
    
    // Approximation of how may seconds it currently takes to mine a block
    uint256 public secondsPerBlock = 15;

    // Fee for creating a seed, going to be the reward for shipping it
    uint256 public shippingFee = 0.001 ether;
    
    // Minimum plant price
    uint256 public minPlantPrice = 0.001 ether;

    // How many blocks it takes to grow a plant
    uint256 public blocksToGrow = 3000;
    
    // Array of plants
    Plant[] plants;

    // Number of plants an adress currently has growing
    mapping (address => uint256) public plantsGrowing;

    // Number of plants an address has successfully grown
    mapping (address => uint256) public plantsGrown;

    // Only live modifier for the function only allowed on not refunded plants
    modifier onlyLive(uint256 _tokenId) {
        require(plants[_tokenId].live, "Plant is dead");
        _;
    }
    
    // Creation of a new seed
    function _createSeed() private {

        //TODO Checks on value of a seed/plant (Casting to uint128 securely)
        uint128 _value = uint128(msg.value - shippingFee);
        
        Plant memory _plant = Plant({
            stats: 0,
            plantTime: uint64(now),
            rarityIndex: 1,
            live: true,
            grown: false,
            value: _value
        });
        uint256 newPlantId = plants.push(_plant) - 1;
        //TODO check for never too many plants
        //FIXME how to set the plant to owner mapping
        _tokenOwner[newPlantId] = msg.sender;
        emit Planted(msg.sender, newPlantId);
    }
    

    // Refunds a token, killing it and sending back the ether value to the owner
    function refundToken(uint256 _tokenId) public onlyLive(_tokenId) {
        // TODO Make decission about wether it should be only owner or also approved who can refund
        require(_isApprovedOrOwner(msg.sender, _tokenId), "Sender not approved or token owner");
        plants[_tokenId].live = false;
        msg.sender.transfer(plants[_tokenId].value);
    }

    function plantSeed() public payable {
        require(msg.value >= minPlantPrice + shippingFee, "Not enough ether to buy a plant");
        _createSeed();
    }

    function shipIt(uint256 _tokenId) public {
        require(!plants[_tokenId].grown, "Plant is already shipped");
        // TODO add require for timer "Plant is not yet ready to be shipped"

        plants[_tokenId].grown = true;
        plants[_tokenId].stats = 0; // TODO call _rollStats for stats

        msg.sender.transfer(shippingFee);

        emit Grown(ownerOf(_tokenId), _tokenId, plants[_tokenId].stats);
    }

    /// @notice Returns a list of all Plant IDs assigned to an address.
    /// @param _owner The owner whose plants we are interested in.
    /// @dev Taken from the crypto kitties smart contract
    function tokensOfOwner(address _owner) external view returns(uint256[] memory ownerTokens) {
        uint256 tokenCount = balanceOf(_owner);

        if (tokenCount == 0) {
            // Return an empty array
            return new uint256[](0);
        } else {
            uint256[] memory result = new uint256[](tokenCount);
            uint256 totalPlants = plants.length - 1;
            uint256 resultIndex = 0;

            // We count on the fact that all plants have IDs starting at 1 and increasing
            // sequentially up to the totalPlants count.
            uint256 plantId;

            for (plantId = 1; plantId <= totalPlants; plantId++) {
                if (ownerOf(plantId) == _owner) {
                    result[resultIndex] = plantId;
                    resultIndex++;
                }
            }

            return result;
        }
    }

    /// @dev Rewrite this shit to actually do something meaningfull
    function _rollStats(uint256 _tokenId) private view {
        // TODO i dont really know what abi.encodePacked does/means, so maybe figure that shit out
        uint256 randomN = uint256(keccak256(abi.encodePacked(blockhash(block.number - 1), plants[_tokenId].value, msg.sender, plants.length)));
        uint8[8] memory shiftAmount = [4,4,4,4,5,5,6,6];
        uint24 _stats;
        uint256 i;
        uint8[64] memory numbers = [0,1,1,2,2,2,2,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,6,6,6,6,6,6,6,6,6,7,7,7,7];

        for (i = 0; i < shiftAmount.length; i++) {
            uint8 temp = shiftAmount[i];
            _stats = _stats + numbers[randomN % uint8(2 ** temp)];
            randomN = randomN >> temp;
            _stats = _stats << 3;
        }
    }
}