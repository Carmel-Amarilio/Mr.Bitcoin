import { userService } from "@/services/user.service"

export default {
    state() {
        return {
            users: [],
            loggedInUser: null
        }
    },
    mutations: {
        setUsers(state, { users }) {
            state.users = users
        },
        setLoggedInUser(state, { user }) {
            state.loggedInUser = user
        },
        updateLoggedInUser(state, { transaction }) {
            state.loggedInUser.transactions.unshift(transaction);
            state.loggedInUser.balance -= transaction.amount;
        },
        logOut(state) {
            state.loggedInUser = null
        },

    },
    actions: {
        async loadUsers({ commit }) {
            try {
                const users = await userService.getUsers()
                commit({ type: 'setUsers', users })

            } catch (error) {
                console.log(error);
            }
        },

        async logIn({ state, commit }, { name }) {
            try {
                let user = state.users.find(user => user.name === name)
                if (!user) {
                    user = userService.getEmptyUser(name)
                    user = await userService.saveUser(user)
                }
                commit({ type: 'setLoggedInUser', user })
            } catch (error) {
                console.log(error);
            }
        },

        async transfer({ state, commit }, { transaction }) {
            try {
                commit({ type: 'updateLoggedInUser', transaction })
                await userService.saveUser(state.loggedInUser)
            } catch (error) {
                console.error('Error during transfer:', error);
            }
        },

        logOut({ commit }) {
            commit({ type: 'logOut' })
        }

    },
    getters: {
        loggedInUser(state) { return state.loggedInUser },
    }
}