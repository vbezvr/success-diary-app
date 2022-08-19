export {SideMenu}

function SideMenu() {

    return (
      <div className="side">
        <div className="side-wrapper">
          <div className="title-app">P L A N N E R</div>
          <div className="user-info">
            <img
              className="user-photo"
              src="./img/user.jpeg"
              width="60px"
              height="60px"
            />
            <p>Ann Jonson</p>
          </div>
        </div>
      </div>
    );
}