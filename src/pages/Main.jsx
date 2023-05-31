import Tasklist from './Components/Tasklist'
import FormNewTask from './Components/FormNewTask';
import Navgator from './Components/Navgator';
import { useState, useEffect } from 'react';
import { Command } from '../assets/command';

const Main = ({ onLogout, username }) => {

    const [userTasklists, setUserTasklists] = useState({});
    const [currentTask, setCurrentTask] = useState(null);

    const getTasklists = async () => {
        Command.getUserTaskLists()
            .then((tasklists) => {
                setUserTasklists(tasklists);
            })
            .catch((err) => {
                console.error
            })
    };

    const changeUserTasklist = (index) => { //<-- chatgpt verificar esta função
        if (userTasklists[index]?._id === currentTask?._id) {
            setCurrentTask(null);
        } else if (userTasklists.length > 0) {
            setCurrentTask(userTasklists[index || 0]);
        }
    }
    const setTask = async (text) => {
        Command.setTask(currentTask._id, text)
            .then(async (response) => {
                if (response.response) {
                    await getTasklists();
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
                    await getTasklists();
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getTasklists()
    }, []);

    useEffect(() => {
        if (currentTask == null) {
            changeUserTasklist(0);
        }
    }, [currentTask])

    useEffect(() => {
        changeUserTasklist(0)
        // if(userTasklists.length > 0){
        //     userTasklists.forEach((element, index) => {
        //         if(element.current){
        //             changeUserTasklist(index)
        //         }
        //     })
        // }
    }, [userTasklists]);

    return (
        <div className=' min-w-[500px] bg-gradient-to-b from-sky-500 to-indigo-500'>
            <nav className=" flex bg-slate-600 justify-end h-8 text-white">
                <span className="mr-4">{username}</span>
                <button className="mr-5 m-1 pl-2 pr-2 rounded bg-red-950" onClick={onLogout}> Sair </button>
            </nav>
            <header className=' h-28 flex justify-center'>
                <h1 className='self-center font-bold text-7xl text-slate-900 drop-shadow-lg'>CoList</h1>
            </header>
            <main className=" max-w-4xl m-auto ">
                <Tasklist
                    currentTask={currentTask}
                    removeTask={removeTask}
                />
                <div className=''>
                    <Navgator
                        switchTasklist={changeUserTasklist}
                        userTasklists={userTasklists}
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
