# Ethereum Merkle Airdrop

Minimal ERC-20 Merkle airdrop implementation:
- Solidity contract (`contracts/MerkleAirdrop.sol`)
- Root & proof generator (`scripts/generate-merkle.js`)
- Example list (`airdrop.json`) → writes `proofs.json`

> Generates a Merkle root from an address→amount list, then lets each address claim once with a Merkle proof.

---

## Features
- 🔒 One-time claim per address
- 🌳 On-chain Merkle proof verification
- 🧰 Simple JS script to build root + per-address proofs
- 🧪 Ready for Hardhat compile & testing

---

## Project Structure

