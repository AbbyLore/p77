import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    Modal,
    KeyboardAvoidingView,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ScrollView} from 'react-native';

import db from '../config';
import firebase from 'firebase';

export default class SignUpLogInScreen extends Component{
    constructor(){
        super();
        this.state={
          emailId:'',
          password:'',
          firstName:'',
          lastName:'',
          address:'',
          contact:'',
          confirmPassword:'',
          isModalVisible:'false'
        }
    }

    userSignUp = (emailId, password,confirmPassword) =>{
        if(password !== confirmPassword){
            return Alert.alert("password doesn't match\nCheck your password.")
        }else{
          firebase.auth().createUserWithEmailAndPassword(emailId, password)
          .then(()=>{
            db.collection('users').add({
              first_name:this.state.firstName,
              last_name:this.state.lastName,
              contact:this.state.contact,
              email_id:this.state.emailId,
              address:this.state.address
            })
            return  Alert.alert(
                 'User Added Successfully',
                 '',
                 [
                   {text: 'OK', onPress: () => this.setState({"isModalVisible" : false})},
                 ]
             );
          })
          .catch((error)=> {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            return Alert.alert(errorMessage)
          });
        }
      }

      userLogin = (emailId, password)=>{
        firebase.auth().signInWithEmailAndPassword(emailId, password)
        .then(()=>{
          this.props.navigation.navigate('DonateBooks')
        })
        .catch((error)=> {
          var errorCode = error.code;
          var errorMessage = error.message;
          return Alert.alert(errorMessage)
        })
      }
      render(){
        return(
            <View style = {styles.container}>
                <View>
                    <Text style = {styles.title}>Barter</Text>
                </View>
                <View>
                    <TextInput
                    style = {styles.logInBox}
                    placeholder = 'abc@example.com'
                    keyboardType = 'email-address'
                    onChangeText = {
                        (text) => {
                            this.setState({
                                emailId: text
                            })
                        }
                    }/>
                    <TextInput
                    style = {styles.logInBox}
                    secureTextEntry = {true}
                    placeholder = 'Enter Password'
                    onChangeText = {
                        (text) => {
                            this.setState({
                                password: text
                            })
                        }
                    }/>
                    <TouchableOpacity
                    style = {[styles.button, {marginBottom: 20, marginTop: 20}]}
                    onPress = {() => this.userLogIn(this.state.emailId, this.state.password)}>
                        <Text style = {styles.buttonText}>Log In</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                    style = {[styles.button, {marginBottom: 20, marginTop: 20}]}
                    onPress = {() => this.userSignUp(this.state.emailId, this.state.password)}>
                        <Text style = {styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{ 
        flex:1, 
        backgroundColor:'#f2d8e5' 
    }, 
    profileContainer:{ 
        flex:1, 
        justifyContent:'center', 
        alignItems:'center', 
    }, 
    title :{ 
        fontSize:65, 
        fontWeight:'300', 
        paddingBottom:30, 
        color : '#c36284' 
    }, 
    loginBox:{ 
        width: 300, 
        height: 40, 
        borderBottomWidth: 1.5, 
        borderColor : '#c8b0d0', 
        fontSize: 20, 
        margin:10, 
        paddingLeft:10 
    }, 
    button:{ 
        width:300, 
        height:50, 
        justifyContent:'center', 
        alignItems:'center', 
        borderRadius:25, 
        backgroundColor:"#85a8c7", 
        shadowColor: "#000", 
        shadowOffset: { width: 0, height: 8, }, 
        shadowOpacity: 0.30, 
        shadowRadius: 10.32, 
        elevation: 16, 
    }, 
    buttonText:{ 
        color:'#00799c', 
        fontWeight:'200', 
        fontSize:20 
    }, 
    buttonContainer:{ 
        flex:1, 
        alignItems:'center' 
    } 
})
