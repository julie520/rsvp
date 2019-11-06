import React, { useReducer } from 'react';
import GuestContext from './GuestContext';
import GuestReducer from './GuestReducer';
import { TOGGLE_FILTER, SEARCH_GUEST, CLEAR_SEARCH, ADD_GUEST,UPDATE_GUEST, REMOVE_GUEST, EDIT_GUEST, CLEAR_EDIT } from '../types';

const GuestState = (props) => {
  const initialState = {
    filterGuest: false,
    search: null,
    editable: null,
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
  const [state, dispatch] = useReducer(GuestReducer, initialState);
  
  const addGuest = (guest) => {
    guest.id = Date.now();
    dispatch({
      type: ADD_GUEST,
      payload: guest
    });
  }
  
  const updateGuest = (guest) => {
    dispatch({
      type: UPDATE_GUEST,
      payload: guest
    });
  }

  const removeGuest = (id) => {
    dispatch({
      type: REMOVE_GUEST,
      payload: id
    });
  }

  const editGuest = (guest) => {
    dispatch({
      type: EDIT_GUEST,
      payload: guest
    });
  }

  const clearEdit = () => {
    dispatch({
      type: CLEAR_EDIT
    });
  }

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
        editable: state.editable,
        filterGuest: state.filterGuest,
        search: state.search,
        addGuest,
        updateGuest,
        removeGuest,
        editGuest,
        clearEdit,
        toggleFilter,
        searchGuest,
        clearSearch
      }}
    >{props.children}</GuestContext.Provider>
  )
}

export default GuestState
