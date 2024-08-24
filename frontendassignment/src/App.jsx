import { useContext, useState } from "react"
import { Container } from "./Components/Container"
import { Navbar } from "./Components/Navbar"
import { MyContext } from "./Context/Context"
function App() {

  const [data, setData] = useState({
    CSPM: {
      name: "CSPM",
      widgets: [
        { widName: "Cloud Account", content: "graph", display: true },
        { widName: "Cloud Risk Assesment", content: "graph", display: true },
        { widName: false, content: false, display: true },
      ],
    },
    CWPP: {
      name: "CWPP",
      widgets: [
        { widName: "Alerts", content: "graph", display: true },
        { widName: "Workloads", content: "graph", display: true },
        { widName: false, content: false, display: true },
      ],
    },
    Image: {
      name: "Image",
      widgets: [
        { widName: "Registry scan", content: "graph", display: true },
        { widName: "Security issues", content: "graph", display: true },
        { widName: false, content: false, display: true },
      ],
    },

  });
const context=useContext(MyContext);
  const addWidget = (key, newWidget, btnIn) => {
    let flag=true;
    setData((prevState) => {
      const updatedState = { ...prevState };
      if (updatedState[key]) {
        updatedState[key].widgets.forEach(widget => {
  
          if (widget.widName === newWidget.widName) {
          context.newError("Widget already exists ! \n Cannot add duplicate widgets");
           flag=false
          }
        })
       flag? updatedState[key].widgets.splice(btnIn, 0, newWidget):null

      }
      return updatedState;
    });
  };

  const handleAddWidget = (nameToMatch, newWidget, btnIn) => {
    Object.keys(data).forEach((key) => {
      if (data[key].name === nameToMatch) {
        addWidget(key, newWidget, btnIn);
      }
    });
  };
  const addVisibility = (key, index) => {
    setData((prevState) => {
      const updatedState = { ...prevState };
      if (updatedState[key]) {
        updatedState[key].widgets[index].display = !updatedState[key].widgets[index].display;

        return updatedState;
      }
      return updatedState;
    });
  };


  const handletoggle = (nameToMatch, index) => {
    Object.keys(data).forEach((key) => {
      if (data[key].name === nameToMatch) {

        addVisibility(key, index);
      }
    });
  };
  return (
    <>
    
        <Navbar val={data} />
        <Container val={data} setter={setData} func={handleAddWidget} toggle={handletoggle} />
    </>
  );
}
export default App
