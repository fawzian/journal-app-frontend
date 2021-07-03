import React, { useContext , useReducer } from "react"

// initial state
const initialState = {
    url: "http://journal-backend-fn.herokuapp.com/"
}

// reducer

const reducer = (state, action) => {
    switch (action.type) {
        default: 
        return state
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

