import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import { windowHeight, windowWidth } from '../../../utils/Dimensions';
import { Icon } from 'react-native-elements'
import globalColors from '../../../styles/colors';


const ReplyBar = ({ anotherUserId, token }) => {
    const [focused, setFocused] = useState(false); 
    const [mess, setMess] = useState("");

    const sendMessage = () => {
        client
          .post(
            '/chat/initiateConvo',
            {anotherUserId: anotherUserId},
            {headers: {Authorization: `Bearer ${token}`}},
          )
          .then(res => {
            // Send message function 
          })
          .catch(err => {
            Alert.alert("Cannot send messages")
          });
    };
      
    return (
        <View style={styles.container}> 
            <View style={{...styles.replyBar, bottom: focused? (windowHeight / 3) : 0}}> 
                <TextInput
                    placeholder='Reply'
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    onChangeText={(t) => setMess(t)}
                    style={{height: 50}}> 
                </TextInput>
            </View>
            <Icon 
                name="send"
                type="feather"
                size={30}
                color={globalColors.storyText}
                containerStyle={{...styles.sendIcon, bottom: focused? (windowHeight / 3) : 0}} 
                onPress={() => sendMessage()}
            />
        </View>
    )
}

export default ReplyBar; 

const styles = StyleSheet.create({
    container: {
        width: windowWidth, 
        height: 50, 
        flex: 1, 
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'center', 
    }, 
    replyBar: {
        backgroundColor: 'white', 
        width: windowWidth * 0.8, 
        borderRadius: 10,
        // position: 'absolute',
        // bottom: 20,
    },
    sendIcon: {
        marginLeft: 10,
    }
})



