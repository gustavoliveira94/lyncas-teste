import React, { Component } from 'react'
import { StyleSheet, Dimensions, View, Text, ImageBackground, ScrollView, FlatList, TouchableHighlight, TouchableOpacity, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Alert } from 'react-native'
import { TextInputMask } from 'react-native-masked-text'
import { connect } from 'react-redux'
import { getContact, getContactID, deleteContactID, editContact } from '../actions/contact'
import { setDataUpdateFalse } from '../actions/contact'

class Contact extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: 'Contato',
        headerLeft: (
            <Icon
                style={{ marginLeft: 5 }}
                onPress={() => navigation.navigate('TabBottom')}
                name="arrow-left"
                color='#000'
                size={22}
            />
        )
    })

    state = {
        edit: false,
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

    componentDidMount() {
        this.setState({
            name: this.props.contact.name,
            lastname: this.props.contact.lastname,
            tel: this.props.contact.tel,
            street: this.props.contact.address.street,
            neighborhood: this.props.contact.address.neighborhood,
            city: this.props.contact.address.city,
            state: this.props.contact.address.state,
            number: this.props.contact.address.number,
            email: this.props.contact.email
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.status != prevProps.status) {
            this.props.setDataUpdateFalse()
        }
    }

    deleteContactID(id) {
        Alert.alert('Atenção!', 'Você deseja excluir o contato?', 
        [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => this.props.deleteContactID(id)},
          ])
    }

    getContactID(id) {
        this.props.getContactID(id)
    }

    editContact(name, lastname, email, street, state, number, city, neighborhood, id) {
        this.props.editContact(name, lastname, email, street, state, number, city, neighborhood, id)
        setTimeout(() => {
            this.setState({ edit: false })
        }, 500)
    }

    render() {

        const { name, lastname, tel, email, address, id } = this.props.contact

        console.log('CONTACT', this.props.contact)

        return (
            <ImageBackground source={require('../assets/images/bg.png')} style={{ width: '100%', height: '100%' }}>
                {this.props.loadingContact ? <Text>Carregando...</Text> :
                    <ScrollView style={{ flex: 1, marginTop: 25, marginBottom: 25 }} contentContainerStyle={{ flexGrow: 1 }}>
                        <View style={styles.container}>
                            <View style={styles.contentInputs}>
                                <View style={styles.contentTitle}>
                                    <Text style={styles.title}>Detalhes</Text>
                                </View>
                                {!this.state.edit ?
                                    <View>
                                        <View>
                                            <Text style={styles.subTitle}>Nome: {name}</Text>
                                            <Text style={styles.subTitle}>Nome: {lastname}</Text>
                                            <Text style={styles.subTitle}>Telefone: {tel}</Text>
                                            <Text style={styles.subTitle}>Email: {email}</Text>
                                            <Text style={styles.subTitle}>Endereço:</Text>
                                            <Text style={styles.subTitle}>Cidade: {address.city}</Text>
                                            <Text style={styles.subTitle}>Estado: {address.state}</Text>
                                            <Text style={styles.subTitle}>Bairro: {address.neighborhood}</Text>
                                            <Text style={styles.subTitle}>Rua: {address.street}</Text>
                                            <Text style={styles.subTitle}>Número: {address.number}</Text>
                                        </View>
                                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                                            <TouchableHighlight
                                                onPress={
                                                    () => this.setState({
                                                        edit: true
                                                    })
                                                }
                                            >
                                                <Icon
                                                    name="edit"
                                                    color='#FF4500'
                                                    size={26}
                                                />
                                            </TouchableHighlight>
                                            <TouchableHighlight
                                                onPress={() => this.deleteContactID(id)}
                                            >
                                                <Icon
                                                    style={{ marginLeft: 20 }}
                                                    name="trash"
                                                    color='#FF4500'
                                                    size={26}
                                                />
                                            </TouchableHighlight>
                                        </View>
                                    </View>
                                    :
                                    <View>
                                        <View>
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
                                        </View>
                                        <View style={styles.contentActions}>
                                            <TouchableOpacity style={styles.button} onPress={() => this.editContact(this.state.name, this.state.lastname, this.state.tel, this.state.email, this.state.street, this.state.state, this.state.number, this.state.city, this.state.neighborhood, id)}>
                                                <Text style={styles.buttonText}>SALVAR</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                }
                            </View>
                        </View>
                    </ScrollView>
                }
            </ImageBackground>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentTitle: {
        paddingTop: 5,
        paddingBottom: 10,
        paddingLeft: '10%',
        paddingRight: '10%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 26,
        color: '#000'
    },
    contentContact: {
        width: '100%',
        marginTop: 10,
        paddingBottom: 10,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#3a3a3a'
    },
    contactTitle: {
        fontSize: 18,
        color: '#fff'
    },
    contentActions: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 5,
        paddingTop: 5
    },
    contentSubTitle: {
        marginBottom: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    subTitle: {
        fontSize: 18,
        color: '#3a3a3a'
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
    },
    listContact: {
        flex: 1,
        height: '100%',
        width: '100%'
    },
    itemList: {
        flexDirection: 'row',
        height: 70,
        paddingLeft: '10%',
        paddingRight: '10%',
        borderBottomWidth: 1,
        borderBottomColor: '#3a3a3a',
        backgroundColor: 'rgb(255, 255, 255)',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    nameList: {
        color: '#FF4500',
        fontSize: 18
    },
    nameList: {
        color: '#3a3a3a',
        fontSize: 16
    }
});

const mapStateToProps = (state) => {
    return {
        loadingContact: state.getContact.loading,
        status: state.getUser.status,
        contact: state.getContact.contact
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setDataUpdateFalse: () => dispatch(setDataUpdateFalse()),
        deleteContactID: (id) => dispatch(deleteContactID(id)),
        editContact: (name, lastname, tel, email, street, state, number, city, neighborhood, id) => dispatch(editContact(name, lastname, tel, email, street, state, number, city, neighborhood, id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Contact)