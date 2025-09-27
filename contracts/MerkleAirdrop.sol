// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {MerkleProof} from "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract MerkleAirdrop {
    IERC20 public immutable token;
    bytes32 public immutable merkleRoot;
    mapping(address => bool) public claimed;

    event Claimed(address indexed account, uint256 amount);

    constructor(IERC20 _token, bytes32 _root) {
        token = _token;
        merkleRoot = _root;
    }

    function claim(uint256 amount, bytes32[] calldata proof) external {
        require(!claimed[msg.sender], "already claimed");
        bytes32 leaf = keccak256(abi.encodePacked(msg.sender, amount));
        require(MerkleProof.verify(proof, merkleRoot, leaf), "invalid proof");
        claimed[msg.sender] = true;
        require(token.transfer(msg.sender, amount), "transfer failed");
        emit Claimed(msg.sender, amount);
    }
}
