import { useState } from "react"
import { PencilSquareIcon } from "@heroicons/react/24/solid";


const FormNewTask = (props) => {
    const [text, setText] = useState('');

    const handleClickButton = ()=>{
        props.setTask(text);
        setText('');
    }

    return (
        <div className="relative bottom-0">
            <textarea
                name=""
                id=""
                rows="4"
                className=" w-3/4 ml-2 border-2 border-slate-500 bg-slate-300 rounded-sm"
                value={text}
                onChange={(event)=>{setText(event.target.value)}}
            >
            </textarea>
            <button
                className=" bg-slate-500 w-1/5 float-right mr-2 text-white rounded-sm h-[100px] flex justify-center items-center"
                onClick={handleClickButton}
            >
                <PencilSquareIcon className="w-8"/>
            </button>
        </div>
    )
}
export default FormNewTask