import React, { Component } from "react";
import "./InputNumber.css";
class InputNumber extends Component {
  state = {
    number: 0,
    result: "",
    message: "",
    romen: "",
    numberOfRomen: 0
  };

  handleOnchange = e => {
    const number = e.target.value;
    this.setState({ number });
  };

  numberToRomen = async number => {
    if (number >= 4000 || number <= 0) {
      await this.setState({
        message: "Please enter the number between 1 to 3999"
      });
    } else {
      await this.setState({ message: "Succesfull submit" });
      let numberDigits = { thousands: 0, hundreds: 0, tens: 0, ones: 0 };
      numberDigits.thousands = Math.floor(number / 1000) % 10;
      numberDigits.hundreds = Math.floor(number / 100) % 10;
      numberDigits.tens = Math.floor(number / 10) % 10;
      numberDigits.ones = number % 10;
      let romenDigits = { thousands: "", hundreds: "", tens: "", ones: "" };
      if (numberDigits.thousands !== 0) {
        if (numberDigits.thousands < 4) {
          for (let i = 0; i < numberDigits.thousands; i++) {
            romenDigits.thousands += "M";
          }
        }
      }

      if (numberDigits.hundreds !== 0) {
        if (numberDigits.hundreds < 4) {
          for (let i = 0; i < numberDigits.hundreds; i++) {
            romenDigits.hundreds += "C";
          }
        } else if (numberDigits.hundreds === 4) {
          romenDigits.hundreds += "CD";
        } else if (numberDigits.hundreds === 5) {
          romenDigits.hundreds += "D";
        } else if (numberDigits.hundreds === 9) {
          romenDigits.hundreds += "CM";
        } else if (numberDigits.hundreds > 5 && numberDigits.hundreds < 9) {
          romenDigits.hundreds += "D";
          for (let i = 5; i < numberDigits.hundreds; i++) {
            romenDigits.hundreds += "C";
          }
        }
      }
      if (numberDigits.tens !== 0) {
        if (numberDigits.tens < 4) {
          for (let i = 0; i < numberDigits.tens; i++) {
            romenDigits.tens += "X";
          }
        } else if (numberDigits.tens === 4) {
          romenDigits.tens += "XL";
        } else if (numberDigits.tens === 5) {
          romenDigits.tens += "L";
        } else if (numberDigits.tens === 9) {
          romenDigits.tens += "XC";
        } else if (numberDigits.tens > 5 && numberDigits.tens < 9) {
          romenDigits.tens += "L";
          for (let i = 5; i < numberDigits.tens; i++) {
            romenDigits.tens += "X";
          }
        }
      }

      if (numberDigits.ones !== 0) {
        if (numberDigits.ones < 4) {
          for (let i = 0; i < numberDigits.ones; i++) {
            romenDigits.ones += "I";
          }
        } else if (numberDigits.ones === 4) {
          romenDigits.ones += "IV";
        } else if (numberDigits.ones === 5) {
          romenDigits.ones += "V";
        } else if (numberDigits.ones === 9) {
          romenDigits.ones += "IX";
        } else if (numberDigits.ones > 5 && numberDigits.ones < 9) {
          romenDigits.ones += "V";
          for (let i = 5; i < numberDigits.ones; i++) {
            romenDigits.ones += "I";
          }
        }
      }
      const result =
        romenDigits.thousands +
        romenDigits.hundreds +
        romenDigits.tens +
        romenDigits.ones;
      this.setState({ result });
    }
  };

  onSubmit = async e => {
    e.preventDefault();
    const number = this.state.number;
    this.numberToRomen(number);
    this.setState({ number: 0 });
  };

  handleOnchange2 = e => {
    const romen = e.target.value;
    this.setState({ romen });
  };

  romenToNumber = romen => {
    let romensNumbers = [
      [
        [
          { romen: "IV", number: 4 },
          { romen: "V", number: 5 },
          { romen: "IX", number: 9 }
        ],
        { romen: "I", number: 1 }
      ],
      [
        [
          { romen: "XL", number: 40 },
          { romen: "L", number: 50 },
          { romen: "XC", number: 90 }
        ],
        { romen: "X", number: 10 }
      ],
      [
        [
          { romen: "CD", number: 400 },
          { romen: "D", number: 500 },
          { romen: "CM", number: 900 }
        ],
        { romen: "C", number: 100 }
      ],
      [[{}], { romen: "M", number: 1000 }]
    ];
    const even = romenNumber => {
      return romen.includes(romenNumber.romen);
    };
    let numberOfRomen = 0;
    for (let index=0;index<4;index++) {
      if (romensNumbers[index][0].some(even)) {
        if (romen.includes(romensNumbers[index][0][0].romen)) {
          numberOfRomen += romensNumbers[index][0][0].number;
          romen = romen.replace(romensNumbers[index][0][0].romen, "");
        } else if (romen.includes(romensNumbers[index][0][1].romen)) {
          numberOfRomen += romensNumbers[index][0][1].number;
          romen = romen.replace(romensNumbers[index][0][1].romen, "");
          if (romen.includes(romensNumbers[index][1].romen)) {
            let i = 0;
            while (romen.includes(romensNumbers[index][1].romen) && i <3) {
              numberOfRomen += romensNumbers[index][1].number;
              romen = romen.replace(romensNumbers[index][1].romen, "");
              i++;
            }}
        } else if (romen.includes(romensNumbers[index][0][2].romen)) {
          numberOfRomen += romensNumbers[index][0][2].number;
          romen = romen.replace(romensNumbers[index][0][2].romen, "");
        } 
      }else if (romen.includes(romensNumbers[index][1].romen)) {
        let i = 0;
        while (romen.includes(romensNumbers[index][1].romen) && i <3) {
          numberOfRomen += romensNumbers[index][1].number;
          romen = romen.replace(romensNumbers[index][1].romen, "");
          i++;
        }
      }
    }
    this.setState({ numberOfRomen });
  };

  onSubmit2 = async e => {
    e.preventDefault();
    const romen = this.state.romen;
    this.romenToNumber(romen);
    this.setState({ romen: "" });
  };

  render() {
    return (
      <div className="Input">
        <form>
          <div className="form-group">
            <label className="control-label" htmlFor="name">
              Enter your number in box.
            </label>
          </div>

          <input
            className="InputNumber"
            type="number"
            name="number"
            id="number"
            onChange={e => this.handleOnchange(e)}
            value={this.state.number}
          />
          <button
            type="submit"
            className="button"
            onClick={e => this.onSubmit(e)}
          >
            Submit
          </button>
        </form>
        <h3>{this.state.message}</h3>
        <h1>{this.state.result}</h1>
        <form>
          <div className="form-group">
            <label className="control-label" htmlFor="name">
              Enter your Romen number in box.
            </label>
          </div>

          <input
            className="InputRomenNumber"
            type="text"
            name="text"
            id="text"
            onChange={e => this.handleOnchange2(e)}
            value={this.state.romen}
          />
          <button
            type="submit"
            className="button2"
            onClick={e => this.onSubmit2(e)}
          >
            Submit
          </button>
        </form>
        <h1>{this.state.numberOfRomen}</h1>
      </div>
    );
  }
}
export default InputNumber;
