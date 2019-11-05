import React, { useReducer } from 'react';
import GuestContext from './GuestContext';
import gusetReducer from './GuestReducer';
import { TOGGLE_FILTER, SEARCH_GUEST, CLEAR_SEARCH } from '../types';

const GuestState = (props) => {
  const initialState = {
    filterGuest: false,
    search: null,
    guests: [
      {
        id: 1,
        name: "Jake Smith",
        phone: '333 444 9999',
        dietary: 'Vegan',
        isconfirmed: false
      },
      {
        id: 2,
        name: "Merry Williams",
        phone: '222 777 6666',
        dietary: 'Non-Veg',
        isconfirmed: true
      },
      {
        id: 3,
        name: "Azhaan Idress",
        phone: "333 777 5555",
        dietary: 'Pescetarian',
        isconfirmed: true
      },
    ]
  }
  const [state, dispatch] = useReducer(gusetReducer, initialState);
  const toggleFilter = () => {
    dispatch({
      type: TOGGLE_FILTER
    })
  }
  const searchGuest = (guest) => {
    dispatch({
      type: SEARCH_GUEST,
      payload: guest
    })
  }

  const clearSearch = () => {
    dispatch({
      type: CLEAR_SEARCH
    })
  }

  return (
    <GuestContext.Provider
      value={{
        guests: state.guests,
        filterGuest: state.filterGuest,
        search: state.search,
        toggleFilter,
        searchGuest,
        clearSearch
      }}
    >{props.children}</GuestContext.Provider>
  )
}

export default GuestState
