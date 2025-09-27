const fs = require("fs");
const keccak256 = require("keccak256");
const { MerkleTree } = require("merkletreejs");

function toUint256Hex(decStr) {
  const hex = BigInt(decStr).toString(16);
  return hex.padStart(64, "0");
}

function leafFrom(addr, amountWei) {
  const addrBuf = Buffer.from(addr.slice(2), "hex");
  const amtBuf = Buffer.from(toUint256Hex(amountWei), "hex");
  return keccak256(Buffer.concat([addrBuf, amtBuf]));
}

const list = JSON.parse(fs.readFileSync("airdrop.json", "utf8"));
const leaves = list.map((x) => leafFrom(x.address, x.amount));
const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });

console.log("MERKLE ROOT:", "0x" + tree.getRoot().toString("hex"));

const proofs = {};
for (const x of list) {
  const leaf = leafFrom(x.address, x.amount);
  proofs[x.address] = tree.getHexProof(leaf);
}
fs.writeFileSync("proofs.json", JSON.stringify(proofs, null, 2));
console.log("proofs.json written");

