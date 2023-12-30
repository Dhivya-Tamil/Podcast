import React, { useState } from 'react'
import "../components/Input.css"

function FileInput({accept,id,fileHandleFnc,text}) {
    const[fileSelected, setFileSelected] = useState("");

    const onChange = (e)=>{
        console.log(e.target.files)
        setFileSelected(e.target.files[0].name)
        fileHandleFnc(e.target.files[0])
    }
  return (
    <div className='custom-input'>
        <label htmlFor={id}>
        {fileSelected ? `File ${fileSelected} selected` : text}</label>
        <input className='file-input'
            type='file' 
            accept={accept} 
            id={id} 
            style={{display:"none"}} 
            onChange={onChange}
        />
    </div>
  )
}

export default FileInput