import Tasks from "./Task";
import { useEffect, useState } from 'react';
import { PencilSquareIcon } from "@heroicons/react/24/solid";

const Tasklist = ({ currentTask, removeTask }) => {
    const [title, setTitle] = useState('')
    const [tasklistID, setTasklistID] = useState('')

    useEffect(() => { // quando currentTask atualizar executa o codigo
        if (currentTask !== null && currentTask !== undefined) {
            setTitle(currentTask.title)
            setTasklistID(currentTask._id)
        }else{
            setTitle('')
            setTasklistID('')
        }
    }, [currentTask])

    return (
        <div className="">
            <h1 className=" flex justify-between drop-shadow-lg font-bold text-[2rem] border-b-2  pt-10 p-2 border-indigo-900 text-indigo-950 capitalize"
            >
                {title}
                {/* <span>
                    <button><PencilSquareIcon className="w-6"/></button>
                </span> */}
            </h1>
            <section className="text-center mt-5">
                <Tasks 
                    tasklistID={tasklistID}
                    removeTask={removeTask}
                />
            </section>
        </div>
    )
}

export default Tasklist;