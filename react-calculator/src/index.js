import React from 'react';
import ReactDOM from 'react-dom';
import "./index.css"
//const projectName = 'React calculator';
//localStorage.setItem('example_project', 'React calculator');

const digits = [{ type: "digit", value: "1", id: "one" },
{ type: "digit", value: "2", id: "two" },
{ type: "digit", value: "3", id: "three" },
{ type: "digit", value: "4", id: "four" },
{ type: "digit", value: "5", id: "five" },
{ type: "digit", value: "6", id: "six" },
{ type: "digit", value: "7", id: "seven" },
{ type: "digit", value: "8", id: "eight" },
{ type: "digit", value: "9", id: "nine" },
{ type: "digit", value: "0", id: "zero" },
{ type: "operator", value: "=", id: "equals" },
{ type: "operator", value: "+", id: "add" },
{ type: "operator", value: "*", id: "multiply" },
{ type: "operator", value: "/", id: "divide" },
{ type: "operator", value: "-", id: "subtract" },
{ type: "operator", value: ".", id: "decimal" },
{ type: "operator", value: "AC", id: "clear" }]

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayClick: "",
            displayResult: "0"
        }
    }
    update = (e) => {
        switch (true) {
            case /AC/.test(e.target.value):
                this.setState({ displayClick: "", displayResult: "0" })
                break;
                
            case /\d/.test(e.target.value):
                if (this.state.displayClick.indexOf("=") > -1) {
                    this.setState({ displayClick: e.target.value, displayResult: e.target.value })
                } else {
                    let newV = (this.state.displayClick + e.target.value).replace(/^0(?!\.)|(?<=[-/*+]0)0+/, "");
                    let newRes = (this.state.displayResult + e.target.value).replace(/[-/*+]/g, "").replace(/^0(?!\.)|(?<=[-/*+]0)0+/, "");
                    this.setState({ displayClick: newV, displayResult: newRes })
                }
                break;

            case this.state.displayClick !== "" && /[-/*+]/.test(e.target.value):
                let d = this.state.displayClick
                if (e.target.value === d[d.length - 1]) {
                    break;
                } else {
                    if (/[-/*+]$/.test(d)) {
                        let updatedValue2 = d.replace(/.$/, e.target.value)
                        this.setState({ displayClick: updatedValue2, displayResult: e.target.value })
                    } else if (this.state.displayClick.indexOf("=") > -1) {
                        this.setState({ displayClick: this.state.displayResult + e.target.value, displayResult: e.target.value })
                    }
                    else {
                        let updatedValue4 = d + e.target.value
                        this.setState({ displayClick: updatedValue4, displayResult: e.target.value })
                    }
                }
                break;

            case /=/.test(e.target.value):
                if (this.state.displayClick.indexOf("=") > -1) { break } else {
                    let res = eval(this.state.displayClick.replace(/[-/*+]$/, ""))
                    let updatedValue3 = this.state.displayClick.replace(/[-/*+]$/, "") + e.target.value + res
                    this.setState({ displayClick: updatedValue3, displayResult: res })
                    break;
                }

            case /\./.test(e.target.value):
                let m = this.state.displayClick;
                if (e.target.value === this.state.displayClick[this.state.displayClick.length - 1] || /[0-9]+\.[0-9]+$/.test(m)) { break; } else {
                    if (/[-+/*]$/.test(this.state.displayClick) && this.state.displayClick.indexOf("=") === -1) {
                        let updatedValue = this.state.displayClick + "0" + e.target.value;
                        let updatedRes = (this.state.displayResult + "0" + e.target.value).replace(/[-/*+]/g, "");
                        this.setState({ displayClick: updatedValue, displayResult: updatedRes })
                    } else if (this.state.displayClick.indexOf("=") === -1){
                        let updatedValue = this.state.displayClick + e.target.value;
                        let updatedRes = (this.state.displayResult + e.target.value).replace(/[-/*+]/g, "");
                        this.setState({ displayClick: updatedValue, displayResult: updatedRes })
                    }
                }
                break;
            default:
                return "";
        }
    }

    render() {
        return (<div id="calculator">
            <Display value={this.state.displayClick} />
            <DisplayResult value={this.state.displayResult} />
            {digits.map((item, i) => <Button update={this.update} key={i} info={item} />)}
        </div>)
    }
}

const Display = (props) => { return (<div id="display2"> {props.value} </div>) }
const DisplayResult = (props) => { return (<div id="display"> {props.value} </div>) }
const Button = (props) => { return (<button id={props.info.id} value={props.info.value} onClick={props.update}> {props.info.value}</button>) }

ReactDOM.render(<Calculator />, document.getElementById('root'));   