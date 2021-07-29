class Tree {
  // BinarySearchTree constructor function
  constructor(val) {
    this.value = val;
    this.left = null;
    this.right = null;
  }

  // BinarySearchTree.prototype.insert
  insert(val) {
    if (val < this.value) {
      if (this.left) {
        this.left.insert(val);
      } else {
        this.left = new Tree(val);
      }
    } else if (val > this.value) {
      if (this.right) {
        this.right.insert(val);
      } else {
        this.right = new Tree(val);
      }
    }
    return this; // for chaining, do not edit
  }

  // BinarySearchTree.prototype.min
  min() {
    const currentVal = this.value;
    if (!this.left) {
      return currentVal;
    } else {
      return this.left.min();
    }
  }

  // BinarySearchTree.prototype.max
  max() {
    const currentVal = this.value;
    if (!this.right) {
      return currentVal;
    } else {
      return this.right.max();
    }
  }

  // BinarySearchTree.prototype.contains
  contains(val) {
    const currentVal = this.value;
    if (val === currentVal) {
      return true;
    } else if (this.left && val < currentVal) {
      return this.left.contains(val);
    } else if (this.right && val > currentVal) {
      return this.right.contains(val);
    }
    return false;
  }

  inOrderTraverse(callbackFunc) {
    if (this.left) {
      this.left.inOrderTraverse(callbackFunc);
    }
    callbackFunc(this.value);
    if (this.right) {
      this.right.inOrderTraverse(callbackFunc);
    }
  }

  preOrderTraverse(callbackFunc) {
    callbackFunc(this.value);
    if (this.left) {
      this.left.preOrderTraverse(callbackFunc);
    }
    if (this.right) {
      this.right.preOrderTraverse(callbackFunc);
    }
  }

  postOrderTraverse(callbackFunc) {
    if (this.left) {
      this.left.postOrderTraverse(callbackFunc);
    }
    if (this.right) {
      this.right.postOrderTraverse(callbackFunc);
    }
    callbackFunc(this.value);
  }
}

export default Tree;
