import React from 'react';
import ReactDOM from 'react-dom';
import "./index.css"
//const projectName = 'React Pomodoro';
//localStorage.setItem('example_project', 'React Pomodoro');

class Pomodoro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            break_l: 5,
            session_l: 25,
            counting: "stopped",
            timer: "",
            status: 1500,
            mode: "Session"
        }
    }

    increment = (n, v, q) => {
        console.log(n, v, n + v)
        if (n + v <= 60 && n + v > 0 && this.state.counting !== "running") {
            q === "br" ? this.setState({ break_l: n + v }) :
                this.setState({ session_l: n + v, counting: "stopped", status: (n + v) * 60 })
        }
    }

    reset = () => {
        clearInterval(this.state.timer)
        let audios2 = document.getElementById("beep");
        audios2.pause();
        audios2.currentTime = 0;
        this.setState({ break_l: 5, session_l: 25, status: 1500, timer: "", counting: "stopped", mode: "Session" })
    }

    pause = () => {
        if (this.state.counting === "running") {
            this.setState({ counting: "paused" })
            clearInterval(this.state.timer)
        } else if (this.state.counting === "paused") { this.play() }
    }

    play = () => {
        console.log(this.state.counting)
        switch (this.state.counting) {
            case "stopped":
                let m = setInterval(() => this.decrementingTime(), 1000)
                this.setState({ timer: m, counting: "running" })
                break;
            case "running":
                return this.pause()
            case "paused":
                let z = setInterval(() => this.decrementingTime(), 1000)
                this.setState({ timer: z, counting: "running" })
                break;
            default:
                break;
        }
    }

    decrementingTime = () => {
        let seconds = this.state.status;
        if (seconds > 0) {
            seconds = seconds - 1
            this.setState({ status: seconds })
        } else {
            let audios = document.getElementById("beep");
            audios.play();
            if (this.state.mode === "Session") {
                seconds = this.state.break_l * 60
                this.setState({ mode: "Break", status: seconds })
            } else {
                seconds = this.state.session_l * 60
                this.setState({ mode: "Session", status: seconds })
            }
        }
    }
    secondsToTimeString = function (seconds) {
        console.log(seconds)
        var s = Math.floor(seconds % 60);
        var m = Math.floor(seconds / 60);
        var strFormat = "MM:SS";
        if (s < 10) s = "0" + s;
        if (m < 10) m = "0" + m;
        strFormat = strFormat.replace(/MM/, m);
        strFormat = strFormat.replace(/SS/, s);
        return strFormat;
    }

    render() {
        console.log(this.state)
        return (<div id="timer">
            <div id="top">Pomodoro Clock</div>
            <div id="controls">
                <div id="break-label">Break Length
                <div>
                        <button id="break-increment" onClick={() => this.increment(this.state.break_l, 1, "br")}><i class="fas fa-angle-up"></i></button>
                        <div id="break-length">{this.state.break_l}</div>
                        <button id="break-decrement" onClick={() => this.increment(this.state.break_l, -1, "br")}><i class="fas fa-angle-down"></i></button>
                    </div>
                </div>

                <div id="session-label">Session Length
                <div>
                        <button id="session-increment" onClick={() => this.increment(this.state.session_l, 1, "sr")}><i class="fas fa-angle-up"></i></button>
                        <div id="session-length">{this.state.session_l}</div>
                        <button id="session-decrement" onClick={() => this.increment(this.state.session_l, -1, "sr")}><i class="fas fa-angle-down"></i></button>
                    </div>
                </div>
            </div>
            <div id="timer-label">{this.state.mode}</div>
            <div id="time-left"> {this.secondsToTimeString(this.state.status)} </div>
            <div id="controls2">
                <button id="start_stop" onClick={() => this.play()}><i class="fas fa-play"></i></button>
                <button id="pause" onClick={() => this.pause()}><i class="fas fa-pause"></i></button>
                <button id="reset" onClick={() => this.reset()}><i class="fas fa-undo-alt"></i></button>
            </div>
            <audio id="beep" preload="auto"
                src="https://goo.gl/65cBl1">
            </audio>
        </div>)
    }
}

ReactDOM.render(<Pomodoro />, document.getElementById('root'));   