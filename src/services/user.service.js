import { storageService } from "./async-storage.service"

const USERS_KEY = 'usersDB'

export const userService = {
    getUsers,
    getUser,
    saveUser,
    getEmptyUser
}

async function getUsers() {
    return await storageService.query(USERS_KEY)
}

function getUser() {
    return {
        name: "Puki Ben David",
        balance: 100,
        transactions: []
    }
}

async function saveUser(user) {
    return user._id ? await storageService.put(USERS_KEY, user) : await storageService.post(USERS_KEY, user)
}



function getEmptyUser(name) {
    return {
        name,
        balance: 100,
        transactions: []
    }
}