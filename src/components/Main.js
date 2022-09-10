
import { HabitCard } from "./HabitCard"
import { CompletedCard } from "./CompletedCard"
import { AddTaskCard } from "./AddTaskCard"
import { format } from "date-fns"
import { useContext, useEffect } from "react"
import { context } from ".."
import { useSelector } from "react-redux"
import { off, onChildAdded, ref } from "firebase/database"

function Main() {
   
    return (
      <div className="content-wrapper">
        <div className="wrapper-left">
          <HabitCard />
          <CompletedCard />
        </div>
        <AddTaskCard />
      </div>
    );
}

export {Main}