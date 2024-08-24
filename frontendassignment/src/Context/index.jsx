import { useState } from "react";
import { MyContext } from "./Context.js"
export const StateContext = (props) => {
  

    const [state, setstate] = useState(false);
const [error, seterror] = useState("");

const throttle=(cb)=>{
let time;
return ()=>{
    if (time) clearTimeout(time);
    time=setTimeout(()=>{

   cb("");
},5000)}

}



const newError=(msg)=>{
    seterror(msg)
    const testerr = throttle(seterror);

    testerr();
}
    const changemodal = () => {
     
        setstate(!state)

    }

    return (
        <MyContext.Provider value={{ changemodal, state,error,newError}}>
            {props.children}
        </MyContext.Provider>
    )
}