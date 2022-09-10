import {HabitSetting} from "./HabitSetting"
import {AddTaskCard} from "../AddTaskCard"

function DetailsPage() {
    return (
      <div className="content-wrapper">
        <AddTaskCard />
        <div className="wrapper-left">
          <HabitSetting />
          {/* <CategorySetting /> */}
        </div>
      </div>
    );
}

export {DetailsPage}