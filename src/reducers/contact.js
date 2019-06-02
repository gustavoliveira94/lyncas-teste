const INITIAL_STATE = {
    loading: true,
    contact: []
}

export const getContact = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'GET_CONTACT_BEGIN':
            return {
                ...state,
                error: null,
                loading: true
            }
        case 'GET_CONTACT_SUCCESS':
            return {
                ...state,
                contact: action.payload,
                loading: false
            }
        case 'GET_CONTACT_FAILURE':
            return {
                ...state,
                contact: [],
                error: action.payload,
                loading: false
            }
        default:
            return state
    }
}