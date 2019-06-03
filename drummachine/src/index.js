import React from 'react';
import ReactDOM from 'react-dom';
import "./index.css"
//const projectName = 'React drummachine';
//localStorage.setItem('example_project', 'React drummachine');

class Drum extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: ["DRUMMING", "KEYBOARDING"],
            soundPlayed: ""
        }
    }
    listSounds = [{
        keyCode: 81, keyTrigger: 'Q', id: ['Heater-1', 'Chord-1'],
        url: ['https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3', 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3']
    }, {
        keyCode: 87, keyTrigger: 'W', id: ['Heater-2', 'Chord-2'],
        url: ['https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3', 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3']
    }, {
        keyCode: 69, keyTrigger: 'E', id: ['Heater-3', 'Chord-3'],
        url: ['https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3', 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3']
    }, {
        keyCode: 65, keyTrigger: 'A', id: ['Heater-4', 'Shaker'],
        url: ['https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3', 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3']
    }, {
        keyCode: 83, keyTrigger: 'S', id: ['Clap', 'Open-HH'],
        url: ['https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3', 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3']
    }, {
        keyCode: 68, keyTrigger: 'D', id: ['Open-HH', 'Closed-HH'],
        url: ['https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3', 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3']
    }, {
        keyCode: 90, keyTrigger: 'Z', id: ["Kick-n'-Hat", 'Punchy-Kick'],
        url: ['https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3', 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3']
    }, {
        keyCode: 88, keyTrigger: 'X', id: ["Kick", 'Side-Stick'],   
        url: ['https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3', 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3']
    }, {
        keyCode: 67, keyTrigger: 'C', id: ['Closed-HH', 'Snare'],
        url: ['https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3', 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3']
    }];

    soundFunc = (e) => { 
        console.log(e.target.value)
        let soundItem = document.getElementById(e.target.value).children[0]
        console.log(document.getElementById(e.target.value).children[0])
        this.setState({ soundPlayed: this.listSounds["QWEASDZXC".indexOf(e.target.value)].id[0]})
        soundItem.play()
    }

    componentDidMount() {
        //console.log("action2", this.listSounds)
        let m = this.listSounds
        let input = document.getElementById("root")
        input.addEventListener("keydown", function (event) {
            //console.log("actio3", m)
            for (let j = 0; j < m.length; j++) {
                //console.log(m[j], event.keyCode)
                if (event.keyCode === m[j]["keyCode"]) {
                    //console.log("actio4")
                    event.preventDefault();
                    document.getElementById(m[j]["keyTrigger"]).click();
                }
            }
        });
    }

    render() {
        return (<div id="drum-machine">
            <div id="console">
                {"QWEASDZXC".split("").map((item, i) => (
                <button className="drum-pad" id={item} value={item} onClick={(e) => this.soundFunc(e)}>{item}
                    <audio className="clip" src={this.listSounds[i].url[0]} id={item}></audio></button>))}
            </div>

            <div id="display">
                <div>Power<button id="power"></button></div>
                <div id="sound">{this.state.soundPlayed}</div>
            </div>
        </div>)
    }
}

ReactDOM.render(<Drum />, document.getElementById('root'));   