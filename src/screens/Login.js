import React, { Component } from 'react';
import { StyleSheet, Alert, View, Text, TouchableOpacity, TextInput, ImageBackground, ScrollView } from 'react-native'
import { TextInputMask } from 'react-native-masked-text'
import firebase from "react-native-firebase"
import { connect } from 'react-redux';
import { loginUser } from '../actions/user'

class Login extends Component {

    static navigationOptions = {
        header: null
    }

    state = {
        email: '',
        password: ''
    }

    loginUser(email, password) {
        this.props.loginUser(email, password)
    }

    render() {
        return (
            <ImageBackground source={require('../assets/images/bg.png')} style={{ width: '100%', height: '100%' }} >
                <ScrollView style={{ flex: 1, marginTop: 25, marginBottom: 25 }} contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={styles.container}>
                        <View style={styles.contentTitle}>
                            <Text style={styles.title}>LYNCAS CONTACT</Text>
                        </View>
                        <View style={styles.contentInputs}>
                            <View style={styles.contentSubTitle}>
                                <Text style={styles.subTitle}>ENTRAR</Text>
                            </View>
                            <Text style={styles.labelInputs}>E-mail</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="example@example.com"
                                onChangeText={email =>
                                    this.setState({
                                        email
                                    })
                                }
                            />
                            <Text style={styles.labelInputs}>Senha</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="******"
                                secureTextEntry={true}
                                onChangeText={password =>
                                    this.setState({
                                        password
                                    })
                                }
                            />
                            <View style={styles.contentButton}>
                                <TouchableOpacity style={styles.button} onPress={() => this.loginUser(this.state.email, this.state.password)}>
                                    <Text style={styles.buttonText}>ENTRAR</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.contentButton}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
                                    <Text>Não tem conta? Cadastre-se!</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </ImageBackground >
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentTitle: {
        marginBottom: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        color: '#fff'
    },
    contentSubTitle: {
        marginBottom: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    subTitle: {
        fontSize: 24,
        color: '#000'
    },
    contentInputs: {
        justifyContent: 'center',
        width: '80%',
        backgroundColor: '#fff',
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        borderRadius: 5
    },
    labelInputs: {
        color: '#000',
        fontSize: 16
    },
    input: {
        width: '100%',
        marginBottom: 10,
        padding: 5,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 5
    },
    contentButton: {
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 15
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '70%',
        height: 50,
        padding: 15,
        backgroundColor: '#000',
        borderRadius: 100
    },
    buttonText: {
        color: '#fff'
    }
});

const mapDispatchToProps = (dispatch) => {
    return {
        loginUser: (email, password) => dispatch(loginUser(email, password))
    }
}

export default connect(null, mapDispatchToProps)(Login)