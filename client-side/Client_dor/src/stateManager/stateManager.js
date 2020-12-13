import React,{useState,useEffect} from "react";

const BsContext = React.createContext();
const { Provider } = BsContext;

const StateManager = ({children}) => {
const [first_state, set_first_state] = useState('hello')
const [ships_array, set_ships_array] = useState([{}])
const [grid_array, set_grid_array] = useState([[],[],[],[],[],[],[],[],[],[]])
    const state = {
      first_state,
      ships_array,
      grid_array
    }
    const action = {
      set_first_state,
      set_ships_array,
      set_grid_array
    }
  

    return(
        <Provider value= {{...state,...action}}>
        {children}
        </Provider>
    )
}

export {BsContext ,StateManager}