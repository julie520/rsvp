import React, { useReducer } from 'react';
import axios from 'axios';
import GuestContext from './GuestContext';
import GuestReducer from './GuestReducer';
import { TOGGLE_FILTER, SEARCH_GUEST, CLEAR_SEARCH, ADD_GUEST,UPDATE_GUEST, REMOVE_GUEST, EDIT_GUEST, CLEAR_EDIT, GET_GUESTS, GUESTS_ERROR, GUEST_ERROR } from '../types';

const GuestState = (props) => {
  const initialState = {
    filterGuest: false,
    search: null,
    editable: null,
    guests: [],
    errors: null
  }
  const [state, dispatch] = useReducer(GuestReducer, initialState);

  const getGuests = async () => {
    try {
      const res = await axios.get('/guests');
      dispatch({
        type: GET_GUESTS,
        payload: res.data
      });
    } catch (error) {
      console.error(error);
      dispatch({
        type: GUESTS_ERROR,
        payload: error.response.data
      })
    }
  }
  
  const addGuest = async(guest) => {
    try {
      const res = await axios.post('/guests', guest);
      dispatch({
        type: ADD_GUEST,
        payload: res.data
      });
    } catch (error) {
      console.error(error);
      dispatch({
        type: GUEST_ERROR,
        payload: error.response.data
      })
    }

  }
  
  const updateGuest = async(guest) => {
    try {
      const res = await axios.put(`/guests/${guest._id}`, guest);
      dispatch({
        type: UPDATE_GUEST,
        payload: res.data
      });
    } catch (error) {
      console.error(error);
      dispatch({
        type: GUEST_ERROR,
        payload: error.response.data
      });
    }
    
  }

  const removeGuest = async (id) => {
    try {
      await axios.delete(`/guests/${id}`);
      dispatch({
        type: REMOVE_GUEST,
        payload: id
      });
    }
    catch (error) {
      console.error(error);
      dispatch({
        type: GUEST_ERROR,
        payload: error.response.data
      });
    }
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
        clearSearch,
        getGuests
      }}
    >{props.children}</GuestContext.Provider>
  )
}

export default GuestState
