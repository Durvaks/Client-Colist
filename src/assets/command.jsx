export const Command = {
    serverMainURL: 'http://localhost:3333',//'http://18.230.184.131:3333'
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
                    if (data.status) {
                        resolve(data);
                    } else {
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
    register: async (user, password, name) => {
        let check = false
        await fetch(`${Command.serverMainURL}/user/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, user, password }),
        })
            .then(response => response.json())
            .then(data => check = data.status)
            .catch(err => console.log(err))
        return check;
    },
    getUserTaskLists: async () => {
        let tasklists = []
        const token = localStorage.getItem('token')

        await fetch(`${Command.serverMainURL}/tasklist/get-all-user-tasklist`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token }),
        })
            .then(response => response.json())
            .then(data => tasklists = data)
            .catch(err => console.log(err))
        return tasklists
    },
    getTasklist: async (tasklistID) => {
        if (tasklistID) {
            const token = localStorage.getItem('token');
            let tasks
            await fetch(`${Command.serverMainURL}/tasklist/show`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tasklistID, token }),
            })
                .then(response => response.json())
                .then(data => tasks = data)
                .catch(err => console.log(err))

            return tasks
        }
    },
    removeTasklist: async (tasklistID) => {
        // backend need == {token, tasklistID}
        let response = ''
        const token = localStorage.getItem('token');
        await fetch(`${Command.serverMainURL}/tasklist/delete`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tasklistID, token }),
        })
            .then(response => response.json())
            .then(data => response = data)
            .catch(err => console.log(err))
        return response;
    },
    createTasklist: async (title) => {
        // backend need == {title, token}
        let response = ''
        const token = localStorage.getItem('token');
        await fetch(`${Command.serverMainURL}/tasklist/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, token }),
        })
            .then(response => response.json())
            .then(data => response = data)
            .catch(err => console.log(err))
        return response;
    },
    renameTasklist: async (tasklistID, newTitle) => {
        //{ newTitle, tasklistID, token } backend request
        let response = ''
        const token = localStorage.getItem('token');
        await fetch(`${Command.serverMainURL}/tasklist/update-title`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ newTitle, tasklistID, token }),
        })
            .then(response => response.json())
            .then(data => response = data)
            .catch(err => console.log(err))
        return response;
    },
    getTasks: async (tasklistID) => {
        if (tasklistID) {
            const token = localStorage.getItem('token');
            let tasks
            await fetch(`${Command.serverMainURL}/task/show`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tasklistID, token }),
            })
                .then(response => response.json())
                .then(data => tasks = data)
                .catch(err => console.log(err))

            return tasks
        }
    },
    getTask: async (taskID) => {
        if (taskID) {
            const token = localStorage.getItem('token');
            await fetch(`${Command.serverMainURL}/task/show`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ taskID, token }),
            })
                .then(response => response.json())
                .then(data => tasks = data)
                .catch(err => console.log(err))

            return tasks
        }
    },
    setTask: async (tasklistID, text) => {
        // backend need == {tasklist, task, token}
        let tasks = ''
        const token = localStorage.getItem('token');
        await fetch(`${Command.serverMainURL}/task/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tasklist: tasklistID, task: text, token }),
        })
            .then(response => response.json())
            .then(data => tasks = data)
            .catch(err => console.log(err))
        return tasks
    },
    removeTask: async (tasklistID, taskID) => {
        // backend need == {tasklist, task, token}
        let tasks = ''
        const token = localStorage.getItem('token');
        await fetch(`${Command.serverMainURL}/task/delete`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tasklist: tasklistID, task: taskID, token }),
        })
            .then(response => response.json())
            .then(data => tasks = data)
            .catch(err => console.log(err))
        return tasks
    },
    changeStatus: async (tasklistID, taskID, newStatus) => {
        let tasks = ''
        const token = localStorage.getItem('token');
        await fetch(`${Command.serverMainURL}/task/update`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    token,
                    tasklist: tasklistID,
                    params: {
                        task: taskID,
                        alteration: { status: newStatus }
                    }
                }
            ),
        })
            .then(response => response.json())
            .then(data => tasks = data)
            .catch(err => console.log(err))
        return tasks
    }
}
