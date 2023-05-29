import { useState, useEffect } from "react";
import { Command } from "../assets/command";

const useSwitchTasklist = (initialValue) => {
    const [tasklist, setTasklist] = useState(initialValue);

    useEffect(() => {
        console.log(tasklist)
    }, [tasklist])

    const updateTasklist = (tasklistID) => {
        Command.getTasklist(tasklistID)
        .then((tasklist)=>{
            Command.getTasks()
            setTasklist(tasklist)
        })        
    };
    return [tasklist, updateTasklist];
}

export default useSwitchTasklist;