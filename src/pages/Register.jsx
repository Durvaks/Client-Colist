const Register = ({ onLogout }) => {
    const handleLogoutClick = () => {
        onLogout();
    };
    return (
        <>
            <button onClick={handleLogoutClick}>Deslogar</button>
        </>
    );
};

export default Main;
