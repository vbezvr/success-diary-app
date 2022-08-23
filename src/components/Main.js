import calendar from "../img/calendar.svg"
import { HabitCard } from "./HabitCard"
import { CompletedCard } from "./CompletedCard"
import { AddTaskCard } from "./AddTaskCard"

export function Main() {
    return (
        <div className="section-2">
            <div className="header">
                <img src={calendar} width="30px"/>
                <h2 className="date">1st September</h2>
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