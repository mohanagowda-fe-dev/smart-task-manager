
import Header from "./components/Header";

import { useState, useEffect } from "react";


function App() {
  
  const [task , setTask]= useState("");

  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem("tasks");
      if (!savedTasks) return []; // nothing saved yet
      const parsed = JSON.parse(savedTasks);
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      console.error("Error parsing tasks from localStorage", err);
      return [];
    }
  });


  useEffect (()=>{

    localStorage.setItem("tasks", JSON.stringify(tasks));

  }, [tasks]);

  const addTask = () =>{

    if(task.trim() === "")
      return ;

    setTasks([...tasks, task]);
    setTask("");

  }

  const deleteTask = (id) =>{
   setTasks(tasks.filter((_, index) => index!== id));
  }

  console.log("Tasks:", tasks);

  return (
   
      <div style={{ padding: "20px" }}>
        <Header title ="My Tasks" />
        <input type ="text"
        placeholder="Enter task"
        value ={task}
        onChange ={(e)=>setTask(e.target.value)}/>
        <button onClick={addTask}>Add Task</button>

      
       <ul style={{ marginTop: "20px", fontSize: "18px" }}>

        { Array.isArray(tasks) && tasks.map((t, index)=>(
          <li key = {index} style={{ marginBottom: "5px" }}>{t}{" "}
          <button style={{ marginLeft: "10px" }} onClick={ ()=>deleteTask(index)}>Delete</button>
          </li>
        ))}
       </ul>
      </div>
      
    
  )
}

export default App
