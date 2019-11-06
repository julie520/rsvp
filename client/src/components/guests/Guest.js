import React, {useContext} from 'react'
import GuestContext from "../../context/guestContext/GuestContext"

const Guest = ({ guest }) => {
  const { updateGuest, removeGuest, editGuest } = useContext(GuestContext);
  const { id, name, phone, dietary, isconfirmed } = guest;
  const handleRemove = () => {
    removeGuest(id);
  }
  const handleIsconfirmed = () => {
    updateGuest({ ...guest, isconfirmed: !isconfirmed });
  }
  const badgeColor = dietary === 'Non-Veg' ? 'red' : dietary === 'Vegan' ? 'green' : 'seaGreen';
  return (
    <div className="guest-card">
      <div className="card-head">
        <div>
          <label className={`${isconfirmed && 'confirm'}`}> Confirmed
        <i className={`fas fa-check-square ${isconfirmed && 'confirm'}`}>
              <input type="checkbox" onChange={handleIsconfirmed} />
            </i>
          </label>
        </div>
        <div>
          <button onClick={() => editGuest(guest)}>
            <i className="fas fa-user-edit"></i>
          </button>
          <button onClick={handleRemove}>
            <i className="fas fa-trash-alt remove"></i>
          </button>
        </div>
      </div>
      <div className="card-body">
        <h2>{name}</h2>
        <span className={`badge ${badgeColor}`}>{dietary}</span>
        <div className="contact">
          <i className="fas fa-phone-alt" />
          <p>{phone}</p>
        </div>
      </div>
    </div>
  )
}

export default Guest
