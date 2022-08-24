import { useEffect, useState } from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import Results from "./Results";

function App() {
  const [dies, set_dies] = useState (() => init_dies());
  const [tenzies, set_tenzies] = useState(false);
  const [clicks, set_clicks] = useState(0);
  const [rolls, set_rolls] = useState(0);
  const [time, set_time] = useState(() => ({start: Date.now(), end: null}));

  const [bestTime, set_best_time] = useState(() => {
    const time = localStorage.getItem("best_time");

    if (time)
      return Number(JSON.parse(time));
  });

  useEffect(() => {
    if (dies.every(die => die.frozen) && dies.every(die => dies[0].value === die.value)) {
      const today = Date.now();
      const totalTime = today - time.start;

      set_tenzies(true);
      set_time(prevTime => ({...prevTime, end: today}));

      if (!bestTime || totalTime < bestTime) {
        localStorage.setItem("best_time", totalTime);
        set_best_time(totalTime);
      }
    }
  }, [dies]);

  function init_dies() {
    const dies = [];
  
    for (let i = 0; i < 10; i++)
      dies.push({id: nanoid(), frozen: false, value: ~~(Math.random() * 6) + 1});

    return dies;
  }  

  function roll() {
    set_rolls(prevRolls => prevRolls + 1);
    set_dies(prevDies => {
      const newDies = [];

      for (let die of prevDies) {
        if (!die.frozen)  
          die.value = ~~(Math.random() * 6) + 1;
        newDies.push(die);
      }
      return newDies;
    });
  }

  function increase_click_count() {
    set_clicks(prevCount => prevCount + 1);
  }

  function freeze(id) {
    const index = dies.findIndex(die => die.id === id);
    const die = dies[index];

    set_dies(prevDies => prevDies.slice(0, index)
      .concat({ ...die, frozen: !die.frozen })
      .concat(dies.slice(index + 1)));
  }

  function reset() {
    set_tenzies(false);
    set_dies(init_dies());
    set_rolls(0);
    set_time({start: Date.now(), end: null});
  }

  return (
    <div className="App">
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
      </p>
      <div className="dies-container">
        {dies.map(die => <Die key={die.id} die={die} freeze={freeze} tenzies={tenzies} increase_count={increase_click_count}/>)}
      </div>
      {tenzies && <Results rolls={rolls} clicks={clicks} time={time} bestTime={bestTime}/>}
      <button onClick={tenzies ? reset : roll} className="roll">{tenzies ? "New Game!" : "Roll"}</button>
    </div>
  );
}

export default App
