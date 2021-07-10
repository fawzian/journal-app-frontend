import React from "react";
import { useAppState } from "../components/AppState";
import {Route, Link} from "react-router-dom";
import Form  from "../components/form"


const Dashboard = (props) => {

const {state, dispatch} = useAppState();
const {token, url, entries, username} = state;

const getEntries = async () => {
    const response = await fetch(url + "/entries/", {
        method: "get",
        headers: {
            Authorization: "bearer " + token
        },
    });
    const fetchedEntries = await response.json()
    dispatch({ type: "getEntries", payload: fetchedEntries })
};

React.useEffect(() => {
    getEntries();
}, []);

const loaded = () => {

    console.log(state)

    return(
<div className="dashboard">
<h1>{username}'s Journal Entries</h1>
<Link to="/dashboard/new"><button>&#x270E;
</button></Link>
<Route path="/dashboard/:action" render={(rp) => <Form {...rp} getEntries={getEntries}/>}
/>
<ul>
    {state.entries.map((entry) => 
        (<div className="entry" key={entry.id}>
            <h2>{entry.title}</h2>
            <h4>{entry.body}</h4>
            
            <button onClick={() => {
                dispatch({type: "select", payload: entry})
                props.history.push("/dashboard/edit")
            }}>Edit</button>

<button onClick={() => {
                fetch(url + "/entries/" + entry.id, {
                    method: "delete",
                    headers: {
                        Authorization: "bearer " + token
                    }
                })
                .then(() => getEntries());
            }}>Delete</button>
            
        </div>)
    )}
</ul>
</div>
)};

    return entries ? loaded () : <h1>Loading...</h1>;
}

export default Dashboard