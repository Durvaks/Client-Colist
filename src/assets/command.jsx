export const Command = {
    serverMainURL: "http://localhost:3333",
    checkUser: async () => {
        return new Promise((resolve, reject) => {
            const token = localStorage.getItem('token');
            fetch(`${Command.serverMainURL}/user/check`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token })
            })
                .then(response => response.json())
                .then((data) => {
                    if(data.status){
                        resolve(data);
                    }else{
                        reject(data);
                    }                    
                })
                .catch((err) => {
                    reject(err)
                })
        })
    },
    login: async (user, password) => {
        let check = false;
        await fetch(`${Command.serverMainURL}/user/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user, password }),
        })
            .then(response => response.json())
            .then((data) => {
                if (data.send) {
                    localStorage.setItem('token', data.token)
                    check = true;
                }
            })
            .catch(err => console.log(err))
        return check;
    },
    logout: () => {
        try {
            localStorage.setItem('token', '');
            return true;
        } catch (err) {
            return false;
        }
    },
    register: async (user, password) => {
        let check = false
        await fetch(`${Command.serverMainURL}/user/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'New user', user, password }),
        })
            .then(response => response.json())
            .then(data => check = data.status)
            .catch(err => console.log(err))
        return check;
    },
    getUserTaskLists: async ()=>{
        let tasklist = []
        const token = localStorage.getItem('token')
        await fetch(`${Command.serverMainURL}/tasklist/user-show-all`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({token}),
        })
            .then(response => response.json())
            .then(data => tasklist = data)
            .catch(err => console.log(err))
        return tasklist;
    }
}