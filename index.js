import Tree from "./tree.js";

let arr = Array.from({ length: 30 }, () => Math.floor(Math.random() * 100));
let tree = new Tree(arr);

console.log(tree.isBalanced());
console.log(tree.levelOrderIteration());
console.log(tree.preOrder());
console.log(tree.inOrder());
console.log(tree.postOrder());
tree.insert(102);
tree.insert(123);
tree.insert(145);
tree.insert(198);
tree.insert(200);
console.log(tree.isBalanced());
tree.rebalance();
console.log(tree.isBalanced());
console.log(tree.levelOrderIteration());
console.log(tree.preOrder());
console.log(tree.inOrder());
console.log(tree.postOrder());
