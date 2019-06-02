import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ImageBackground, ScrollView } from 'react-native'
import { TextInputMask } from 'react-native-masked-text'
import { connect } from 'react-redux';
import { registerContact } from '../actions/contact'

class RegisterContact extends Component {

    state = {
        name: '',
        lastname: '',
        tel: '',
        street: '',
        neighborhood: '',
        city: '',
        state: '',
        number: '',
        email: '',
    }

    registerContact(name, lastname, tel, street, neighborhood, city, state, number, email) {
        this.props.registerContact(name, lastname, tel, street, neighborhood, city, state, number, email)
    }

    render() {
        return (
            <ImageBackground source={require('../assets/images/bg.png')} style={{ width: '100%', height: '100%' }}>
                <ScrollView style={{ flex: 1, marginTop: 25, marginBottom: 25 }} contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={styles.container}>
                        <View style={styles.contentInputs}>
                            <View style={styles.contentSubTitle}>
                                <Text style={styles.subTitle}>REGISTRE UM CONTATO</Text>
                            </View>
                            <Text style={styles.labelInputs}>Nome</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Nome"
                                value={this.state.name}
                                onChangeText={name =>
                                    this.setState({
                                        name
                                    })
                                }
                            />
                            <Text style={styles.labelInputs}>Sobrenome</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Sobrenome"
                                value={this.state.lastname}
                                onChangeText={lastname =>
                                    this.setState({
                                        lastname
                                    })
                                }
                            />
                            <Text style={styles.labelInputs}>Telefone</Text>
                            <TextInputMask
                                type={'cel-phone'}
                                style={styles.input}
                                placeholder="Ex: (00)0000-0000"
                                value={this.state.tel}
                                onChangeText={tel =>
                                    this.setState({
                                        tel
                                    })
                                }
                            />
                            <Text style={styles.labelInputs}>Rua</Text>
                            <TextInput
                                style={styles.input}
                                value={this.state.street}
                                placeholder="Rua"
                                onChangeText={street =>
                                    this.setState({
                                        street
                                    })
                                }
                            />
                            <Text style={styles.labelInputs}>Bairro</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Bairro"
                                value={this.state.neighborhood}
                                onChangeText={neighborhood =>
                                    this.setState({
                                        neighborhood
                                    })
                                }
                            />
                            <Text style={styles.labelInputs}>Cidade</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Ex: Rio de Janeiro"
                                value={this.state.city}
                                onChangeText={city =>
                                    this.setState({
                                        city
                                    })
                                }
                            />
                            <Text style={styles.labelInputs}>Estado</Text>
                            <TextInputMask
                                type={'custom'}
                                options={{
                                    mask: 'AA'
                                }}
                                style={styles.input}
                                placeholder="Ex: RJ"
                                value={this.state.state}
                                onChangeText={state =>
                                    this.setState({
                                        state
                                    })
                                }
                            />
                            <Text style={styles.labelInputs}>Número</Text>
                            <TextInputMask
                                type={'custom'}
                                options={{
                                    mask: '999'
                                }}
                                keyboardType={'numeric'}
                                value={this.state.number}
                                placeholder="Ex: 40"
                                onChangeText={number =>
                                    this.setState({
                                        number
                                    })
                                }
                                style={styles.input}
                            />
                            <Text style={styles.labelInputs}>E-mail</Text>
                            <TextInput
                                style={styles.input}
                                value={this.state.email}
                                placeholder="Ex: example@example.com"
                                onChangeText={email =>
                                    this.setState({
                                        email
                                    })
                                }
                            />
                            <View style={styles.contentButton}>
                                <TouchableOpacity style={styles.button} onPress={() => this.registerContact(this.state.name, this.state.lastname, this.state.tel, this.state.street, this.state.neighborhood, this.state.city, this.state.state, this.state.number, this.state.email)}>
                                    <Text style={styles.buttonText}>REGISTRAR</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </ImageBackground>
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
        registerContact: (name, lastname, tel, street, neighborhood, city, state, number, email) => dispatch(registerContact(name, lastname, tel, street, neighborhood, city, state, number, email))
    }
}

export default connect(null, mapDispatchToProps)(RegisterContact)