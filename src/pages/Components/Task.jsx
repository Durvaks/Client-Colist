import { Command } from '../../assets/command';
import { useEffect, useState } from 'react';
import { Menu } from '@headlessui/react';
import { TrashIcon, Bars2Icon, CheckIcon } from '@heroicons/react/24/solid'

const Tasks = ({ tasklistID, removeTask }) => {
    const [tasks, setTasks] = useState([])
    const [taskSelected, setTaskSelected] = useState('')

    const getTasks = async () => {
        const tasks = await Command.getTasks(tasklistID);
        setTasks(tasks);
    }

    const selectTask = (task) => {
        if (taskSelected._id === task._id) {
            setTaskSelected('')
        } else {
            setTaskSelected(task);
        }
    }

    const renderTask = () => {
        return tasks.map((task) => {
            return (
                <li className={`${taskSelected._id === task._id ? ' border border-yellow-500' : ''} bg-slate-600 bg-opacity-70 text-white mb-2 min-h-[35px]  capitalize flex justify-between pt-1 pb-2 rounded`}
                    key={task._id}
                >
                    <span className='pl-4 text-left w-full'
                        onClick={() => { selectTask(task) }}
                    >
                        {task.task}
                    </span>
                    {(() => {
                        if (taskSelected._id === task._id) {
                            return (
                                <div className='relative'>
                                    <Menu>
                                        <Menu.Button className='rounded w-8 min-w-[2rem] h-6 mr-2 bg-slate-950 bg-opacity-80 flex justify-center pt-1' >
                                            <Bars2Icon className='w-4 font-bold text-white' />
                                        </Menu.Button>
                                        <Menu.Items className='absolute w-40 -left-40 top-0 text-left bg-opacity-90 bg-slate-800 rounded p-1'>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <button className='rounded w-full min-w-[2.5rem] text-green-500 flex pt-1 pl-2'
                                                        onClick={() => { alert('em desenvolvimento') }}
                                                    >
                                                        <span className='flex gap-2'><CheckIcon className='w-4 text-green-500'/>status</span>
                                                    </button>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <button className='rounded w-full min-w-[2.5rem] text-amber-500 flex pt-1 pl-2'
                                                        onClick={() => { removeTask(task._id) }}
                                                    >
                                                        <span className='flex gap-2'><TrashIcon className='w-4 text-red-500'/>Remove</span>
                                                    </button>
                                                )}
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Menu>
                                </div>
                            )
                        }
                    })()}
                </li>
            )
        })
    }

    useEffect(() => {
        if (tasklistID !== undefined) {
            if (tasklistID.length !== 0) {
                getTasks();
            }
        }
    }, [tasklistID])

    useEffect(() => {
        renderTask();
    }, [tasks])

    return (
        <ul className=' max-h-[57vh] overflow-y-scroll scroll-pl-2 pb-12'>
            {renderTask()}
        </ul>
    )
}

export default Tasks