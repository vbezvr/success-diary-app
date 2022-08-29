import React, { useContext } from "react";
import { format } from "date-fns";
import { useState } from "react";
import { context } from "..";
import { useSelector } from "react-redux";
import { push, ref, set } from "firebase/database";

function AddTaskCard() {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [category, setCategory] = useState("sport");
  const {db} = useContext(context);
  const {uid} = useSelector((state)=>state.userConfig)

  function handleSubmit(e) {
    const data = format(new Date(), "yy-MM-dd");
    const taskDayRef = ref(db, `users/${uid}/${data}`)
    const addTaskRef = push(taskDayRef)
    const taskItem = {
      title,
      value, 
      category
    }
    set(addTaskRef, taskItem);

    e.preventDefault();
  }
  return (
    <div className="card add-task">
      <div className="task-card">
        <h2>Add the task</h2>
        <div className="task-form">
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label>
                Task
                <br />
                <input
                  type="text"
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Insert task name"
                />
              </label>
              <br />
              <label>
                Select category
                <br />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="sport">Sport</option>
                  <option value="mental health">Mental health</option>
                  <option value="study">Study</option>
                  <option value="health">Health</option>
                </select>
              </label>
              <br />
            </div>
            <div className="textarea">
              <label>
                Add description
                <br />
                <textarea onChange={(e) => setValue(e.target.value)}></textarea>
              </label>
            </div>
            <input type="submit" value="Done" />
          </form>
        </div>
      </div>
    </div>
  );
}

export {AddTaskCard}
