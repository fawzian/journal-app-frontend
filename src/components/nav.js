import React from "react";
import {Link} from "react-router-dom";
import {useAppState} from "../components/AppState"

const Nav = (props) => {

    const { state, dispatch} = useAppState()

    return <header>
        <div className="title-background"><h1><span id="logo1">Dear</span><span id="logo2">Diary</span>&#9825;</h1>
        </div>
        <nav>
            {!state.token ? (<> <Link to="/"><div>Home</div></Link>
            <Link to="/auth/signup"><div>Sign Up</div></Link>
            <Link to="/auth/login"><div>Login</div></Link> </>) : null }
            {state.token ? <div onClick={() => {
                dispatch({type: "logout"});
                props.history.push("/");
            }}>Logout</div> : null}
        </nav>
    </header>
}

export default Nav