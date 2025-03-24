import { useEffect, useState } from "react"

export default function TodoList(){
    const [Tasks, setTasks] = useState([
        {
            id: 1,
            label: "Ma premiere tache",
            isCompleted: false,
        },
        {
            id: 2,
            label: "Ma deuxieme tache",
            isCompleted: true,
        }
    ])
    useEffect(()=>{
        console.log('Use effect')
    })
    return <div>
        {/* <InputsTodo /> */}
        <h2>TODO</h2>
        <div id="TodoTasks"></div>
        <li>todoList</li>
        <ul>
            {Tasks.map((task)=>{
                return <li key={task.id}>
                    <input type="checkbox" checked={task.isCompleted} onChange={(e)=>{
                         
                         const UpdatedTask = setTasks(Tasks.map((currentTask)=>{
                            if(task.id === currentTask){
                                return {
                                    id: currentTask.id,
                                    label: currentTask.label,
                                    isCompleted: currentTask.isCompleted,
                                }
                            }
                        }))
                        setTasks(UpdatedTask)
                        task.isCompleted = !task.isCompleted;
                    }} />
                    <span>{task.label}</span>
                </li>
            })}
        </ul>
        <h2>DONE</h2>
        <div id="DoneTasks"></div>
    </div>
}


function InputsTodo(){
    const [text, setText] = useState("")

    useEffect(()=>{
        console.log('Use Effect',text)
    },[text])

    return <div>
        <h2>Inputs</h2>
        <input type="text" placeholder="Ma tâche" value={text} onChange={(e) =>{setText(e.target.value)} } />
        <button onClick={()=>{
            if(text === ""){
                return;
            }
            const todo = document.getElementById("TodoTasks");
            const task = document.createElement("div");
            
            task.innerHTML = `task ${text} add`
            setText("")
            todo.appendChild(task);
            return <div></div>
        }}>Add Task</button>
    </div>
}
