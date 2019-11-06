import React, { useState, useContext, useEffect } from 'react'
import GuestContext from "../../context/guestContext/GuestContext"

const GuestForm = () => {
  const { addGuest, updateGuest, editable, clearEdit } = useContext(GuestContext);
  useEffect(() => {
    if (editable !== null) {
      setGuest(editable);
    } else {
      setGuest({
        name: '',
        phone: '',
        dietary: 'Non-Veg'
      })
    }
  }, [editable]);

  const [guest, setGuest] = useState({
    name: '',
    phone: '',
    dietary: 'Non-Veg'
  });
  const { name, phone, dietary } = guest;
  const handleChange = e => {
    setGuest({
      ...guest,
      [e.target.name]: e.target.value
    });
  }

  const onSubmit = e => {
    e.preventDefault();
    if (editable === null) {
      addGuest(guest);
      setGuest({
        name: '',
        phone: '',
        dietary: 'Non-Veg'
      });
    }
    else {
      updateGuest(guest);
      clearEdit();
    }
  }

  const title = editable === null ? "Invite Someone" : "Edit Guest";
  const buttonText = editable === null ? "Add Guest" : "Update Guest";

  return (
    <div className="invite-section">
      <h1>{title}</h1>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Name" name="name" value={name} onChange={handleChange} />
        <input type="text" placeholder="Phone" name="phone" value={phone} onChange={handleChange} />
        <p className="options-label">Dietary</p>
        <div className="options">
          <label className="container">Non-veg
        <input type="radio" name="dietary" value='Non-Veg' checked={dietary ==='Non-Veg'} onChange={handleChange} />
            <span className="checkmark"></span>
          </label>
          <label className="container">Vegan
        <input type="radio" name="dietary" value='Vegan' checked={dietary ==='Vegan'} onChange={handleChange} />
            <span className="checkmark"></span>
          </label>
          <label className="container">Pescetarian
        <input type="radio" name="dietary" value='Pescetarian' checked={dietary ==='Pescetarian'} onChange={handleChange} />
            <span className="checkmark"></span>
          </label>
        </div>
        <input type="submit" value={buttonText} className="btn" />
        {editable !== null && (
          <input type="button" onClick={clearEdit} value="Cancel" className="btn clear" />
        )}
      </form>
    </div>
  )
}

export default GuestForm
