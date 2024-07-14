import Node from "./node.js";

export default class Tree {
  constructor(array) {
    const sortedArray = [...new Set(array)].sort((a, b) => a - b);
    this.root = this.buildTree(sortedArray);
  }

  buildTree(array) {
    if (array.length === 0) {
      return null;
    }

    const mid = Math.floor(array.length / 2);
    const root = array[mid];
    const left = array.slice(0, mid);
    const right = array.slice(mid + 1, array.length);

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
        // Deletes closest node and creates new links
        node.right = this.deleteItem(closestNode.data, node.right);
        // Updates node data with closest node data
        node.data = closestNode.data;
      }
    }
    return node;
  }

  find(value, node = this.root) {
    if (!node) {
      console.log("Value not found in the tree");
      return;
    }

    if (value === node.data) {
      return node;
    }

    if (value < node.data) {
      node = this.find(value, node.left);
    } else {
      node = this.find(value, node.right);
    }
    return node;
  }

  levelOrderIteration(callback) {
    let queue = [];
    let values = [];
    queue.push(this.root);

    while (queue.length > 0) {
      let node = queue[0];
      if (!callback) {
        values.push(node.data);
      } else {
        callback(node);
      }
      if (node.left !== null) queue.push(node.left);
      if (node.right !== null) queue.push(node.right);
      queue.shift();
    }
    return values;
  }

  inOrder(callback, node = this.root) {
    if (node === null) return [];
    if (!callback) {
      return [
        ...this.inOrder(callback, node.left),
        node.data,
        ...this.inOrder(callback, node.right),
      ];
    } else {
      this.inOrder(callback, node.left);
      callback(node);
      this.inOrder(callback, node.right);
    }
  }

  preOrder(callback, node = this.root) {
    if (node === null) return [];
    if (!callback) {
      return [
        node.data,
        ...this.preOrder(callback, node.left),
        ...this.preOrder(callback, node.right),
      ];
    } else {
      callback(node);
      this.preOrder(callback, node.left);
      this.preOrder(callback, node.right);
    }
  }

  postOrder(callback, node = this.root) {
    if (node === null) return [];
    if (!callback) {
      return [
        ...this.postOrder(callback, node.left),
        ...this.postOrder(callback, node.right),
        node.data,
      ];
    } else {
      this.postOrder(callback, node.left);
      this.postOrder(callback, node.right);
      callback(node);
    }
  }

  height(node = this.root) {
    if (node === null) return 0;
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(node, root = this.root) {
    if (!root) {
      console.log("Value not found in the tree");
      return;
    }

    let depth = 0;

    if (node.data === root.data) {
      return depth + 1;
    }

    if (node.data < root.data) {
      depth = this.depth(node, root.left);
    } else {
      depth = this.depth(node, root.right);
    }
    return depth + 1;
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
