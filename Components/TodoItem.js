import { useNavigation } from "@react-navigation/native";
import { View ,Text, Dimensions, StyleSheet, TouchableOpacity, Alert } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign"
import { useDispatch } from "react-redux";
import { deletetodoitem } from "../Store/TodoReducer";
import React from "react";
const screenHeight = Dimensions.get("window").height
const screenWidtth = Dimensions.get("window").width


const FROM = "EDITTODOITEM"

const TodoItem = ({Item, key}) => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    function handleEditItem() {
        navigation.navigate("CreateTodoItem" ,{from : FROM, item : Item})
    }

    const handleDeleteItem = () =>{
        Alert.alert('Delete', 'Are Sure Want to Delete', [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => {
                handleDelete()
            }},
          ]);
    }
    
    const handleDelete = ( ) => {
        dispatch(deletetodoitem(Item))
    }


    return (
        <>
        <View key={key} style={Styles.container}> 
        <View style={Styles.textContianer}>
        <View style={Styles.textview} >
             <Text style={Styles.titletext} numberOfLines={1}>{Item.title}</Text>
        </View>
        <View style={Styles.iconview}>
            <TouchableOpacity onPress={handleEditItem}>
                <AntDesign name="edit" size={25} color="#111"  />
            </TouchableOpacity>
        </View>
        <View style={Styles.iconview}>
            <TouchableOpacity onPress={handleDeleteItem}>
                <AntDesign name="delete" size={20} color="#111"  />
            </TouchableOpacity>
        </View>
        </View>
           <Text style={Styles.desctext} numberOfLines={3} ellipsizeMode='tail' >{Item.desc}</Text>
        </View>
        </>
    )
}
export default TodoItem;

const Styles = StyleSheet.create({
    textContianer :{
        flexDirection: 'row',
        height: '35%',
    },
    iconview :{
        width:'10%',
        justifyContent:'center',
        alignItems:'center'
    },
    textview : {
        justifyContent:'center',
        maxWidth: '79%',
        minWidth : '79%',
    },  
    container : {
        height: screenHeight * 0.13,
        marginTop:10,
        borderRadius:10,
        padding: 10,
        backgroundColor:'#C5C3FF',
    },
    titletext : {
        color: 'black',
        fontSize : screenHeight * 0.025
    },
    desctext : {
        color: 'black',
        fontSize : screenHeight * 0.02,
    }
})