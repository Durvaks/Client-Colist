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
            <main className="">
                <h1>{title}</h1>
                <section>
                    <Tasks tasklistID={tasklistID}/>
                </section>
                <nav>
                    <NavTaskList/>
                </nav>
            </main>
    )
}

export default Tasklist;