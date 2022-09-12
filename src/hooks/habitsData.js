import { onValue, ref } from "firebase/database";
import { useContext, useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { context } from "..";

function useHabitsData(habitRef) {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    onValue(
      habitRef,
      (snap) => {
        if (snap.exists()) {
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
        }
      },
      { onlyOnce: true }
    );
  });

  return habits;
}

export {useHabitsData}