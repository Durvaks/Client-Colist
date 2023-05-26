import Tasks from "./Task";
import NavTaskList from "./NavTaskList";
import { useEffect, useState } from 'react';

const Tasklist = ({ currentTask }) => {
    const [title, setTitle] = useState([]);
    const [tasklistID, setTasklistID] = useState([]);

    useEffect(()=>{ // quando currentTask atualizar executa o codigo
        if(currentTask !== null){
        setTitle(currentTask.title);
        setTasklistID(currentTask._id);
        }
    }, [currentTask])

    return (
            <main className=" max-w-4xl m-auto">
                <h1 className=" text-center font-bold mt-10 text-xl p-2 bg-slate-950 text-white capitalize">{title}</h1>
                <section className="text-center mt-5">
                    <Tasks tasklistID={tasklistID}/>
                </section>
                <nav>
                    <NavTaskList/>
                </nav>
            </main>
    )
}

export default Tasklist;