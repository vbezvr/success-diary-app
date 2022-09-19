import { toCapitalize } from "../../helper";
import remove_icon from "../../img/close.svg";

function ViewItem({ name, handleDeleteField }) {
  const habitName = toCapitalize(name);
  
  return (
    <div className="view-item-wrapper habits-view">
      <div className="view-item">
        <div className="title title-habit">{habitName}</div>
        <div className="img-delete" onClick={() => handleDeleteField(name)}>
          <img width="25px" src={remove_icon} />
        </div>
      </div>
    </div>
  );
}

export {ViewItem}