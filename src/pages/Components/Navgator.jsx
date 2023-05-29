const Navgator = ()=>{
    return(
        <nav className="m-2 flex justify-around">            
            <button className=" bg-slate-500 rounded-sm pl-3 pr-3 text-white border-l">
                My Lists
            </button>
            <button className=" bg-slate-500 rounded-sm pl-3 pr-3 text-white border-l">
                Shared
            </button>
            <button className=" bg-slate-500 rounded-sm pl-3 pr-3 text-white border-l">
                Options
            </button>
        </nav>
    )
}
export default Navgator;