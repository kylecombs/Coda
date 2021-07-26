import React from "react";
import { Button } from "@material-ui/core"
import * as Tone from 'tone'
import { Synth } from "tone";

export class Loops extends React.Component {
    constructor () {
        super()
        this.state = {
            soundSource: new Tone.Synth().toDestination(),
            notes: ["C4", "E4", "F4", "G4"],
            sequence: [],
            duration: "16n",
            transportSpeed: 250,
            transport: null,
            playing: false
        }
        this.playNote = this.playNote.bind(this)
        this.generatePattern = this.generatePattern.bind(this)
        this.playPattern = this.playPattern.bind(this)
    }

    playNote (note, duration) {
        this.state.soundSource.triggerAttackRelease(note, duration)
    }

    generatePattern () {
        let pattern = []
        for (let i = 0; i < this.state.notes.length; i++) { 
            pattern.push(i)
        }
        this.setState({sequence: pattern})
    }

    async playPattern () {
        if (this.state.playing) {
            this.setState({ playing: false })
            clearInterval(this.state.transport)
        }
        else if (!this.state.playing) {
            this.setState({ playing: true })
            console.log(this.state.playing)
            let duration = this.state.duration
            let seqPosition = 0
            let noteArrayLength = this.state.notes.length
            let currentNote = this.state.notes[this.state.sequence[seqPosition]]
            
            this.setState( { transport: setInterval(()=> {
                this.playNote(currentNote, duration)
                seqPosition = (seqPosition + 1) % noteArrayLength
                currentNote = this.state.notes[this.state.sequence[seqPosition]]
            }, this.state.transportSpeed) } )
    
        }
        
    }
    


    render () {
        return (
            <div>
                <h1>LOOPS</h1>
                <p>notes: [ {this.state.notes.join('  ')} ]</p>
                <p>pattern: [ {this.state.sequence} ]</p>
                <p>{"for (let i = 0; i < notesArray.length; i++) { \n pattern.push(i) \n}"}</p>
                <Button onClick={this.generatePattern}>generate pattern</Button>
                <Button onClick={this.playPattern}>{ this.state.playing ? "stop pattern" : "play pattern" }</Button>
            </div> 
        )
    }
}


