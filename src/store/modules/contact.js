import { contactService } from "@/services/contact.service"

export default {
    state() {
        return {
            contacts: [],
        }
    },
    mutations: {
        setContact(state, { contacts }) {
            state.contacts = contacts
        },
        removeContact(state, { contactId }){
            const idx = state.contacts.findIndex(contact => contact._id === contactId)
            state.contacts.splice(idx, 1)
        },
        addContact(state, { contact }){
            state.contacts.push(contact)
        },
        updateContact(state, { contact }) {
            const idx = state.contacts.findIndex(c => c._id === contact._id)
            state.contacts.splice(idx, 1, contact)
        }

    },
    actions: {
        async loadContact({ commit }, { filter }) {
            try {
                const contacts = await contactService.query(filter)
                commit({ type: 'setContact', contacts })

            } catch (error) {
                console.log(error);
            }
        },

        async removeContact({ commit }, { contactId }) {
            try {
                await contactService.remove(contactId);
                commit({ type: 'removeContact', contactId})
            } catch (error) {
                console.log(error);
            }

        },

        async saveContact({ commit }, { newContact }){
            try {
               const contact=  await contactService.save(newContact);
               newContact._id ? commit({ type: 'updateContact', contact }) : commit({ type: 'addContact', contact })
            } catch (error) {
                console.log(error);
            }
        }

    },
    getters: {
        contacts(state) { return state.contacts },
    }
}