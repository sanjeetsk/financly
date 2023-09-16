import React from 'react'
import nodata from '../assets/nodata.png'

function NoTransaction() {
  return (
    <div style={{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        width:"100%",
        flexDirection:"column",
        marginBottom:"2rem"
    }}>
      <img src={nodata} style={{width:"250px", margin:"2rem"}}/>
      <p style={{textAlign:"center", fontSize:"1.2rem"}}>You have not made any transactions yet.</p>
    </div>
  )
}

export default NoTransaction
