pragma solidity ^0.5.0;

import "./ERC721Full.sol";

contract PlantBase is ERC721Full {

    // TODO DECIDE ON NAME AND SYMBOL FOR OUR PLANTS
    constructor() ERC721Full("Ethgarden.io", "GROW") public {
    }

    // TODO Figure out if you need a Grown event
    event Grown(address owner, uint256 plantId, uint256 stats);

    struct Plant {
        // Attributes stored here
        uint256 stats;
        
        // Stored value in wei //TODO REEVALUATE SIZE
        uint256 value;

        // When it was planted
        uint64 plantTime;

        // Address of potential ERC20 contract
        address ERC20Address;
    }

    // Fee for creating a seed, going to be the reward for shipping it // TODO REEVALUATE VALUE
    uint256 public shippingFee = 0.001 ether;
    
    // Minimum plant price // TODO REEVALUATE VALUE
    uint256 public minPlantPrice = 0.001 ether;

    // How many seconds it takes to grow a plant // TODO MAYBE DO IT WITH BLOCK NUMBER INSTEAD IDK (SEARCH FOR now KEYWORD IF YOU CHANGE IT)
    uint256 public timeToGrow = 0;

    // If plantifying ERC20 tokens is available
    mapping (address => bool) public isApprovedERC20;
    
    // Array of plants
    Plant[] public plants;


    function mint() public payable {
        require(msg.value >= shippingFee + minPlantPrice, "A plant cost more than that");
        uint256 _value = uint256(msg.value - shippingFee);
        Plant memory _plant = Plant({
            stats: 0,
            value: _value,
            plantTime: uint64(now),
            ERC20Address: address(0) // TODO Be sure what this does
        });
        uint _id = plants.push(_plant) - 1; //Zero indexed aray, the push returns array length
        _mint(msg.sender, _id);
    }

    function mintERC20(address _address) public payable { //TODO EVALUATE SECURITY 
        // Require address is approved
        require(isApprovedERC20[_address], "Address does not belong to an approved ERC20 token");
        
        // You still gotta pay a shipping fee
        require(msg.value >= shippingFee, "Pay the shipping fee"); //TODO WHAT HAPPENS IF TOO MUCH ETHER?
        
        // Check if there is an allowance
        ( , bytes memory allowance) = _address.staticcall(abi.encodeWithSignature("allowance(address,address)", msg.sender, address(this))); // This contract will never give an allowance, so this is safe?
        (uint256 _allowance) = abi.decode(allowance, (uint256));
        require(_allowance > 0, "There is no allowance");
        
        // Check balance of this contract before
        // ( , bytes memory contractBefore) = _address.staticcall(abi.encodeWithSelector(bytes4(keccak256("balanceOf(address)")), address(this)));
        
        // Check balance of sender before
        // ( , bytes memory senderBefore) = _address.staticcall(abi.encodeWithSelector(bytes4(keccak256("balanceOf(address)")), msg.sender));
        
        // Call the transferFrom function to transfer the ERC20 tokens
        ( , bytes memory success) = _address.call(abi.encodeWithSignature("transferFrom(address,address,uint256)", msg.sender, address(this), _allowance)); // This contract will never give and allowance, so this is safe?
        // require(abi.decode(alsoSuccess, (bool)), "hello"); //Maybe do something withthis?
        
        // Check balance of this contract after
        // ( , bytes memory contractAfter) = _address.staticcall(abi.encodeWithSelector(bytes4(keccak256("balanceOf(address)")), address(this)));
        
        // Check balance of sender after
        // ( , bytes memory senderAfter) = _address.staticcall(abi.encodeWithSelector(bytes4(keccak256("balanceOf(address)")), msg.sender));

   
        // Check if it the befores and afters match up with the allowance
        // assert((abi.decode(contractBefore, (uint256)) + _allowance) == abi.decode(contractAfter, (uint256)) && (abi.decode(senderBefore, (uint256)) - _allowance) == abi.decode(senderAfter, (uint256)), "Math does not work out");
        
        Plant memory _plant = Plant({
            stats: 0,
            value: _allowance,
            plantTime: uint64(now),
            ERC20Address: _address
        });
        uint _id = plants.push(_plant) - 1;
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

    function refund(uint _tokenId) public { //TODO EVALUATE SECURITY
        _burn(_tokenId);
        if(plants[_tokenId].ERC20Address == address(0)) {
            msg.sender.transfer(plants[_tokenId].value);
        } else {
            plants[_tokenId].ERC20Address.call(abi.encodeWithSignature("transfer(address,uint256)", msg.sender, plants[_tokenId].value));
        }
    }

    // TODO REMOVE DEBUG FUNCTION FOR NOW
    function debugTime() public view returns (uint) {
        return now;
    }

    function approveERC20(address _address) external { //TODO MAKE ONLY OWNER
        isApprovedERC20[_address] = true;
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