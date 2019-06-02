import React, { Component } from 'react'
import { StyleSheet, View, Text, ImageBackground, ScrollView, FlatList, TouchableHighlight } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import firebase from "react-native-firebase"
import { connect } from 'react-redux'
import { getUser } from '../actions/user'
import { getContact, getContactID } from '../actions/contact'
import { setDataUpdateFalse } from '../actions/contact'

class Home extends Component {

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

    componentDidMount() {
        setTimeout(() => {
            console.log('Status', this.props.status)
        }, 2000)
        this.props.getUser()
        this.props.getContact()
        this.props.setDataUpdateFalse()
    }

    componentDidUpdate(prevProps) {
        if (this.props.status != prevProps.status) {
            this.props.getContact()
            this.props.getUser()
            this.props.setDataUpdateFalse()
        }
    }

    getContactID(id) {
        this.props.getContactID(id)
    }

    logOut() {
        firebase
            .auth()
            .signOut()
            .then(() => {
                this.props.navigation.navigate('Login')
            })
            .catch(e => console.log(e))
    }

    render() {

        const { name, lastname } = this.props.user
        const contact = this.props.user.contact ? Object.keys(this.props.user.contact).length : ''

        console.log('CONTACT', this.props.contact)

        return (
            <ImageBackground source={require('../assets/images/bg.png')} style={{ width: '100%', height: '100%' }}>
                <View style={styles.topBar}>
                    <Text style={styles.subTitle}>Home</Text>
                    <TouchableHighlight
                        onPress={() => this.logOut()}
                    >
                        <Icon
                            name="sign-out"
                            color='#FF4500'
                            size={24}
                        />
                    </TouchableHighlight>
                </View>
                {this.props.loadingUser && this.props.loadingContact ? <Text>Carregando...</Text> :
                    <View style={styles.container}>
                        <View style={styles.contentTitle}>
                            <Text style={styles.title}>Olá, {name} {lastname},</Text>
                            <Text style={styles.title}>{contact < 1 ? (contact < 1 ? 'Você tem 0 contato!' : contact) : (contact == 1 ? `Você tem ${contact} contato!` : `Você tem ${contact} contatos!`)}</Text>
                            <View style={styles.contentContact}>
                                <Text style={styles.contactTitle}>Lista de Contatos:</Text>
                            </View>
                        </View>
                        <FlatList
                            style={styles.listContact}
                            data={this.props.contact}
                            keyExtractor={(item, index) => index}
                            renderItem={({ item }) => (
                                <TouchableHighlight
                                    onPress={() => this.getContactID(item.id)}
                                >
                                    <View style={styles.itemList}>
                                        <View>
                                            <Text style={styles.nameList}>{item.name} {item.lastname}</Text>
                                            <Text style={styles.emailList}>{item.email}</Text>
                                        </View>
                                        <Icon
                                            name="chevron-right"
                                            color='#FF4500'
                                            size={24}
                                        />
                                    </View>
                                </TouchableHighlight>
                            )}
                        />
                    </View>
                }
            </ImageBackground>
        )
    }
}


const styles = StyleSheet.create({
    topBar: {
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: '10%',
        paddingRight: '10%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#3a3a3a'
    },
    container: {
        flex: 1,
        height: '100%',
        alignItems: 'center',
    },
    contentTitle: {
        paddingTop: 10,
        paddingBottom: 5,
        paddingLeft: '10%',
        paddingRight: '10%',
        backgroundColor: '#FF4500',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    title: {
        fontSize: 18,
        color: '#fff'
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
    contentSubTitle: {
        marginBottom: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    subTitle: {
        fontSize: 18,
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
        user: state.getUser.user,
        loadingUser: state.getUser.loading,
        loadingContact: state.getContact.loading,
        status: state.getUser.status,
        contact: state.getContact.contact
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUser: () => dispatch(getUser()),
        getContact: () => dispatch(getContact()),
        getContactID: (id) => dispatch(getContactID(id)),
        setDataUpdateFalse: () => dispatch(setDataUpdateFalse())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)