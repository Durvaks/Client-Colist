import Tasks from "./Task";
import { useEffect, useState } from 'react';

const Tasklist = ({ currentTask, removeTask }) => {
    const [title, setTitle] = useState('')
    const [tasklistID, setTasklistID] = useState('')

    useEffect(() => { // quando currentTask atualizar executa o codigo
        if (currentTask !== null) {
            setTitle(currentTask.title)
            setTasklistID(currentTask._id)
        }else{
            setTitle('')
            setTasklistID('')
        }
    }, [currentTask])

    return (
        <div className="h-[88vh]">
            <h1 className=" text-center font-bold mt-10 text-xl p-2 border-t-2 border-gray-600 text-white capitalize">{title}</h1>
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