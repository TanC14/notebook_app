import React from 'react'



import Notes from './Notes';

 const Books = (props) => {
  const {showAlert} = props
  return (
    <div>
    
   <Notes showAlert = {showAlert}/>
    </div>
  )
}

export default Books
