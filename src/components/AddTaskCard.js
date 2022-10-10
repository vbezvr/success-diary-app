import React, { useContext } from "react";
import { format } from "date-fns";
import { useState } from "react";
import { context } from "..";
import { useDispatch, useSelector } from "react-redux";
import { push, ref, set } from "firebase/database";
import { setActiveCategory } from "../features/actions";

function AddTaskCard() {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const {activeCategory} = useSelector((state)=>state.userData);
  const {db} = useContext(context);
  const {uid} = useSelector((state)=>state.userConfig)

  function handleSubmit(e) {
    const data = format(new Date(), "yy-MM-dd");
    const taskDayRef = ref(db, `users/${uid}/${data}`);
    const addTaskRef = push(taskDayRef);
    const taskItem = {
      title,
      value, 
      activeCategory
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
                  className="text"
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Insert task name"
                />
              </label>
              <br />
              <SelectForm />
              <br />
            </div>
            <div className="textarea">
              <label>
                Add description
                <br />
                <textarea onChange={(e) => setValue(e.target.value)}></textarea>
              </label>
            </div>
            <input type="submit" className="submit" value="Done" />
          </form>
        </div>
      </div>
    </div>
  );
}

function Option({value}) {
  return <option value={value}>{value}</option>
}

function SelectForm() {
  const [category, setCategory] = useState("");
  const {categories}  = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  console.log(categories);
  const options = categories.slice(1).map((elem, index) => (
    <Option key={index} value={elem} />
  ));

  function handleChange(event) {
    setCategory(event.target.value);
    dispatch(setActiveCategory(category))
  }

  return (
    <label>
      Select category
      <br />
      <select value={category} onChange={(event) => handleChange(event)}>
        {options}
      </select>
    </label>
  );
}

export {AddTaskCard}
