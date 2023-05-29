import Tasklist from './Components/Tasklist'
import FormNewTask from './Components/FormNewTask';
import Navgator from './Components/Navgator';
import { useState, useEffect } from 'react';
import { Command } from '../assets/command';

const Main = ({ onLogout, username }) => {

    const [userTasklists, setUserTasklists] = useState({});
    const [currentTask, setCurrentTask] = useState(null);

    useEffect(() => {
        const getTasklists = async () => {
            Command.getUserTaskLists()
                .then((tasklists) => {
                    setUserTasklists(tasklists);
                })
                .catch((err) => {
                    console.error
                })
        };
        getTasklists()
    }, []);

    useEffect(() => {
        changeUserTasklist(1); // não esquecer de alterar aqui
    }, [userTasklists]);

    const changeUserTasklist = (index) => {
        if (userTasklists.length > 0) {
            setCurrentTask(userTasklists[index || 0]);
        }
    }

    return (
        <div>
            <nav className=" flex bg-slate-600 justify-end h-8">
                <span className="mr-4">{username}</span>
                <button className="mr-5 h-3" onClick={onLogout}> Sair </button>
            </nav>
            <header className=' h-28 flex justify-center'>
                <h1 className='self-center font-bold text-7xl'>CoList</h1>
            </header>
            <main className=" max-w-4xl m-auto">
                <Tasklist
                    currentTask={currentTask}
                />
                <Navgator
                    switchTasklist={changeUserTasklist}
                />
                <FormNewTask/>
            </main>
        </div>
    );
};

export default Main;
