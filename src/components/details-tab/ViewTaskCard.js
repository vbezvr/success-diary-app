import { format } from "date-fns";
import { onValue, ref } from "firebase/database";
import { useContext, useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import { context } from "../..";

function ViewTaskCard() {
  const [date, setDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const formatData = format(date, "yy-MM-dd");
  const { db } = useContext(context);
  const { uid } = useSelector((state) => state.userConfig);

  useEffect(() => {
    const dateRef = ref(db, `users/${uid}/${formatData}`);
    onValue(
      dateRef,
      (snap) => {
        if (snap.exists()) {
          setTasks([]);
          snap.forEach((snapChild) => {
            setTasks((prevState) => [...prevState, snapChild.val()]);
          });
        }
      },

      { onlyOnce: true }
    );
  }, [date]);

  console.log(tasks);
  const viewItems = tasks.map((elem, index) => (
    <TaskItem key={index} data={elem} index={index} />
  ));

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="card add-task">
      <div className="task-card">
        <h2>Done task history</h2>
        <div className="task-form">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="flex-wrapper">
              <ReactDatePicker
                selected={date}
                onChange={(date) => setDate(date)}
              />
              <input type="submit" className="submit details" value="Show" />
            </div>
          </form>
          <div className="habits-items-wrapper">{viewItems}</div>
          <div className="view-task-card">
            <div className="view-wrapper">
              <div className="title">
                <h3>Title:</h3>
              </div>
              <div className="content"></div>
            </div>
            <div className="view-wrapper">
              <div className="title">
                <h3>Category:</h3>
              </div>
              <div className="content"></div>
            </div>
            <div className="view-wrapper">
              <div className="title">
                <h3>Description:</h3>
              </div>
              <div className="content"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TaskItem({data, index}) {
  
  return (
    <div className="view-item-wrapper habits-view">
      <div className="view-item">
        <div className="title title-habit">{data.title}</div>
        {/* <div className="img-delete" onClick={() => handleDeleteField(name)}>
          <img width="25px" src={remove_icon} />
        </div> */}
      </div>
    </div>
  );
}

export { ViewTaskCard };
