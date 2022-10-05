import { format } from "date-fns";
import { get, ref } from "firebase/database";
import { useContext, useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import { context } from "../..";

function ViewTaskCard() {
  const [date, setDate] = useState(new Date());
  const [tasks, setTasks] = useState({ forDate: null, data:[] });
  const formatData = format(date, "yy-MM-dd");
  const { db } = useContext(context);
  const { uid } = useSelector((state) => state.userConfig);

  useEffect(() => {
    const dateRef = ref(db, `users/${uid}/${formatData}`);
    get(dateRef).then((snap) => {
      if (snap.exists() && tasks.forDate !== formatData) {
        setTasks((prevState) => Object.assign(prevState, {forDate: formatData}));
        console.log("work")
      }
      return snap;
    }).then((snap) => {
      if (snap && tasks) {
        console.log(tasks)
        snap.forEach((elem) => {
          setTasks((prevState) => {
            Object.assign({}, prevState, {
              data: [ elem.val()],
            });
          });
        });

      }
    });
  });

  console.log(tasks)

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
          <div className="habits-items-wrapper">{}</div>
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

export { ViewTaskCard };
