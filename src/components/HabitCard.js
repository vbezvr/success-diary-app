import { format } from "date-fns";
import { onValue, ref, set } from "firebase/database";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { context } from "..";
import plus from "../img/plus.svg"

function HabitCard() {
  const {db} = useContext(context);
  const {uid} = useSelector((state) => state.userConfig);
  const [habits, setHabits] = useState([])
  const habitsRef = ref(db, `habits/${uid}`);
  // const currentData = format(new Date(), )

  useEffect(() => {
    onValue(habitsRef, (snap) => {
      const snapSize = Object.values(snap.val()).length;
      if (habits.length !== snapSize) {
        setHabits([])
        snap.forEach((habitData) => {
            setHabits((prevState) => [...prevState, habitData.key])
        })
      }
    }, 
    {onlyOnce: true})
  })
  console.log(habits)
  
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
      </div>
    </div>
  );
}

export {HabitCard}
