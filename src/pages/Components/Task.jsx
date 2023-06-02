import { Command } from '../../assets/command';
import { useEffect, useState } from 'react';
import { TrashIcon } from '@heroicons/react/24/solid'

const Tasks = ({ tasklistID, removeTask }) => {
    const [tasks, setTasks] = useState([])

    const getTasks = async () => {
        const tasks = await Command.getTasks(tasklistID);
        setTasks(tasks);
    }

    const renderTask = () => {
        return tasks.map((task) => {
            return (
                <li className='mb-2 min-h-[35px] bg-slate-600 text-white capitalize flex justify-between pt-1 pb-2 rounded'
                    key={task._id}
                >
                    <span className='pl-4 text-left'
                    >
                        {task.task}
                    </span>
                    <button className='rounded w-10 min-w-[2.5rem] h-6 m-1 bg-slate-400 text-red-700 flex justify-center pt-1'
                            onClick={()=>{removeTask(task._id)}}
                    >
                        <TrashIcon className=' w-4' />
                    </button>
                </li>
            )
        })
    }

    useEffect(() => {
        if(tasklistID !== undefined){
            if (tasklistID.length !== 0) {
                getTasks();
            }
        }
    }, [tasklistID])

    useEffect(() => {
        renderTask();
    }, [tasks])

    return (
        <ul className=' max-h-[57vh] overflow-y-scroll scroll-pl-2'>
            {renderTask()}
        </ul>
    )
}

export default Tasks