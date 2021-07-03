import React, { useContext , useReducer } from "react"

// initial state
const initialState = {
    url: "http://journal-backend-fn.herokuapp.com",
    token: null,
    username: null
}

// reducer

const reducer = (state, action) => {
    switch (action.type) {
        case "signup": 
            fetch(state.url + "users/", {
                method: "post", 
                headers: {
                    "Content-Type": "application-json"
                }, 
                body: JSON.stringify(action.payload)
            })
            .then(response => response.json())
            .then((user) => {
                return {
                    ...state, 
                    token: user.token
                };
            });
            break
            case "login": 
            fetch(state.url + "/login/", {
                method: "post", 
                headers: {
                    "Content-Type": "application-json"
                }, 
                body: JSON.stringify(action.payload),
            })
            .then(response => response.json())
            .then((user) => {
                return {
                    ...state, 
                    token: user.token,
                    username: user.username,

                };
            });
            break
        default: 
        return state
        break
    }
}

// app context
const AppContext = React.createContext(null)

// app state component
export const AppState = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return <AppContext.Provider value={{state, dispatch}}>
        {props.children}
    </AppContext.Provider>
}

// use AppState hook

export const useAppState = () => {
    return React.useContext(AppContext)
}

