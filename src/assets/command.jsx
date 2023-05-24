export const Command = {
    serverMainURL: "http://localhost:3333",
    checkUser: async () => {
        return new Promise((resolve, reject) => {            
            const token = localStorage.getItem('token');
            console.log(token);
            fetch(`${Command.serverMainURL}/user/check`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token })
            })
                .then(response => response.json())
                .then((data) => {
                    resolve(data);
                })
                .catch((err) => {
                    console.log(err)
                    reject(err)
                })
        })
    },
    login: async (user, password) => {
        await fetch(`${Command.serverMainURL}/user/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user, password }),
        })
            .then(response => response.json())
            .then((data) => {
                if (data.send) {
                    localStorage.setItem('token', data.token)
                    console.log('login bem sucedido');
                } else {
                    console.log('login não foi efetuado')
                }
            })
            .catch(err => console.log(err))
    },
    logout: () => {
        try{
            localStorage.setItem('token', 'efetuar login');
            return true;
        }catch(err){
            console.log(err);
            return false;
        }
    }
}