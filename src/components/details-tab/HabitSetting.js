function HabitSetting() {
    

  return (
    <div className="card">
      <div className="habits">
        <div className="header-card">
          <h2>Your habits</h2>
        </div>
        <div className="habits-form">
          <div className="habits-items-wrapper">
            <div className="view-item-wrapper habits-view">
              <div className="view-item">
                <div className="title title-habit">Study English</div>
                <div className="img-delete">
                  <img width="25px" src="./img/close.svg" />
                </div>
              </div>
            </div>
            <div className="view-item-wrapper habits-view">
              <div className="view-item">
                <div className="title title-habit">Read 30 min</div>
                <div className="img-delete">
                  <img width="25px" src="./img/close.svg" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <form>
          <input
            className="text t-details"
            type="text"
            placeholder="add new habit"
          />
          <input className="submit details" type="submit" value="Add" />
        </form>
      </div>
    </div>
  );
}

export { HabitSetting };
