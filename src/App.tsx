import { useState } from "react";

import "./App.css";

const initialState = "0";

export default function App() {
  const [display, setDisplay] = useState<string>(initialState);
  const allChars = display.split(" ");
  const lastChar = display.at(-1) || "";

  const setDecimal = () => {
    if (display === initialState) {
      setDisplay(display + ".");
    } else if (lastChar === "." || display.split(" ").at(-1)?.includes(".")) {
      return;
    } else if (lastChar === " ") {
      setDisplay(display + "0.");
    } else {
      setDisplay(display + ".");
    }
  };

  const setOperator = (value: string) => {
    if (display === initialState) {
      return;
    }

    if (!allChars.at(-2) || Number(allChars.at(-1))) {
      setDisplay(display + " " + value + " ");
      return;
    }

    if (!Number(allChars.at(-2))) {
      allChars[allChars.length - 2] = value;
      setDisplay(allChars.join(" "));
    }

    if (!Number(allChars.at(-1))) {
      allChars[allChars.length - 1] = value;
      setDisplay(allChars.join(" "));
    }
  };

  const setMinus = () => {
    if (display === initialState) {
      setDisplay("-");
      return;
    }

    if (lastChar === "-") {
      return;
    }

    if (lastChar === " ") {
      setDisplay(display + "-");
      return;
    }

    if (Number(allChars.at(-1))) {
      setDisplay(display + " - ");
      return;
    }
  };

  const updateDisplay = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const value = e.currentTarget.innerText;

    if (value === ".") {
      setDecimal();
      return;
    } else if (value === "-") {
      setMinus();
      return;
    } else if (isNaN(+value)) {
      setOperator(value);
      return;
    } else if (display === initialState) {
      setDisplay(value);
      return;
    } else if (!isNaN(+value)) {
      setDisplay(display + value);
      return;
    } else {
      setDisplay(display + " " + value + " ");
    }
  };

  const calc = () => {
    if (lastChar === " ") {
      setDisplay(eval(display.slice(0, -3)).toString());
    } else {
      setDisplay(eval(display).toString());
    }
  };

  return (
    <main>
      <section id="display">{display}</section>
      <button onClick={updateDisplay} id="zero">
        0
      </button>
      <button onClick={updateDisplay} id="one">
        1
      </button>
      <button onClick={updateDisplay} id="two">
        2
      </button>
      <button onClick={updateDisplay} id="three">
        3
      </button>
      <button onClick={updateDisplay} id="four">
        4
      </button>
      <button onClick={updateDisplay} id="five">
        5
      </button>
      <button onClick={updateDisplay} id="six">
        6
      </button>
      <button onClick={updateDisplay} id="seven">
        7
      </button>
      <button onClick={updateDisplay} id="eight">
        8
      </button>
      <button onClick={updateDisplay} id="nine">
        9
      </button>
      <button onClick={updateDisplay} id="multiply">
        *
      </button>
      <button onClick={updateDisplay} id="divide">
        /
      </button>
      <button onClick={updateDisplay} id="add">
        +
      </button>
      <button onClick={updateDisplay} id="subtract">
        -
      </button>
      <button onClick={updateDisplay} id="decimal">
        .
      </button>
      <button id="equals" onClick={calc}>
        =
      </button>
      <button id="clear" onClick={() => setDisplay(initialState)}>
        C
      </button>
    </main>
  );
}
