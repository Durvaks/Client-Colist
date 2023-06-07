import { Menu, Dialog } from "@headlessui/react";
import { useEffect, useState } from "react";
import { ChevronUpIcon } from '@heroicons/react/24/solid'

const Navgator = (props) => {
    const [tasklists, setTasklists] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [titleForNewList, setTitleForNewList] = useState('New List')

    const menuData = () => {
        if (props.userTasklists.length > 0 && props.userTasklists[0] !== 'start') {
            const tasklistElements = props.userTasklists.map((tasklist, index) => {
                if (tasklist == null) {
                    return
                }
                return (
                    <Menu.Item key={tasklist._id}>
                        {({ active }) => (
                            <a
                                className={`${active && 'bg-blue-500 rounded pl-1 cursor-pointer'} truncate`}
                                onClick={() => { props.switchTasklist(index) }}
                            >
                                {tasklist.title}
                            </a>
                        )}
                    </Menu.Item>
                )
            })
            setTasklists(tasklistElements)
        }
    }
    const btnCreateNewList = ()=>{
        props.createTasklist(titleForNewList)
        setIsOpen(false)
    }

    useEffect(() => {
        menuData();
    }, [])
    useEffect(() => {
        menuData();
    }, [props.userTasklists])

    return (
        <nav className="m-2 flex gap-2">
            <Menu>
                <div>
                    <Menu.Items className='relative top-0'>
                        <div className="absolute bottom-1 w-44 bg-opacity-90 bg-slate-800 rounded flex flex-col p-1 pl-2 text-white capitalize gap-1">
                            {tasklists}
                        </div>
                    </Menu.Items>
                    <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-50 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                        My Lists
                        <ChevronUpIcon
                            className="ml-2 -mr-1 h-5 w-5 text-white hover:text-violet-100"
                            aria-hidden="true"
                        />
                    </Menu.Button>
                </div>
            </Menu>
            <Menu>
                <div>
                    
                    <Menu.Items className='relative top-0'>
                        <div className="absolute bottom-1 w-44 bg-opacity-90 bg-slate-800 rounded flex flex-col p-1 text-white capitalize gap-1">
                            <Menu.Item>
                                {({ active }) => (
                                    <a
                                        className={`${active && 'bg-blue-500'}`}
                                        onClick={() => { props.removeTasklist() }}
                                    >
                                        Excluir Lista
                                    </a>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                    <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-50 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                        Options
                        <ChevronUpIcon
                            className="ml-2 -mr-1 h-5 w-5 text-black hover:text-violet-100"
                            aria-hidden="true"
                        />
                    </Menu.Button>
                </div>
            </Menu>
            <div>
                <Dialog className="fixed bottom-[25%] left-[0] w-full border-2 border-indigo-500 bg-indigo-600 bg-opacity-90 rounded flex flex-col p-1 text-white capitalize gap-1"
                    open={isOpen}
                    onClose={() =>
                        setIsOpen(false)}
                >
                    <Dialog.Panel >
                        <div className="flex flex-col gap-2">
                            <Dialog.Title>Create New List</Dialog.Title>
                            <div className="flex">
                                <label htmlFor="title">Title</label>
                                <input className="ml-3 w-full text-black" 
                                    type="text" 
                                    name="title" 
                                    id="title"
                                    onChange={(event)=>{setTitleForNewList(event.target.value)}}
                                />
                            </div>
                            <div className="flex flex-row-reverse">
                                <button className="rounded bg-emerald-800 p-1 pl-2 pr-2"
                                    onClick={btnCreateNewList}
                                >
                                    Create
                                </button>
                            </div>
                        </div>
                    </Dialog.Panel>
                </Dialog>
                <button className="inline-flex w-full justify-center rounded-md bg-green-700 bg-opacity-80 px-4 py-2 text-sm font-bold text-black hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                    onClick={()=>{setIsOpen(true)}}
                >
                    create new List
                </button>
            </div>

            {/* <Menu>
                <div>
                    <Menu.Items className="relative top-0">
                        <div className="fixed top-[50%] left-[0] w-full border-2 border-indigo-500 bg-indigo-600 bg-opacity-90 rounded flex flex-col p-1 text-white capitalize gap-1">
                            <Menu.Item 
                                open={true}
                                onClick={() => 
                                setIsOpen(false)}
                            >
                                {({ active }) => (
                                    <div className="flex flex-col gap-2">
                                        <h1>Create New List</h1>
                                        <div className="flex">
                                            <label htmlFor="title">Title</label>
                                            <input className="ml-3 w-full" type="text" name="title" id="title" />
                                        </div>
                                        <div className="flex flex-row-reverse">
                                            <button className="rounded bg-emerald-800 p-1 pl-2 pr-2">Create</button>
                                        </div>
                                    </div>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                    <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                        New List
                    </Menu.Button>
                </div>
            </Menu> */}
        </nav>
    )
}
export default Navgator;