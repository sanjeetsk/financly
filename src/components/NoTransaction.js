import React from 'react'

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
      <img src='' style={{width:"400px", margin:"4rem"}}/>
      <p style={{textAlign:"center", fontSize:"1.2rem"}}>You have not made any transactions yet.</p>
    </div>
  )
}

export default NoTransaction
