import React from 'react'

const NotFound = () => {
    return (
        <>
      <div>
      <img
        src="Images/error.png"
        alt="img"
        style={{ maxWidth: "150%", height: "auto" }}
      />
      <h1
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Page not found
      </h1>
    </div>
        </>
    )
}

export default NotFound