pragma solidity ^0.5.0;

import "./ERC721Full.sol";

contract PlantBase is ERC721Full {

    // TODO DECIDE ON NAME AND SYMBOL FOR OUR PLANTS
    constructor() ERC721Full("Plant", "PLANT") public {
    }

    // TODO Figure out if you need a Grown event
    event Grown(address owner, uint256 plantId, uint256 stats);

    struct Plant {
        // Attributes stored here
        uint256 stats;
        
        // Stored value in wei
        uint128 value;

        // When it was planted
        uint64 plantTime;
    }

    // Fee for creating a seed, going to be the reward for shipping it // TODO REEVALUATE VALUE
    uint256 public shippingFee = 0.001 ether;
    
    // Minimum plant price // TODO REEVALUATE VALUE
    uint256 public minPlantPrice = 0.001 ether;

    // How many seconds it takes to grow a plant // TODO MAYBE DO IT WITH BLOCK NUMBER INSTEAD IDK (SEARCH FOR now KEYWORD IF YOU CHANGE IT)
    uint256 public timeToGrow = 0;
    
    // Array of plants
    Plant[] public plants;


    function mint() public payable {
        require(msg.value >= shippingFee + minPlantPrice, "A plant cost more than that");
        uint128 _value = uint128(msg.value - shippingFee);
        Plant memory _plant = Plant({
            stats: 0,
            value: _value,
            plantTime: uint64(now)
        });
        uint _id = plants.push(_plant) - 1; //Zero indexed aray, the push returns array length
        _mint(msg.sender, _id);
    }

    function shipIt(uint _tokenId) public {
        // Check for validity of tokenId
        require(_exists(_tokenId), "Plant is burned or not minted");
        // Check if stats are already rolles / if plant is already shipped
        require(plants[_tokenId].stats == 0, "Plant is already shipped");
        // Check time requirement
        require(plants[_tokenId].plantTime + timeToGrow <= now, "Plant is not ready for shipping");
        
        // Rolling for stats with some "randomness" //TODO Find out which attributes are meaningfull to include
        plants[_tokenId].stats = uint256(keccak256(abi.encodePacked(blockhash(block.number - 1), plants[_tokenId].value, msg.sender, plants.length)));

        msg.sender.transfer(shippingFee);

        // Emmiting grown event
        emit Grown(ownerOf(_tokenId), _tokenId, plants[_tokenId].stats);
    }

    function refund(uint _tokenId) public {
        _burn(_tokenId);
        msg.sender.transfer(plants[_tokenId].value);
    }

    // TODO REMOVE DEBUG FUNCTION FOR NOW
    function debugTime() public view returns (uint) {
        return now;
    }

    // // TODO REEVALUATE IF YOU NEED THIS WITH THE ENUMERATE EXTENSION
    // /// @notice Returns a list of all Plant IDs assigned to an address.
    // /// @param _owner The owner whose plants we are interested in.
    // /// @dev Taken from the crypto kitties smart contract
    // function tokensOfOwner(address _owner) external view returns(uint256[] memory ownerTokens) {
    //     uint256 tokenCount = balanceOf(_owner);

    //     if (tokenCount == 0) {
    //         // Return an empty array
    //         return new uint256[](0);
    //     } else {
    //         uint256[] memory result = new uint256[](tokenCount);
    //         uint256 totalPlants = plants.length - 1;
    //         uint256 resultIndex = 0;

    //         // We count on the fact that all plants have IDs starting at 1 and increasing
    //         // sequentially up to the totalPlants count.
    //         uint256 plantId;

    //         for (plantId = 1; plantId <= totalPlants; plantId++) {
    //             if (ownerOf(plantId) == _owner) {
    //                 result[resultIndex] = plantId;
    //                 resultIndex++;
    //             }
    //         }

    //         return result;
    //     }
    // }
}