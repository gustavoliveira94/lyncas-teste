const INITIAL_STATE = {
    loading: true,
    user: [],
    status: false
}

export const getUser = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'GET_USER_BEGIN':
            return {
                ...state,
                error: null,
                loading: true
            }
        case 'GET_USER_SUCCESS':
            return {
                ...state,
                user: action.payload,
                loading: false

            }
        case 'GET_USER_FAILURE':
            return {
                ...state,
                user: [],
                error: action.payload,
                loading: false
            }
        case 'GET_USER_UPDATE':
            return {
                ...state,
                status: action.payload
            }
        default:
            return state
    }
}