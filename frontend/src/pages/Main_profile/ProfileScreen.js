import { Grid, Link, Paper } from '@mui/material'
import React from 'react'
import './MainProfile.scss'

const ProfileScreen = () => {
  return (
    <div><Paper elevation={3} className='ProfileData'>
      <Link className='editProfileLink'>Edit profile</Link>
      <br/>
      <img src='https://www2.deloitte.com/content/dam/Deloitte/nl/Images/promo_images/deloitte-nl-cm-digital-human-promo.jpg' alt='person' className='profileImage'></img>
      <center>

        <table>
          <tr>
            <td>
              <p className='profileDetails'>Name : </p>
            </td>
            <td>
              <p className='profileDetailsFilled'>Bhumika Mange</p>
            </td>
          </tr>
          <tr>

            <td>
              <p className='profileDetails'>Sap-ID : </p>
            </td>
            <td>
              <p className='profileDetailsFilled'>60004200065</p>
            </td>
          </tr>
          <tr>
            <td>
              <p className='profileDetails'>Mobile-No : </p>
            </td>
            <td>
              <p className='profileDetailsFilled'>123456789</p>
            </td>
          </tr>
          <tr>
            <td>
              <p className='profileDetails'>DOB : </p>
            </td>
            <td>
              <p className='profileDetailsFilled'>13/10/2002</p>
            </td>
          </tr>
          <tr>
            <td>
              <p className='profileDetails'>Graduating Year : </p>
            </td>
            <td>
              <p className='profileDetailsFilled'>&nbsp;2024</p>
            </td>
          </tr>
        </table>
      </center>

    </Paper></div>
  )
}

export default ProfileScreen