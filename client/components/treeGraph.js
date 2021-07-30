import React from "react";
import Tree from "react-d3-tree";
import TreeMaker from "./dataStructures/tree";

const scale = ['C','D','E','F','G','A','B']
const binaryTree = new TreeMaker(4);
binaryTree.insert(5);
binaryTree.insert(2);
binaryTree.insert(3);
binaryTree.insert(6);
binaryTree.insert(1);
binaryTree.insert(0);

const createD3TreeData = (tree, parent) => {
    const parentOrNull = parent ? parent : null;
    let treeData = {
      parent: parentOrNull,
      name: tree.value,
    };
    const children = [];
    tree.left && children.push(createD3TreeData(tree.left, tree.value));
    tree.right &&
      children.push(createD3TreeData(tree.right, tree.value));
    if (children.length > 0) {
      treeData.children = children;
    }
    return treeData;
};


export const TreeVisualisation = () => {
    const treeData = createD3TreeData(binaryTree, null, scale);
    console.log(treeData)
    return (
      <div id="treeWrapper" style={{ width: "50em" }}>
        {Object.keys(treeData).length && (
          <Tree
            data={treeData}
            zoomable="false"
            orientation="vertical"
            collapsible="false"
            translate={{ x: 400, y: 50 }}
          />
        )}
      </div>
    );
}

