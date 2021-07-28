import React from "react";
import Tree from "./dataStructures/tree";
import { FormControl, MenuItem, Select, InputLabel } from "@material-ui/core";
import { Scale } from "@tonaljs/tonal"

export class BinaryTree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      traverseList: [],
      traversalType: "",
      scaleName: "major",
      scale: ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"],
      octave: 4
    };

    this.tree = new Tree(4);
    this.handleChange = this.handleChange.bind(this);
    this.changeScale = this.changeScale.bind(this)
    this.tree.insert(5);
    this.tree.insert(2);
    this.tree.insert(3);
    this.tree.insert(6);
    this.tree.insert(1);
    this.tree.insert(0);
  }

  handleChange(event) {
    if (event.target.name === 'scaleName') {
      this.setState({scaleName: event.target.value}, this.changeScale)
    }
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  changeScale() {
    const scaleName = this.state.scaleName
    console.log('scaleName', scaleName)
    const scale = Scale.get('C ' + scaleName).notes
    const scaleWithOctaves = scale.map((note) => note + this.state.octave)
    this.setState({scale: scaleWithOctaves})
  }

  render() {
    return (
      <div>
        <h1>Binary Tree</h1>
        <div className="menu">
        <FormControl>
        <InputLabel style={{width: "100px"}}>Select Scale</InputLabel>
        <Select
          name="scaleName"
          value={this.state.scaleName}
          onChange={this.handleChange}
        >
         {Scale.names().map((scale, index) => <MenuItem value={scale} key={index}>{scale}</MenuItem>)}
        </Select>
        </FormControl>
        </div>
        {this.tree.left &&
        <div id="tree-container">
          <div className="node root tier">{this.state.scale[this.tree.value]}</div>
          <div className="tier level1">
            <div className="node">{this.state.scale[this.tree.left.value]}</div><div className="node">{this.state.scale[this.tree.right.value]}</div>
          </div>
          <div className="tier level2">
           <div className="left-branch"> <div className="node">{this.state.scale[this.tree.left.left.value]}</div> <div className="node">{this.state.scale[this.tree.left.right.value]}</div> </div>
            <div className="node">{this.state.scale[this.tree.right.right.value]}</div>
          </div>
          <div className="tier level3">
            <div className="node">{this.state.scale[this.tree.left.left.left.value]}</div>
          </div>
        </div>}
      </div>
    );
  }
}
