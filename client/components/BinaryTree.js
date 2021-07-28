import React from "react";
import Tree from "./dataStructures/tree";
import {
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  Button,
} from "@material-ui/core";
import { Scale } from "@tonaljs/tonal";
import * as Tone from "tone";

export class BinaryTree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      soundSource: new Tone.Synth().toDestination(),
      traverseList: [],
      traversalType: "inOrder",
      scaleName: "major",
      scale: ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"],
      octave: 4,
      selectedNode: null,
    };

    this.tree = new Tree(4);
    this.handleChange = this.handleChange.bind(this);
    this.changeScale = this.changeScale.bind(this);
    this.traverseTree = this.traverseTree.bind(this);
    this.traverseAnimation = this.traverseAnimation.bind(this);
    this.playNote = this.playNote.bind(this)
    this.tree.insert(5);
    this.tree.insert(2);
    this.tree.insert(3);
    this.tree.insert(6);
    this.tree.insert(1);
    this.tree.insert(0);
  }

  handleChange(event) {
    if (event.target.name === "scaleName") {
      this.setState({ scaleName: event.target.value }, this.changeScale);
    }
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  changeScale() {
    const scaleName = this.state.scaleName;
    const scale = Scale.get("C " + scaleName).notes;
    const scaleWithOctaves = scale.map((note) => note + this.state.octave);
    this.setState({ scale: scaleWithOctaves });
  }

  traverseAnimation() {
    let num = 0
    const animation = setInterval(() => {
      this.setState({selectedNode: this.state.traverseList[num]})
      this.playNote(this.state.scale[this.state.selectedNode],"16n")
      num = (num + 1)
      if (num === this.state.traverseList.length + 1) {
        clearInterval(animation)
        this.setState({selectedNode: null})
      }
    }, 500);
  }

  traverseTree() {
    const vals = [];
    this.tree.traverse((value) => {
      vals.push(value);
    });
    this.setState({ traverseList: vals }, this.traverseAnimation);
  }

  playNote(note, duration) {
    this.state.soundSource.triggerAttackRelease(note, duration);
  }

  render() {
    return (
      <div>
        <h1>Binary Tree</h1>
        <div className="menu">
          <FormControl>
            <InputLabel style={{ width: "100px" }}>Select Scale</InputLabel>
            <Select
              name="scaleName"
              value={this.state.scaleName}
              onChange={this.handleChange}
            >
              {Scale.names().map((scale, index) => (
                <MenuItem value={scale} key={index}>
                  {scale}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel style={{ width: "300px" }}>
              Select Traversal Type
            </InputLabel>
            <Select
              name="traversalType"
              value={this.state.traversalType}
              onChange={this.handleChange}
            >
              <MenuItem value="inOrder">In-Order</MenuItem>
              <MenuItem value="preOrder">Pre-Order</MenuItem>
              <MenuItem value="postOrder">Post-Order</MenuItem>
            </Select>
          </FormControl>
          <Button onClick={this.traverseTree}>Traverse</Button>
        </div>
        {this.tree.left && (
          <div id="tree-container">
            <div
              className={
                "node root tier " +
                (this.state.selectedNode === this.tree.value && "selected-node")
              }
            >
              {this.state.scale[this.tree.value]}
            </div>
            <div className="tier level1">
              <div
                className={
                  "node " +
                  (this.state.selectedNode === this.tree.left.value &&
                    "selected-node")
                }
              >
                {this.state.scale[this.tree.left.value]}
              </div>
              <div
                className={
                  "node " +
                  (this.state.selectedNode === this.tree.right.value &&
                    "selected-node")
                }
              >
                {this.state.scale[this.tree.right.value]}
              </div>
            </div>
            <div className="tier level2">
              <div className="left-branch">
                {" "}
                <div
                  className={
                    "node " +
                    (this.state.selectedNode === this.tree.left.left.value &&
                      "selected-node")
                  }
                >
                  {this.state.scale[this.tree.left.left.value]}
                </div>{" "}
                <div
                  className={
                    "node " +
                    (this.state.selectedNode === this.tree.left.right.value &&
                      "selected-node")
                  }
                >
                  {this.state.scale[this.tree.left.right.value]}
                </div>{" "}
              </div>
              <div
                className={
                  "node " +
                  (this.state.selectedNode === this.tree.right.right.value &&
                    "selected-node")
                }
              >
                {this.state.scale[this.tree.right.right.value]}
              </div>
            </div>
            <div className="tier level3">
              <div
                className={
                  "node " +
                  (this.state.selectedNode === this.tree.left.left.left.value &&
                    "selected-node")
                }
              >
                {this.state.scale[this.tree.left.left.left.value]}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
