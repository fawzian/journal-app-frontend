import React, { useContext , useReducer } from "react"

// initial state
const initialState = {
    url: "http://journal-backend-fn.herokuapp.com",
    token: null,
    username: null
}

// reducer

const reducer = (state, action) => {
    let newState;
    switch (action.type) {
        case "auth":
            newState = { ...state, ...action.payload };
            return newState;
            break;
            case "logout":
                newState = {...state, token: null, username: null}
                window.localStorage.removeItem("auth")
                return newState
        default:
            return state;
            break;
    }
};

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

