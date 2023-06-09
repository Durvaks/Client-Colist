import Tasklist from './Components/Tasklist'
import FormNewTask from './Components/FormNewTask';
import Navgator from './Components/Navgator';
import { useState, useEffect } from 'react';
import { Command } from '../assets/command';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid';

const Main = ({ onLogout, username }) => {

    const [userTasklists, setUserTasklists] = useState(['start']);
    const [currentTask, setCurrentTask] = useState(null);

    const getTasklists = async () => {
        Command.getUserTaskLists()
            .then((tasklists) => {
                setUserTasklists(tasklists)
            })
            .catch((err) => {
                console.error
            })
    }
    const changeUserTasklist = (index) => {
        if (userTasklists[index]?._id === currentTask?._id) {
            setCurrentTask(null);
            setCurrentTask(userTasklists[index || 0]);
        } else if (userTasklists.length > 0) {
            setCurrentTask(userTasklists[index || 0])
        }
    }
    const setTask = async (text) => {
        Command.setTask(currentTask._id, text)
            .then(async (response) => {
                if (response.response) {
                    await getTasklists()
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const removeTask = async (taskID) => {
        Command.removeTask(currentTask._id, taskID)
            .then(async (response) => {
                if (response.response) {
                    console.log(response)
                    await getTasklists();
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const removeTasklist = async () => {
        Command.removeTasklist(currentTask._id)
            .then(async (response) => {
                console.log(response)
                await getTasklists()

            })
            .catch((err) => {
                console.log(err)
            })
    }
    const createTasklist = async (title) => {
        Command.createTasklist(title)
            .then(async (response) => {
                await getTasklists()
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const renameTasklist = async (newTitle)=>{
        await Command.renameTasklist(currentTask._id, newTitle)
        .then(async ()=>{
            await getTasklists();
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    


    useEffect(() => {
        getTasklists()
    }, []);

    useEffect(() => {
        if(userTasklists[0] !== 'start'){
            if (userTasklists.length) {
                changeUserTasklist(userTasklists.length - 1)
            }else{    
                createTasklist('List');
                changeUserTasklist(0);
            }
        }
    }, [userTasklists]);

    return (
        <div className='h-screen min-h-screen min-w-[400px] bg-gradient-to-b from-teal-600 to-violet-900'>
            <nav className="flex bg-sky-950 justify-between h-8 text-white w-full">
                <span className="mr-4 text-emerald-300 drop-shadow-lg font-bold ml-4 p-1">Colist</span>
                <div className=' flex'>
                    <span className="mr-4 " >{username}</span>
                    <button className="mr-4 m-1  w-5 h-full mt-0" onClick={onLogout}>
                        <ArrowRightOnRectangleIcon className=''/>
                    </button>
                </div>
            </nav>
            <main className=" max-w-4xl m-auto h-[95vh] relative w-full">
                <Tasklist
                    currentTask={currentTask}
                    removeTask={removeTask}
                    renameTasklist={renameTasklist}
                />
                <div className='absolute w-full bottom-0'>
                    <Navgator
                        switchTasklist={changeUserTasklist}
                        userTasklists={userTasklists}
                        removeTasklist={removeTasklist}
                        createTasklist={createTasklist}
                    />
                    <FormNewTask
                        setTask={setTask}
                    />
                </div>
            </main>
        </div>
    );
};

export default Main;
