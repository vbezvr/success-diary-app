import { useState } from "react";

function ViewTaskCard() {
  const [date, setDate] = useState("");
  
  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="card add-task">
      <div className="task-card">
        <h2>Done task history</h2>
        <div className="task-form">
          <form onSubmit={(e) => handleSubmit(e)}>
            <input type="date" />
            <input type="submit" className="submit details" value="Show" />
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
