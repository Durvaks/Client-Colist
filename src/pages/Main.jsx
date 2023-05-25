import Tasklist from './Components/Tasklist'
import { useState } from 'react';
import { Command } from '../assets/command';

const Main = ({ onLogout, username }) => {
    const handleLogoutClick = () => {
        onLogout();
    };

    const [currentTaskList, setcurrentTaskList] = useState([]);
    const getTasklist = async ()=>{
        Command.getUserTaskLists()
        .then((tasklists)=>{
            setcurrentTaskList(tasklists[0])
        })
    }
    getTasklist();

    return (
        <div>
            <nav className=" flex bg-slate-600 justify-end h-8">
                <span className="mr-4">{username}</span>
                <button className="mr-5 h-3" onClick={handleLogoutClick}> Sair </button>
            </nav>
            <header className=' h-28 flex justify-center'>
                <h1 className='self-center font-bold text-7xl'>CoList</h1>
            </header>
            <Tasklist onViewTaskList={currentTaskList}/>
        </div>
    );
};

export default Main;
