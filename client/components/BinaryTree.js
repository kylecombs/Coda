import React from "react";
import Tree from "./dataStructures/tree";

export class BinaryTree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      traverseList: [],
      traversalType: "",
    };

    this.tree = new Tree(4);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.tree.insert(5);
    this.tree.insert(2);
    this.tree.insert(3);
    this.tree.insert(7);
    this.tree.insert(6);
    this.tree.insert(1);
    this.tree.insert(0);
    this.tree.insert(8);
  }

  handleChange(selectedTraversal) {
    this.setState({ selectedTraversal, traversedList: [] }, () => {});
  }

  render() {
    console.log(this.tree);
    return (
      <div>
        <h1>Binary Tree</h1>
        {this.tree.left &&
        <div id="tree-container">
          <div className="node root tier">{this.tree.value}</div>
          <div className="tier level1">
            <div className="node">{this.tree.left.value}</div><div className="node">{this.tree.right.value}</div>
          </div>
          <div className="tier level2">
           <div className="left-branch"> <div className="node">{this.tree.left.left.value}</div> <div className="node">{this.tree.left.right.value}</div> </div>
            <div className="node">{this.tree.right.right.value}</div>
          </div>
          <div className="tier level3">
            <div className="node">{this.tree.left.left.left.value}</div>
            <div className="right-branch">
            <div className="node">{this.tree.right.right.left.value}</div>
            <div className="node">{this.tree.right.right.right.value}</div>
            </div>
          </div>
        </div>}
      </div>
    );
  }
}
