

const Main = ({ onLogout }) => {
    const handleLogoutClick = () => {
        onLogout();
    };
    return (
        <>
            <button onClick={handleLogoutClick}>Deslogar</button>
            <div className=" bg-black w-10 h-10">x</div>


        </>
    );
};

export default Main;
