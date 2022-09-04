import { format, set } from "date-fns";
import {
  child,
  onChildAdded,
  ref,
  remove,
} from "firebase/database";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { context } from "..";
import close from "../img/close.svg";
import pencil from "../img/pencil.svg";

function CompletedItem({
  value: {
    value: { title, category },
    key,
  },
  handleDeleteTask,
}) {
  return (
    <div className="view-item-wrapper">
      <div className="view-item">
        <div className="title">{title}</div>
        <div className="category-name">{category}</div>
        <div className="img-edit">
          <img width="23px" src={pencil} />
        </div>
        <div className="img-delete" onClick={() => handleDeleteTask(key)}>
          <img width="25px" src={close} />
        </div>
      </div>
    </div>
  );
}

function CompletedCard() {
  const [items, setItems] = useState([]);
  const { db } = useContext(context);
  const { uid } = useSelector((state) => state.userConfig);
  const data = format(new Date(), "yy-MM-dd");
  const taskRef = ref(db, `users/${uid}/${data}`);

  useEffect(() => {
    const addedListener = onChildAdded(taskRef, (snap) => {
      console.log(snap.val());
      const key = snap.key;
      const taskItem = { key: snap.key, value: snap.val() };
      const isInclude = items.find((elem) => elem.key === key);
      if (!isInclude) {
        setItems((prevState) => [...prevState, taskItem]);
      }
    });

    return () => {
      addedListener();
    };
  });

  const listItems = items.map((elem, index) => (
    <CompletedItem
      key={index}
      value={elem}
      handleDeleteTask={handleDeleteTask}
    />
  ));

  function handleDeleteTask(key) {
    const itemRef = ref(db, `users/${uid}/${data}/${key}`);
    remove(itemRef);
    setItems([])
  }

  return (
    <div className="card">
      <div className="view-task">
        <h2>Completed tasks</h2>
        <div className="view-container">{listItems}</div>
      </div>
    </div>
  );
}

export { CompletedCard };
