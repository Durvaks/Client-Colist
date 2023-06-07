import Tasks from "./Task";
import { useEffect, useState } from 'react';
import { PencilIcon } from "@heroicons/react/24/solid";

const Tasklist = ({ currentTask, removeTask, renameTasklist }) => {
    const [title, setTitle] = useState('')
    const [tasklistID, setTasklistID] = useState('')
    const [renamer, setRenamer] = useState(false)

    const titleCommand = ()=>{        
        if(renamer){
            return <input type="text" 
            className="w-full mr-20 bg-opacity-20 bg-indigo-400 border border-indigo-800 rounded"
            value={title}
            onChange={(ev)=>{setTitle(ev.target.value)}}
            />
        }else{
            return <p>{title}</p>
        }
    }
    const titleCommandActiveButton = async (ev)=>{
        if(renamer){
            await renameTasklist(title);
            setRenamer(false)
        }else{
            setRenamer(true)
        }
        
    }

    useEffect(() => {
        if (currentTask !== null && currentTask !== undefined) {
            setTitle(currentTask.title)
            if(currentTask._id === tasklistID){
                setTasklistID('')                
            }else{
                setTasklistID(currentTask._id)
            }
        }else{
            setTitle('')
            setTasklistID('')
        }
    }, [currentTask])

    useEffect(()=>{
        if(tasklistID === ''){
            setTasklistID(currentTask?._id)
        }        
    },[tasklistID])

    return (
        <div className="h-[65%]">
            <h1 className=" flex justify-between drop-shadow-lg font-bold text-[2rem] border-b-2  pt-10 p-2 border-indigo-900 text-indigo-950 capitalize">
                {titleCommand()}
                <span>
                    <button
                        onClick={titleCommandActiveButton}
                    ><PencilIcon className={`${renamer? " text-white": ""} w-6`}/>
                    </button>
                </span>
            </h1>
            <section className="text-center mt-5 h-full">
                <Tasks 
                    tasklistID={tasklistID}
                    removeTask={removeTask}
                />
            </section>
        </div>
    )
}

export default Tasklist;