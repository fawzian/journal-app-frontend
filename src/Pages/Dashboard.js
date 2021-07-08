import React from "react";
import { useAppState } from "../components/AppState";
import {Route, Link} from "react-router-dom";
import Form  from "../components/form"


const Dashboard = (props) => {

const {state, dispatch} = useAppState();
const {token, url, entries, username} = state

const getEntries = async () => {
    const response = fetch(url + "/entries/")
    const entries = (await response).json()
    dispatch({type: "getEntries", payload: entries})
}

React.useEffect(() => getEntries, [])

const loaded = () => (
    <div className="dashboard">
    <h1>{username}'s Journal Entries</h1>
    <Link to="/dashboard/new"><button>New Journal Entry</button></Link>
    <Route path="/dashboard/:action" render={(rp) => <Form {...rp} getEntries={getEntries}/>}/>
    <ul>
        {entries.map(entry => {
            <div className="entry" key={entry.id}>
                <h2>{entry.title}</h2>
                <h3>{entry.body}</h3>
            </div>
        }
            )}
    </ul>
    </div>
)

    return entries ? loaded () : <h1>Loading...</h1>
}

export default Dashboard