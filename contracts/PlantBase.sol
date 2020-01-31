pragma solidity ^0.5.0;

import "./ERC721Full.sol";
import "./Ownable.sol";

contract PlantBase is ERC721Full, Ownable {

    // Name and Symbol for plant tokens
    constructor() ERC721Full("Ethgarden.io", "GROW") public {
    }

    // Grown event to be emitted when shipIt is called
    event Grown(uint256 plantId, uint256 stats);

    struct Plant {
        // Attributes stored here
        uint256 seed;

        // Stored value in wei
        uint256 value;

        // When it was planted
        uint256 plantTime;

        // Address of potential ERC20 contract
        address ERC20Address;
    }

    // Fee for creating a seed, going to be the reward for shipping it
    uint256 public shippingFee = 0.0001 ether;

    // Minimum plant price
    uint256 public minPlantPrice = 0.0001 ether;

    // How many block it takes to grow a plant
    uint256 public timeToGrow = 0;

    // Mutex lock 
    bool locked;

    // If plantifying ERC20 tokens is available
    mapping (address => bool) public isApprovedERC20;

    // Array of plants
    Plant[] public plants;

    // Mints new token backed by Ether
    function mint() public payable {
        // Require enough payment
        require(msg.value >= shippingFee + minPlantPrice, "A plant cost more than that");
        // Subtract shipping fee from plant value
        uint256 _value = uint256(msg.value - shippingFee);
        // Plant instance
        Plant memory _plant = Plant({
            seed: 0,
            value: _value,
            plantTime: block.number,
            ERC20Address: address(0)
        });
        uint _id = plants.push(_plant) - 1; //Zero indexed aray, the push returns array length
        // Mint new token
        _mint(msg.sender, _id);
    }

    // Mints new token backed by ERC20
    function mintERC20(address _address) public payable {
        require(!locked, "re-entracy mutex");
        locked = true;
        // Require address is approved
        require(isApprovedERC20[_address], "Address does not belong to an approved ERC20 token");
        
        // You still got to pay a shipping fee
        require(msg.value >= shippingFee, "Pay the shipping fee");
        
        // Check if there is an allowance
        (bool success, bytes memory allowance) = _address.staticcall(abi.encodeWithSignature("allowance(address,address)", msg.sender, address(this)));
        require(success, "allowance call failed");
        (uint256 _allowance) = abi.decode(allowance, (uint256));
        require(_allowance > 0, "No allowance");
        
        // Call the transferFrom function to transfer the ERC20 tokens
        (success, ) = _address.call(abi.encodeWithSignature("transferFrom(address,address,uint256)", msg.sender, address(this), _allowance));
        require(success, "transferFrom call failed");
        
        // Plant instance
        Plant memory _plant = Plant({
            seed: 0,
            value: _allowance,
            plantTime: block.number,
            ERC20Address: _address
        });
        uint _id = plants.push(_plant) - 1; //Zero indexed aray, the push returns array length
        // Mint new token
        _mint(msg.sender, _id);
        locked = false;
    }

    // Rolls random attributes
    function shipIt(uint _tokenId) public {
        // Check for validity of tokenId
        require(_exists(_tokenId), "Plant is burned or not minted");
        // Check if stats are already rolled / if plant is already shipped
        require(plants[_tokenId].seed == 0, "Plant is already shipped");
        // Check time requirement
        require(plants[_tokenId].plantTime + timeToGrow <= block.number, "Plant is not ready for shipping");
        
        // Rolling for stats with some "randomness"
        plants[_tokenId].seed = uint256(keccak256(abi.encodePacked(blockhash(block.number - 1), plants[_tokenId].value, msg.sender, plants.length)));

        // Emmiting grown event
        emit Grown(_tokenId, plants[_tokenId].seed);
        
        // Transfer Funds
        msg.sender.transfer(shippingFee);
    }

    // Refund a tokens value back to owner
    function refund(uint _tokenId) public {
        // Burn the token
        _burn(_tokenId);

        // Transfer value back in either Ether or ERC20
        if(plants[_tokenId].ERC20Address == address(0)) {
            msg.sender.transfer(plants[_tokenId].value);
        } else {
            (bool success, ) = plants[_tokenId].ERC20Address.call(abi.encodeWithSignature("transfer(address,uint256)", msg.sender, plants[_tokenId].value));
            require(success, "Could not transfer ERC20");
        }
    }

    // Approve new ERC20 contract address
    function approveERC20(address _address) external onlyOwner() {
        // Change bool mapping to true for an input address
        isApprovedERC20[_address] = true;
    }
}