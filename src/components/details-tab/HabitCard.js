import { ref, remove, set } from "firebase/database";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { context } from "../..";
import { toCapitalize } from "../../helper";
import { useHabitsData } from "../../hooks/habitsData";
import { useForceUpdate } from "../../hooks/useForceUpdate";
import remove_icon from "../../img/close.svg";


function ViewItem({ name, handleDeleteField }) {
  const habitName = toCapitalize(name);
  return (
    <div className="view-item-wrapper habits-view">
      <div className="view-item">
        <div className="title title-habit">{habitName}</div>
        <div className="img-delete" onClick={() => handleDeleteField(name)}>
          <img width="25px" src={remove_icon} />
        </div>
      </div>
    </div>
  );
}

function HabitCard({title}) {
  const { db } = useContext(context);
  const { uid } = useSelector((state) => state.userConfig);
  const habitRef = ref(db, `habits/${uid}`);
  const currentHabits = useHabitsData(habitRef);
  const forceUpdate = useForceUpdate();
  const [value, setValue] = useState("");

  const habitsItems = currentHabits.map((habit, index) => (
    <ViewItem name={habit.name} key={index} handleDeleteField={handleDeleteField}/>
  ));

  function handleSubmit(event) {
    event.preventDefault();
    const newFieldRef = ref(db, `habits/${uid}/${value}`);
    set(newFieldRef, {active:["null"]});
    setValue("");
  }

  function handleDeleteField(name) {
    const fieldRemoveRef = ref(db, `habits/${uid}/${name}`);
    remove(fieldRemoveRef);
    forceUpdate();
  }

  return (
    <div className="card">
      <div className="habits">
        <div className="header-card">
          <h2>{title}</h2>
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

export { HabitCard, ViewItem };
