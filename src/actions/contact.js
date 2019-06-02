import { Alert } from 'react-native'
import firebase from "react-native-firebase"
import { NavigationActions } from "react-navigation"

export const setDataUpdate = () => {
    return {
        type: 'GET_USER_UPDATE',
        payload: true
    }
}

export const setDataUpdateFalse = () => {
    return {
        type: 'GET_USER_UPDATE',
        payload: false
    }
}

export const registerContact = (name, lastname, tel, street, neighborhood, city, state, number, email) => (dispatch) => {
    try {
        if (name, lastname, tel, email, street, state, number, city, neighborhood) {
            firebase.auth().onAuthStateChanged(user => {
                const currentUser = user._user.uid
                console.log('Register', currentUser)
                firebase
                    .database()
                    .ref("users/" + currentUser + "/contact")
                    .push({
                        name: name,
                        lastname: lastname,
                        tel: tel,
                        address: {
                            street: street,
                            neighborhood: neighborhood,
                            city: city,
                            state: state,
                            number: number
                        },
                        email: email
                    })
                    .then(() => {
                        dispatch(
                            NavigationActions.navigate({
                                routeName: "Home"
                            })
                        )
                        dispatch(setDataUpdate())
                    })
                    .catch(e => {
                        console.log('Erro ' + e)
                    })
            })
        } else {
            Alert.alert('Aviso!', 'Por favor, preencha todos os campos!')
        }
    }
    catch (e) {
        console.log('Erro ' + e)
    }
}

export const getDataBegin = () => {
    return {
        type: 'GET_CONTACT_BEGIN'
    }
}

export const getDataSuccess = (data) => {
    return {
        type: 'GET_CONTACT_SUCCESS',
        payload: data
    }
}

export const getDataFailure = (error) => {
    return {
        type: 'GET_CONTACT_FAILURE',
        payload: error
    }
}

export const getContact = () => (dispatch) => {
    try {
        dispatch(getDataBegin())
        firebase.auth().onAuthStateChanged(user => {
            const currentUser = user._user.uid
            console.log('USER ID ', user)
            firebase.database()
                .ref(`users/${currentUser}/contact`)
                .once("value")
                .then((snapshot) => {
                    console.log('DATA ', snapshot._value)
                    const contact = snapshot._value;
                    const newContact = [];
                    Object.keys(contact).map((index) => {
                        const c = Object.assign({}, contact[index], { id: index })
                        newContact.push(c);
                    });
                    dispatch(getDataSuccess(newContact))
                })
                .catch(e => {
                    dispatch(getDataFailure(e))
                })
        })
    }
    catch (e) {
        console.log('Erro ' + e)
    }
}

export const getContactID = (contactId) => (dispatch) => {
    try {
        dispatch(getDataBegin())
        firebase.auth().onAuthStateChanged(user => {
            const currentUser = user._user.uid
            console.log('USER ID ', user)
            firebase.database()
                .ref(`users/${currentUser}/contact/${contactId}`)
                .once("value")
                .then((snapshot) => {
                    console.log('DATA ', snapshot._value)
                    dispatch(getDataSuccess(Object.assign({}, snapshot._value, { id: contactId })))
                })
                .catch(e => {
                    dispatch(getDataFailure(e))
                })
                .then(() => {
                    dispatch(
                        NavigationActions.navigate({
                            routeName: "Contact"
                        })
                    )
                })
        })
    }
    catch (e) {
        console.log('Erro ' + e)
    }
}

export const deleteContactID = (contactId) => (dispatch) => {
    try {
        firebase.auth().onAuthStateChanged(user => {
            const currentUser = user._user.uid
            console.log('USER ID ', user)
            firebase
                .database()
                .ref(`users/${currentUser}/contact/${contactId}`)
                .remove();
            dispatch(
                NavigationActions.navigate({
                    routeName: "TabBottom"
                })
            )
            dispatch(setDataUpdate())
        })
    }
    catch (e) {
        console.log('Erro ' + e)
    }
}

export const editContact = (name, lastname, tel, email, street, state, number, city, neighborhood, id) => (dispatch) => {
    try {
        if (name, lastname, tel, email, street, state, number, city, neighborhood) {
            firebase.auth().onAuthStateChanged(user => {
                const currentUser = user._user.uid
                firebase
                    .database()
                    .ref(`users/${currentUser}/contact/${id}`)
                    .update({
                        name: name,
                        lastname: lastname,
                        tel: tel,
                        email: email
                    })
                firebase
                    .database()
                    .ref(`users/${currentUser}/contact/${id}/address`)
                    .update({
                        street: street,
                        state: state,
                        number: number,
                        neighborhood: neighborhood,
                        city: city
                    })
                    .then(() => {
                        dispatch(getContactID(id))
                        dispatch(
                            NavigationActions.navigate({
                                routeName: "Contact"
                            })
                        )
                    })
                    .catch(e => {
                        console.log('Erro' + e);
                    })
            })
        } else {
            Alert.alert('Aviso!', 'Por favor, preencha todos os campos!')
        }
    }
    catch (e) {
        console.log('Erro ' + e)
    }
}