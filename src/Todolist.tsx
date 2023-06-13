import React, {ChangeEvent, KeyboardEvent, ChangeEventHandler, useState} from 'react';
import {FilterValuesType} from './App';
import {Button} from "./Button";
import style from './Todolist.module.css'
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (newTitle: string) => void
    changeIsDone: (id: string, newIsDone: boolean) => void
}

export function Todolist(props: PropsType) {
    const [error, setError] = useState<string | null>("")
    let [newTitle, setNewTitle] = useState("")

    const addTaskHandler = () => {
        if (newTitle.trim()){
            props.addTask(newTitle.trim());
            setNewTitle("")
        }
        else {
            "Title is required"
        }
    }

    const tsarFooHandler = (value: FilterValuesType) => {
        props.changeFilter(value)
    }

    const removeTaskHandler = (tID: string) => {
        props.removeTask(tID)
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setError("")
        setNewTitle(event.currentTarget.value)
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            props.addTask(newTitle)
            setNewTitle("")
        }
    }


    return <div>
        <h3>{props.title}</h3>
        <div>
            <input
                //className={error}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />
            <button onClick={addTaskHandler}>+</button>
            {error && <div></div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {
                        //const f = removeTaskHandler

                        const changeIsDoneHandler = (event: ChangeEvent<HTMLInputElement>) => {
                            props.changeIsDone(t.id, event.currentTarget.checked)
                        }
                        return (
                            <li key={t.id}>
                                <input type="checkbox" checked={t.isDone} onChange={changeIsDoneHandler}/>
                                <span>{t.title}</span>
                                <Button name={"x"} callBack={() => removeTaskHandler(t.id)}/>
                            </li>
                        )
                    }
                )
            }
        </ul>
        <div>
            <button onClick={() => tsarFooHandler("all")}>All</button>
            <button onClick={() => tsarFooHandler("active")}>Active</button>
            <button onClick={() => tsarFooHandler("completed")}>Completed</button>
        </div>
    </div>
}
