import {ADD_GUEST, UPDATE_GUEST, REMOVE_GUEST, TOGGLE_FILTER, SEARCH_GUEST, CLEAR_SEARCH, EDIT_GUEST, CLEAR_EDIT } from '../types';

export default (state, { type, payload }) => {
  switch (type) {
    case ADD_GUEST:
      return {
        ...state,
        guests: [payload, ...state.guests]
      }
    case UPDATE_GUEST:
      return {
        ...state,
        guests: state.guests.map(guest => guest.id === payload.id ? payload : guest)
      }
    case REMOVE_GUEST:
      return {
        ...state,
        guests: state.guests.filter(guest => guest.id !== payload)
      }
    case EDIT_GUEST:
      return {
        ...state,
        editable: payload
      }
    case CLEAR_EDIT:
      return {
        ...state,
        editable: null
      }
    case TOGGLE_FILTER:
      return {
        ...state,
        filterGuest: !state.filterGuest
      }
    case SEARCH_GUEST:
      const reg = new RegExp(`${payload}`, 'gi');
      return {
        ...state,
        search: state.guests.filter(guest => guest.name.match(reg))
      }
    case CLEAR_SEARCH:
      return {
        ...state,
        search: null
      }
    default:
      return state
  }
}