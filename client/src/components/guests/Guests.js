import React, { useContext, useEffect } from 'react'
import GuestContext from '../../context/guestContext/GuestContext'
import Guest from './Guest'

const Guests = () => {
  const { getGuests, guests, filterGuest, search } = useContext(GuestContext);
  useEffect(() => {
    getGuests();
    // eslint-disable-next-line
  }, []);
  
  return (
    <div className="guests">
      {
        search !== null ? search.map(guest => <Guest key={guest._id} guest={guest} />) :
        guests.filter(guest => !filterGuest || guest.isconfirmed).map(guest => <Guest key={guest._id} guest={guest} />)}
    </div>
  )
}
export default Guests
