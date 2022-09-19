import {HabitCard} from "./HabitCard"
import {AddTaskCard} from "../AddTaskCard"
import {CategoryCard} from "./CategoryCard"

function DetailsPage() {
    return (
      <div className="content-wrapper">
        <AddTaskCard />
        <div className="wrapper-left">
          <HabitCard title="Your habits"/>
          <CategoryCard title="Your categories"/>
        </div>
      </div>
    );
}

export {DetailsPage}