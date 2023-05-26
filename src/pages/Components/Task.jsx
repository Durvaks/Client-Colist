import { Command } from '../../assets/command';
import { useEffect, useState } from 'react';

const Tasks = ({ tasklistID }) => {
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        if (!tasklistID.length == 0) {
            getTasks();
        }
    }, [tasklistID])

    const getTasks = async () => {
        const tasks = await Command.getTasks(tasklistID);
        setTasks(tasks);
    }

    useEffect(() => {
        renderTask();
    }, [tasks])

    const renderTask = () => {
        return tasks.map((task) => {
            return (
                <li key={task._id}>{task.task}</li>
            )
        })
    }

    return (
        <ul>
            {renderTask()}
        </ul>
    )
}

export default Tasks