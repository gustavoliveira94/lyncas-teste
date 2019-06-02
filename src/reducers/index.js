import { combineReducers } from 'redux'
import { getUser, registerUser } from './user'
import { registerContact, getContact } from './contact'

export const reducers = ({
    getUser,
    getContact
})