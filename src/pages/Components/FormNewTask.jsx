const FormNewTask = () => {
    return (
        <form className="relative bottom-0">
            <textarea
                name=""
                id=""
                rows="4"
                className=" w-3/4 ml-2 border-2 border-slate-500 bg-slate-300 rounded-sm"
            >
            </textarea>
            <button
                className=" bg-slate-500 w-1/5 float-right mr-2 text-white rounded-sm h-[100px]"
            >
                Adicionar
            </button>
        </form>
    )
}
export default FormNewTask