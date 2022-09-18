import {HabitCard} from "./SettingCard"
import {AddTaskCard} from "../AddTaskCard"

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