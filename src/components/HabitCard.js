import { eachDayOfInterval, format, subDays } from "date-fns";
import { get, onValue, ref, set } from "firebase/database";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { context } from "..";
import { toCapitalize } from "../helper";
import plus from "../img/plus.svg";

function DayItem({data, isCurrent, habitName}) {
  const { db } = useContext(context);
  const { uid } = useSelector((state) => state.userConfig);
  const habitsRef = ref(db, `habits/${uid}/${habitName}`);

  const formatData = format(data, "y-MM-dd");
  const day = format(data, "d");
  const weekDay = format(data, "EEE");
  let isActive = false;
  
  function handleClick() {
    if (isCurrent) {
      get(habitsRef).then((snap) => {
        if (snap.exists()) {
          const datesList = snap.val().active;
          console.log(datesList);
          // if (datesList.in)
        }
      })
      set(habitsRef, {active: [formatData]})
    }
  }

  function getClassName() {
    return isCurrent ? "item current" : "item";
  }

  return (
    <div className={getClassName()} onClick={handleClick}>
      <p className="days">{weekDay}</p>
      <p className="number">{day}</p>
      <hr></hr>
    </div>
  );
}

function HabitItem({data, days}) {
  const habitName = toCapitalize(data.name)
  const daysItem = days.map((day, index) => <DayItem key={index} data={day} isCurrent={index === 6} habitName={data.name}/>)
  return (<div className="habit-item">
    <span>{habitName}</span>
    <div className="items-wrapper">
      {daysItem}
    </div>
  </div>)
}

function HabitCard() {
  const { db } = useContext(context);
  const { uid } = useSelector((state) => state.userConfig);
  const [habits, setHabits] = useState([]);
  const habitsRef = ref(db, `habits/${uid}`);
  const currentDay = format(new Date(), "yyyy-MM-dd");
  const dayWeekBefore = subDays(new Date(currentDay), 6);
  const daysOfWeek = eachDayOfInterval({
    start: dayWeekBefore,
    end: new Date(currentDay),
  });

  useEffect(() => {
    onValue(
      habitsRef,
      (snap) => {
        const snapSize = Object.values(snap.val()).length;
        if (habits.length !== snapSize) {
          setHabits([]);
          snap.forEach((habitData) => {
            setHabits((prevState) => [
              ...prevState,
              { name: habitData.key, dates: habitData.val() },
            ]);
          });
        }
      },
      { onlyOnce: true }
    );
  }
  );

  function createHabitsItems() {
    return habits.map((elem, index) => (
      <HabitItem data={elem} key={index} days={daysOfWeek} />
    ));
  }

  return (
    <div className="card">
      <div className="habits">
        <div className="header-card">
          <h2>Habits tracker</h2>
          <div className="add-habit">
            <div className="add-btn">
              <img src={plus} width="23px" />
              <div className="add-title">Add habit</div>
            </div>
          </div>
        </div>
        <div className="habits-form">
          {createHabitsItems()}
        </div>
      </div>
    </div>
  );
}

export { HabitCard };
