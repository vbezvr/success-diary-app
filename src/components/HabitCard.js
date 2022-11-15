import { eachDayOfInterval, format, subDays } from "date-fns";
import { get, onValue, ref, set } from "firebase/database";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { context } from "..";
import { toCapitalize } from "../helper";
import { useHabitsData } from "../hooks/habitsData";

function DayItem({ data, isCurrent, habitName }) {
  const [isActive, setActive] = useState(false);
  const { db } = useContext(context);
  const { uid } = useSelector((state) => state.userConfig);
  const habitsRef = ref(db, `habits/${uid}/${habitName}`);

  const formatData = format(data, "y-MM-dd");
  const day = format(data, "d");
  const weekDay = format(data, "EEE");

  useEffect(() => {
    getActiveDates().then((activeDates) => {
      if (activeDates) {
        const isCurrentDataActive = activeDates.includes(formatData);
        if (isCurrentDataActive !== isActive) {
          setActive(isCurrentDataActive);
        }
      }
    });
  });

  function getActiveDates() {
    return get(habitsRef).then((snap) => {
      if (snap.exists()) {
        return snap.val().active;
      }
    });
  }

  function handleClick() {
    if (isCurrent) {
      getActiveDates().then((activeDates) => {
        if (isActive) {
          const index = activeDates.indexOf(formatData);
          activeDates.splice(index, 1);
          set(habitsRef, { active: activeDates });
          setActive(false);
        } else {
          activeDates.push(formatData);
          set(habitsRef, { active: activeDates });
          setActive(true);
        }
      });
    }
  }

  return (
    <div className={isCurrent ? "item current" : "item"} onClick={handleClick}>
      <p className="days">{weekDay}</p>
      <p className="number">{day}</p>
      <hr className={isActive ? "active" : ""}></hr>
    </div>
  );
}

function HabitItem({ data, days }) {
  const habitName = toCapitalize(data.name);
  const daysItem = days.map((day, index) => (
    <DayItem
      key={index}
      data={day}
      isCurrent={index === 6}
      habitName={data.name}
    />
  ));
  return (
    <div className="habit-item">
      <span>{habitName}</span>
      <div className="items-wrapper">{daysItem}</div>
    </div>
  );
}

function HabitCard() {
  const { db } = useContext(context);
  const { uid } = useSelector((state) => state.userConfig);
  const habitRef = ref(db, `habits/${uid}`);
  const habits = useHabitsData(habitRef);
  
  const currentDay = format(new Date(), "yyyy-MM-dd");
  const dayWeekBefore = subDays(new Date(currentDay), 6);
  const daysOfWeek = eachDayOfInterval({
    start: dayWeekBefore,
    end: new Date(currentDay),
  });

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
        </div>
        <div className="habits-form">{createHabitsItems()}</div>
      </div>
    </div>
  );
}

export { HabitCard };
