export {LoginForm}

function LoginForm() {
    return(
    <div className="modal-window-wrapper">
        <div className="modal-window">
            <div className="modal-content">
                <h2 className="hello-title">Welcome to your success diary!</h2>
                    <form>
                        <label class="modal">Enter your email<br/>
                            <input type="text" placeholder="mymail@gmail.com"/>
                            </label><br/>
                            <label class="modal">Enter your password<br/>
                            <input type="password" placeholder="password..."/>
                            </label><br/>
                            <input type="button" value="Sign in"/>
                            <input type="button" value="Sign up"/>
                    </form>
                </div>
            </div>
        </div>);
}