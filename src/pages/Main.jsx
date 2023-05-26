import Tasklist from './Components/Tasklist'
import { useState, useEffect } from 'react';
import { Command } from '../assets/command';

const Main = ({ onLogout, username }) => {

    const [userTasklists, setUserTasklists] = useState([]);
    const [currentTask, setCurrentTask] = useState(null);

    useEffect(() => {
        getTasklists()
    }, []);

    const getTasklists = async () => {
        Command.getUserTaskLists()
            .then((tasklists) => {
                setUserTasklists(tasklists);
            })
    };

    useEffect(() => {
        changeUserTasklist(1); // não esquecer de alterar aqui
    }, [userTasklists]);

    const changeUserTasklist = (index) => {
        if (userTasklists.length > 0) {
            setCurrentTask(userTasklists[index || 0]);
        }
    }

    const handleLogoutClick = () => {
        onLogout();
    };

    return (
        <div>
            <nav className=" flex bg-slate-600 justify-end h-8">
                <span className="mr-4">{username}</span>
                <button className="mr-5 h-3" onClick={handleLogoutClick}> Sair </button>
            </nav>
            <header className=' h-28 flex justify-center'>
                <h1 className='self-center font-bold text-7xl'>CoList</h1>
            </header>
            <Tasklist currentTask={currentTask} />

        </div>
    );
};

export default Main;
