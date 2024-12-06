import { useRef, useState, useEffect } from "react"
import "/src/index.css"

export default function App() {
  const ref = useRef()
  const listref = useRef()
  const [Task, setTask] = useState([])

  document.addEventListener("copy",(e) =>{
    window.getSelection().toString();
    e.clipboardData.setData("text/plain", "😊😁")
    e.preventDefault();
  })

  // Fetch tasks from local storage when the component mounts
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTask(storedTasks);
  }, []);

  return (
    <>
    <div className=" background  bg-black/30 backdrop-blur-sm   h-screen w-screen  flex flex-col   items-center">
     <div className="logo"></div>
    <div className="main bg-white/50 backdrop-blur drop-shadow-2xl p-10 mt-[1rem] rounded-lg overflow-auto ">
    <h1 className="text-center mb-5 text-4xl font-bold  uppercase  text-white ">
      Todo App
    </h1>
    <div className="m-task flex" >
<input type="text" placeholder="Enter your task here" className="w-full p-3 rounded-lg outline-none bg-black text-white font-medium" ref={ref}/>
<button className="rounded-full bg-green-500 font-bold text-3xl p-2 ml-2" onClick={() => {
  if(ref.current.value==="") {
    alert("Please enter a task") 
    return  // Prevent adding an empty task
  }
  const newTask = { key: Date.now(), text: ref.current.value, done: false }; // Include 'done' property
  const updatedTasks = [...Task, newTask];
  setTask(updatedTasks);
  localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Update local storage
  ref.current.value = ""; // Clear the input field
}}><i className="fa-solid fa-plus"></i></button>
    </div>

 <div className="task  " >
<ol>
    {Task.map((task) => {
      return (
        <>
        <div className="flex justify-between ">
        <li key={task.key} className={`mt-5 border-bot d break-all w-[9rem] font-semibold text-lg ${task.done ? 'line-through' : ''}`}>{task.text}</li>
        
        <div className="operations">
        <button onClick={() => {
          const updatedTasks = Task.map(t => 
            t.key === task.key ? { ...t, done: true } : t // Update the task to set done to true
          );
          setTask(updatedTasks);
          localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Update local storage
        }} className="mt-5 p-2 mr-2 rounded-lg font-bold text-white bg-green-400"><i className="fa-solid fa-check"></i></button>
        
        <button onClick={()=>{
          const updatedTasks = Task.map(t => 
            t.key === task.key? {...t, done: false } : t // Update the task to set done to false
          );
          setTask(updatedTasks);
          localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Update local storage
        }} className="mt-5 p-2 mr-2 rounded-lg font-bold text-white bg-orange-400"><i className="fa-solid fa-rotate-right"></i></button>
        <button onClick={() => {
          const updatedTasks = Task.filter((t) => t.key !== task.key);
          setTask(updatedTasks);
          localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Update local storage
        }} className="bg-red-600 mt-5 p-2 rounded-lg font-bold text-white"><i className="fa-solid fa-trash"></i></button>
       
        </div>
        </div>
        
        </>
      )
    
    })}
  </ol>
 </div>
      
    </div>

    <footer  >
            <p>Created by : Ahad - A28</p>
                <div class="socialmedia">
        <a href="https://www.linkedin.com/in/AhadA28"target="_blank"><i class="fa-brands fa-linkedin"></i></a>
        <a href="https://github.com/Ahad-A28" target="_blank"><i class="fa-brands fa-github"></i></a>
        <a href="https://www.instagram.com/ahad.a28/"target="_blank"><i class="fa-brands fa-instagram"></i></a>
                </div>
            </footer>
    </div>

   
    </>
  )
}