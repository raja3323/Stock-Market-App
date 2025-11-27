import React, { createContext, useState } from 'react'

const context = createContext();
const authProvider = () => {
   const [user, setUser] = useState(null);
   
  return (
    <div>
      
    </div>
  )
}

export default authProvider;