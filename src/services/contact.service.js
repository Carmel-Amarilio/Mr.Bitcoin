import { contactBackService } from "./contactService"

const contact = {
    _id: "I6ebsuqLXN",
    name: "Doris Aubut",
    email: "LSjaardema@tortor.gov",
    phone: "(774)563-9173"
}

export const contactService = {
  query,
  getById,
  remove,
  save,
  getEmptyContact
}

async function query(filter = null){
    return await contactBackService.getContacts(filter)
}

async function getById(constId){
    return await contactBackService.getContactById(constId)
} 

async function remove(constId){
    return await contactBackService.deleteContact(constId)
} 

async function save(contact){
    return await contactBackService.saveContact(contact)
}

function getEmptyContact() {
    return {
        name: '',
        email: '',
        phone: ''
    }
}

