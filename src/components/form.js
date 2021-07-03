import React from "react";
import { useAppState } from "../components/AppState"

const Form = (props) => {

    const { state, dispatch} = useAppState();

    const action = props.match.params.action
    const [formData, setFormData] = React.useState(state[action])

    const actions = {
        new: () => {
            return fetch(state.url + "/entries", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                    body: JSON.stringify(formData),
            }).then((response) => response.json());
        },
        edit: () => {
            return fetch(state.url + "/entries/" + state.edit.id, {
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                },
                    body: JSON.stringify(formData),
            }).then((response) => response.json());
        },

    };

    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value})
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        actions[action]().then((data) => {
            props.getEntries()
            props.history.push("/dashboard/")
        });
    };

    return (
        <div className="form" onSubmit={handleSubmit}>
            <form>
                <input type="text" name="title" value={formData.title} onChange={handleChange}/>
                <input type="text" name="body" value={formData.body} onChange={handleChange}/>
                <input type="submit" value={action} />
            </form>
        </div>
    ); 
};

export default Form