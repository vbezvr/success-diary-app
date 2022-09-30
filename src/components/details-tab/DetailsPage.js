import {HabitCard} from "./HabitCard"
import {AddTaskCard} from "../AddTaskCard"
import {CategoryCard} from "./CategoryCard"
import { ViewTaskCard } from "./ViewTaskCard";

function DetailsPage() {
    return (
      <div className="content-wrapper">
        <ViewTaskCard />
        <div className="wrapper-left">
          <HabitCard title="Your habits"/>
          <CategoryCard title="Your categories"/>
        </div>
      </div>
    );
}

export {DetailsPage}