import { get, ref, set } from "firebase/database";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { context } from "../..";
import { useForceUpdate } from "../../hooks/useForceUpdate";
import { ViewItem } from "./ViewItem";

function CategoryCard() {
  const [value, setValue] = useState("");
  const [categories, setCategories] = useState([]);
  const forceUpdate = useForceUpdate();
  const { db } = useContext(context);
  const { uid } = useSelector((state) => state.userConfig);
  const categoryRef = ref(db, `category/${uid}/active`);

  const categoriesItems = categories
    .slice(1)
    .map((item, index) => (
      <ViewItem name={item} handleDeleteField={handleDeleteField} key={index} />
    ));

  useEffect(() => {
    get(categoryRef).then((snap) => {
      if (snap.exists()) {
        const data = snap.val();
        if (categories.length !== data.length) {
          setCategories(data);
        }
      }
    });
  });


  function handleSubmit(event) {
    event.preventDefault();
    if (value) {
      set(categoryRef, [...categories, value]);
      setValue("");
    }
  }

  function handleDeleteField(categoryName) {
    const index = categories.indexOf(categoryName);
    categories.splice(index, 1);
    set(categoryRef, categories);
    forceUpdate();
  }


  return (
    <div className="card">
      <div className="habits">
        <div className="header-card">
          <h2>Your categories</h2>
        </div>
        <div className="habits-form">
          <div className="habits-items-wrapper">{categoriesItems}</div>
        </div>
        <form onSubmit={(event) => handleSubmit(event)}>
          <input
            onChange={(e) => setValue(e.target.value)}
            value={value}
            className="text t-details"
            type="text"
            placeholder="add new category"
          />
          <input className="submit details" type="submit" value="Add" />
        </form>
      </div>
    </div>
  );
}

export { CategoryCard };
