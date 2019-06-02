import { Alert } from 'react-native'
import firebase from "react-native-firebase";
import { NavigationActions } from "react-navigation";

export const loginUser = (email, password) => (dispatch) => {
    try {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(user => {
                const currentUser = user.user._user.uid
                console.log('USER ID ', currentUser)
                    dispatch(
                        NavigationActions.navigate({
                            routeName: "TabBottom"
                        })
                    )
                })
            .catch(e => {
                console.log('Erro ' + e)
                dispatch(Alert.alert('Aviso!', 'Senha ou E-mail incorreto!'))
            })
    } catch (e) {
        console.log('Erro' + e)
    }
}

export const registerUser = (name, lastname, email, password) => (dispatch) => {
    try {
        if (name, lastname, email, password) {
            firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then(value => {
                    const currentUser = value.user._user.uid;
                    firebase
                        .database()
                        .ref("users/" + currentUser)
                        .update({
                            name: name,
                            lastname: lastname
                        })
                        .then(() => {
                            dispatch(
                                NavigationActions.navigate({
                                    routeName: "Login"
                                })
                            )
                        })
                })
                .catch(e => {
                    console.log('Erro ' + e)
                    dispatch(Alert.alert('E-mail já cadastrado!'))
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
        type: 'GET_USER_BEGIN'
    }
}

export const getDataSuccess = (data) => {
    return {
        type: 'GET_USER_SUCCESS',
        payload: data
    }
}

export const getDataFailure = (error) => {
    return {
        type: 'GET_USER_FAILURE',
        payload: error
    }
}

export const getUser = () => (dispatch) => {
    try {
        dispatch(getDataBegin())
        firebase.auth().onAuthStateChanged(user => {
            const currentUser = user._user.uid
            console.log('USER ID ', user)
            firebase.database()
                .ref(`users/${currentUser}`)
                .once("value")
                .then((snapshot) => {
                    console.log('DATA ', snapshot._value)
                    dispatch(getDataSuccess(snapshot._value))
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