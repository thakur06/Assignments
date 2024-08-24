import React, { useState, useContext } from 'react'
import { MyContext } from '../Context/Context'

export const Section = ({ func, btn, name }) => {
  const [widname, setwidname] = useState("");
  const [widitem, setwiditem] = useState("");
  return (

    <div className='flex flex-col p-2'>
      <h1>Add widget to <b>{name}</b></h1>
      <input placeholder=" add widget name" className=" border border-gray-500" type="text" value={widname} onChange={(e) => {
        e.preventDefault();
        setwidname(e.target.value)
      }} required/>
      <input className=" border border-gray-500" placeholder=" add widget content" type="text" value={widitem} onChange={(e) => {
        e.preventDefault();
        setwiditem(e.target.value)
      }} required/>

      <button className="rounded-lg bg-blue-900 text-white w-fit text-center p-3 mx-auto" type={"button"} onClick={() => {

        widitem.trim()!="" && widname.trim()!=""?func(name, { widName: widname, content: widitem, display: true }, btn): void
        setwiditem("");
        setwidname("");
        setwiditem("");
      }}>Confirm</button>
    </div>
  )
}
