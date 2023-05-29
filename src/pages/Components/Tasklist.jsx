import Tasks from "./Task";
import NavTaskList from "./FormNewTask";
import { useEffect, useState } from 'react';

const Tasklist = ({ currentTask, switchTasklist }) => {
    const [title, setTitle] = useState([]);
    const [tasklistID, setTasklistID] = useState([]);

    useEffect(()=>{ // quando currentTask atualizar executa o codigo
        if(currentTask !== null){
        setTitle(currentTask.title);
        setTasklistID(currentTask._id);
        }
    }, [currentTask])

    return (
            <>
                <h1 className=" text-center font-bold mt-10 text-xl p-2 bg-slate-950 text-white capitalize">{title}</h1>
                <section className="text-center mt-5 h-[53vh]">
                    <Tasks tasklistID={tasklistID}/>
                </section>
            </>
    )
}

export default Tasklist;