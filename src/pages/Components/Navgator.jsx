import { Menu } from "@headlessui/react";
import { useEffect, useState } from "react";
import { ChevronUpIcon } from '@heroicons/react/24/solid'

const Navgator = ({ userTasklists, switchTasklist }) => {
    const [tasklists, setTasklists] = useState([])

    const menuData = () => {
        if (userTasklists.length > 0) {
            const tasklistElements = userTasklists.map((tasklist, index) => {
                return (
                    <Menu.Item key={tasklist._id}>
                        {({ active }) => (
                            <a
                                className={`${active && 'bg-blue-500 rounded pl-1 cursor-pointer'}`}
                                onClick={() => { switchTasklist(index) }}
                            >
                                {tasklist.title.substring(0, 20)+"..."}
                            </a>
                        )}
                    </Menu.Item>
                )
            })
            setTasklists(tasklistElements)
        }
    }

    useEffect(() => {
        menuData();
    }, [])

    useEffect(() => {
        menuData();
    }, [userTasklists])

    return (
        <nav className="m-2 flex gap-2">
            <Menu>
                <div>
                    <Menu.Items className='relative top-0'>
                        <div className="absolute bottom-1 w-44 bg-slate-600 rounded flex flex-col p-1 text-white capitalize gap-1">
                            {tasklists}
                        </div>
                    </Menu.Items>
                    <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-black hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                        My Lists
                        <ChevronUpIcon
                            className="ml-2 -mr-1 h-5 w-5 text-black hover:text-violet-100"
                            aria-hidden="true"
                        />
                    </Menu.Button>
                </div>
            </Menu>
        </nav>
    )
}
export default Navgator;