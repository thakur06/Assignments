import React, { useContext, useState } from 'react';
import { MyContext } from '../Context/Context';
import Piechart from './Piechart';
import { Section } from "./Section";

export const Container = ({setter, val, func,toggle}) => {
  const context = useContext(MyContext);
const [btnIn, setbtnIn] = useState(0);
  const [content, setcontent] = useState(val.CSPM.name);



  const handletoggle = (nameToMatch, index,uname) => {

   
    Object.values(val).forEach((section) => {
      if (section.name === nameToMatch) {
        const updatedWidgets = [...section.widgets];
        updatedWidgets.forEach((widgets) =>{
          widgets.widName==uname?widgets.display=!widgets.display:null
        })
  
        setter((prevState) => {
          const updatedState = { ...prevState };
          updatedState[section.name] = { ...section, widgets: updatedWidgets };
          return updatedState;
        });
      }
    });
  };
  return (
    <>

      <div className='p-5 relative bg-blue-gray-50'>
        {Object.values(val).map((item, index) => (
          <div key={index}>
            <h3 className='font-medium'>{item.name}</h3>
            <div className='flex flex-row w-full border gap-4 flex-grow'>
              {item.widgets.filter(wid => wid.display == true).map((widget, widgetIndex) => (

                <div id={(widget.widName).toString()}
                  key={widget.widName} 
                  className='h-[14rem] flex flex-col basis-2/5 rounded-xl bg-gray-50 justify-center items-center'
                > 
              
              {widget.widName && <button className='pl-[90%] text-red-900 font-extrabold ' onClick={()=>handletoggle(item.name,widgetIndex,widget.widName)}>X</button>}
       
                  {widget.display && widget.content === 'graph' ? (
                    <>
                      <h1 >{widget.widName}</h1>
                      
                      <Piechart  />
                    </>
                  ) : widget.widName ? (
                  <>
                      <h1 className='right-0 font-semibold'>{widget.widName}</h1>
                      <h1>{widget.content}</h1>
                     
                      <img  className="w-24 mx-auto" src='/src/graph.png'/>
                      <div className='w-full font-light text-center justify-center items-center'>No graph data available!</div>
                      </>
                  ) : (
                    <button
                      className='text-center text-blue-gray-600 border border-blue-gray-600 p-1 rounded-lg cursor-pointer'
                      onClick={() => {context.changemodal();
                        setbtnIn(widgetIndex);
                      }}
                    >
                      + Add Widget
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

      </div>
      {context.state && <div className='absolute right-0 top-0 bg-white h-full w-[40%] overflow-y-scroll'>
        <div className='flex text-center flex-row justify-between h-8 text-white bg-[#00008B]'>
          <h1 className='pl-3'>Add widget</h1>
          <span className='cursor-pointer pr-3' onClick={() => context.changemodal()}>X</span>
        </div>
        <div className='flex flex-col'>
          {Object.values(val).map((data, index) => (
            <div key={data.name} onClick={() => { setcontent(data.name); }}>
              <div className='pl-4 flex text-center gap-6 h-8 text-white bg-blue-200'>
                {data.name}
              </div>
              {data.widgets.filter(wid => wid.content !== false).map((widget, widgetIndex) => (
                <div className='flex flex-col p-3' key={widget.widName}>
                  <label className='w-full border border-blue-900 p-4'>
                    <input
                      type='checkbox'
                      value={data.name}
                      checked={widget.display}
                      onChange={() => handletoggle(data.name, widgetIndex, widget.widName)}
                    />
                    {widget.widName}
                  </label>
                </div>
              ))}
              <Section key={data.name} btn={btnIn} name={data.name} func={func} />
            </div>
          ))}
        </div>
      </div>}
    </>
  );
};
