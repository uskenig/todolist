import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";


export type FilterValuesType = "all" | "active" | "completed";

function App() {

    let [tasks, setTasks] = useState([
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false },
        { id: v1(), title: "Rest API", isDone: false },
        { id: v1(), title: "GraphQL", isDone: false },
    ]);

    const changeIsDone = (newId: string, newIsDone: boolean) => {
        setTasks(tasks.map(el => el.id === newId ? {...el, isDone : newIsDone} : el))
        // let currentTask = tasks.find(el => el.id === newId)
        // if(currentTask){
        //     currentTask.isDone = newIsDone
        //     setTasks([...tasks])
        // }
    }

    const addTask = (newTitle:string) => {
        const newTask:TaskType = { id: v1(), title: newTitle, isDone: false }
        setTasks([newTask, ...tasks])
    }

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id != id);
        setTasks(filteredTasks);
    }

    let [filter, setFilter] = useState<FilterValuesType>("all");

    let tasksForTodolist = tasks;

    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => t.isDone === false);
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone === true);
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeIsDone={changeIsDone}
            />
        </div>
    );
}

export default App;

