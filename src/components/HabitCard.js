import plus from "../img/plus.svg"
export function HabitCard() {
  return (
    <div className="card">
      <div className="habits">
        <div className="header-card">
          <h2>Habits tracker</h2>
          <div className="add-habit">
            <div className="add-btn">
              <img src={plus} width="23px" />
              <div className="add-title">Add habit</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
