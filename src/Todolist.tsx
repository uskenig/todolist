import React, {ChangeEvent, KeyboardEvent, ChangeEventHandler, useState} from 'react';
import {FilterValuesType} from './App';
import {Button} from "./Button";

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
}

export function Todolist(props: PropsType) {
    const [newTitle, setNewTitle] = useState("")

    /*const changeFilterAllHandler = () => {props.changeFilter("all")}
    const changeFilterAllHandler = () => {props.changeFilter("all")}
    const changeFilterAllHandler = () => {props.changeFilter("all")}*/
    const tsarFooHandler = (value: FilterValuesType) => {
        props.changeFilter(value)
    }

    const removeTaskHandler = (tID: string) => {
        props.removeTask(tID)
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value)
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            props.addTask(newTitle)
            setNewTitle("")
        }
    }

    const addTaskHandler = () => {
        props.addTask(newTitle);
        setNewTitle("")
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={newTitle} onKeyPress={onKeyPressHandler} onChange={onChangeHandler}/>
            <button onClick={addTaskHandler}>+</button>
        </div>
        <ul>
            {
                props.tasks.map(t => {
                        const f = removeTaskHandler
                        return (
                            <li key={t.id}>
                                <input type="checkbox" checked={t.isDone}/>
                                <span>{t.title}</span>
                                <button onClick={() => removeTaskHandler(t.id)}>x</button>
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
