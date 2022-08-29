import calendar from "../img/calendar.svg"
import { HabitCard } from "./HabitCard"
import { CompletedCard } from "./CompletedCard"
import { AddTaskCard } from "./AddTaskCard"
import { format } from "date-fns"
import { useContext, useEffect } from "react"
import { context } from ".."
import { useSelector } from "react-redux"
import { off, onChildAdded, ref } from "firebase/database"

export function Main() {
    const currentDate = format(new Date(), "do MMMM");
   
    return (
        <div className="section-2">
            <div className="header">
                <img src={calendar} width="30px"/>
                <h2 className="date">{currentDate}</h2>
            </div>
                <div className="content-wrapper">
                    <div className="wrapper-left">
                        <HabitCard/>
                        <CompletedCard/>
                    </div>
                        <AddTaskCard/>
                </div>
            </div>
    )
}