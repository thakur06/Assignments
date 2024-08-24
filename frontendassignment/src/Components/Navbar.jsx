import { useContext, useState, useCallback } from "react";
import React from 'react';
import { MyContext } from '../Context/Context';

export const Navbar = ({ val }) => {
  const [text, setText] = useState("");
  const [result, setresult] = useState([]);
  const context = useContext(MyContext);

  const search = useCallback((searchText) => {
    Object.values(val).forEach((data) => {
     data.widgets.forEach((item) => {
        if (item.widName!=false && item.widName.indexOf(searchText) >= 0) {
          setresult([...result, item.widName])
        }
      });
    });
  }, [val]);

  const searchThrottle = useCallback(() => {
    let timer;
    return (searchText) => {
      if (timer){clearTimeout(timer);};
      timer = setTimeout(() => {
        search(searchText);
        
      }, 1000); 
    };
  }, [search]);

  
  const throttledSearch = searchThrottle();

  const handleSearchChange = (e) => {
    const newText = e.target.value;
    setText(newText);
  
    throttledSearch(newText);
  };

  return (
    <>
    <div className='flex justify-between pl-10'>
      <h1 className='font-bold'>CNAAP DASHBOARD</h1>
      <div className='p-1'>
        <input className="border border-gray-700 rounded-lg h-8 p-3"
          type="search"
          placeholder="Search widgets"
          value={text}
          onChange={handleSearchChange}
        />
        <button
          className='text-blue-900 border border-blue-900 p-2 m-2 rounded-md'
          onClick={() => context.changemodal()}
        >
          + Add widget
        </button>

      </div>
      
    </div>
    <div className="pl-10 text-red-900 font-extrabold">
      {context.error}
    </div>
    <div className="p-10">
      <h1 className="font-extrabold">Search Results Appear here</h1>
      <a href={`#${result[0]}`}>{result}</a></div>
    </>
  );
};
