import Node from "./node.js";

export default class Tree {
  constructor(array) {
    const sortedArray = [...new Set(array)].sort();
    this.root = this.buildTree(sortedArray);
  }

  buildTree(array) {
    console.log(array);
    if (array.length === 0) {
      return null;
    }

    const mid = Math.floor(array.length / 2);
    const root = array[mid];
    const left = array.slice(0, mid);
    const right = array.slice(mid + 1, array.length - 1);

    const node = new Node(root, this.buildTree(left), this.buildTree(right));

    return node;
  }

  prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
}
