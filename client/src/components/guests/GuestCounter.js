import React, { useContext } from 'react'
import GuestContext from '../../context/guestContext/GuestContext'

const GuestCounter = () => {
  const { guests } = useContext(GuestContext)
  const totalInvited = guests.length;
  const totalAttending = guests.filter(guest => guest.isconfirmed).length;
  const invietedByDiet = (type) => guests.filter(guest => guest.dietary === type).length;
  const attendingByDiet = (type) => guests.filter(guest =>guest.isconfirmed && guest.dietary === type).length;
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>Guest</th>
            <th>Invited</th>
            <th>Attending</th>
          </tr>
          <tr>
            <th>Non-Veg</th>
            <td>{invietedByDiet('Non-Veg')}</td>
            <td>{attendingByDiet('Non-Veg')}</td>
          </tr>
          <tr>
            <th>Vegan</th>
            <td>{invietedByDiet('Vegan')}</td>
            <td>{attendingByDiet('Vegan')}</td>
          </tr><tr>
            <th>Pescetarian</th>
            <td>{invietedByDiet('Pescetarian')}</td>
            <td>{attendingByDiet('Pescetarian')}</td>
          </tr>
          <tr>
            <th>Total</th>
            <td>{totalInvited}</td>
            <td>{totalAttending}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default GuestCounter
