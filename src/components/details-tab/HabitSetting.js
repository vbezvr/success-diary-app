import { get, onValue, ref, set } from "firebase/database";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { context } from "../..";
import { toCapitalize } from "../../helper";
import { useHabitsData } from "../../hooks/habitsData";


function HabitItem({ name }) {
  const habitName = toCapitalize(name);
  return (
    <div className="view-item-wrapper habits-view">
      <div className="view-item">
        <div className="title title-habit">{habitName}</div>
        <div className="img-delete">
          <img width="25px" src="./img/close.svg" />
        </div>
      </div>
    </div>
  );
}

function HabitSetting() {
  const { db } = useContext(context);
  const { uid } = useSelector((state) => state.userConfig);
  const habitRef = ref(db, `habits/${uid}`);
  const currentHabits = useHabitsData(habitRef);
  const [value, setValue] = useState("");

  const habitsItems = currentHabits.map((habit, index) => (
    <HabitItem name={habit.name} key={index} />
  ));

  function handleSubmit(event) {
    event.preventDefault();
    const newFieldRef = ref(db, `habits/${uid}/${value}`);
    set(newFieldRef, {active:["null"]});
    setValue("");
  }

  return (
    <div className="card">
      <div className="habits">
        <div className="header-card">
          <h2>Your habits</h2>
        </div>
        <div className="habits-form">
          <div className="habits-items-wrapper">{habitsItems}</div>
        </div>
        <form onSubmit={(event) => handleSubmit(event)}>
          <input
            onChange={(e) => setValue(e.target.value)}
            value={value}
            className="text t-details"
            type="text"
            placeholder="add new habit"
          />
          <input className="submit details" type="submit" value="Add" />
        </form>
      </div>
    </div>
  );
}

export { HabitSetting };
