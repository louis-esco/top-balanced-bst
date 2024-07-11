import Node from "./node.js";

export default class Tree {
  constructor(array) {
    const sortedArray = [...new Set(array)].sort((a, b) => a - b);
    console.log(sortedArray);
    console.log(sortedArray.length);
    this.root = this.buildTree(sortedArray);
  }

  buildTree(array) {
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

  insert(value, node = this.root) {
    if (node === null) {
      node = new Node(value);
      return node;
    }

    if (value < node.data) {
      node.left = this.insert(value, node.left);
    } else if (value > node.data) {
      node.right = this.insert(value, node.right);
    }
    return node;
  }

  deleteItem(value, node = this.root) {
    if (node === null) return node;

    if (value < node.data) {
      // Finds the node in the tree and runs the function recursively
      node.left = this.deleteItem(value, node.left);
    } else if (value > node.data) {
      node.right = this.deleteItem(value, node.right);
    } else {
      if (node.left === null) {
        // If node has single on no child, then this child becomes the child of the previous node
        return node.right;
      } else if (node.right === null) {
        return node.left;
      } else {
        // If node has two children
        // Identify the closest superior node
        let closestNode = node.right;
        while (closestNode.left !== null) {
          closestNode = closestNode.left;
        }
        // Plug the node to its right to the following node
        node.right = this.deleteItem(closestNode.data, node.right);
        // Return closest node data with deleted node links
        return new Node(closestNode.data, node.left, node.right);
      }
    }
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
