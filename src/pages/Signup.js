import React from 'react'
import Header from '../components/Header'
import SignUpLogin from '../components/SignUpLogin'

function Signup() {
  return (
    <div>
      <Header />
      <div className='wrapper'>
        <SignUpLogin />
      </div>
    </div>
  )
}

export default Signup
