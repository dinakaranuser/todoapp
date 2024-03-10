import { useCallback, useId, useState } from "react";
import { Button, Image, KeyboardAvoidingView, Dimensions, ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity, Platform, Alert, ToastAndroid } from "react-native";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AntDesign from "react-native-vector-icons/AntDesign"
import Entypo from "react-native-vector-icons/Entypo"
import { useDispatch, useSelector } from "react-redux";
import { addtodoitem, edittodoitem } from "../Store/TodoReducer";
import { useFocusEffect } from "@react-navigation/native";

const DEFAULTIAMGE = require("../Assets/Images/defaultimage.jpg")

const screenHeight = Dimensions.get("window").height
const screenWidth = Dimensions.get("window").width


const FROM = "EDITTODOITEM"
const CreateTodoItem = ({navigation, route}) => {
    const {from, item } = route.params
    const [image, setimage] = useState('')
    const [title, settitle] = useState("")
    const [desc, setdesc] = useState("")
    const TODO_ID = useId()
    const dispatch = useDispatch()

    useFocusEffect(
        useCallback(() => {
            if(item?.id != undefined && FROM === from){
                setimage(item?.image)
                setdesc(item?.desc)
                settitle(item?.title)
            }
        },[item])
    )

    function handleAddTodoItems() {
        if(title == ""){
            ToastMessage("Warning","Fill Valid details!")
        }else if(title?.replace(/ /g,'').length < 3){
            ToastMessage("Warning", "Fill Min 3 char")
        }else{
            let ramdom = Math.floor(Math.random() * 1000).toString()
            let id = ramdom + title.toString().replace(/ /g,'') + TODO_ID.toString()
            const todo = {
                id : id,
                title,
                desc,
                image
            }
            dispatch(addtodoitem(todo))
            navigation.navigate("TodoView")
        }

    }

    function ToastMessage ( Title = "",msg = "",) {
        if(Platform.OS === "ios"){
            Alert.alert(Title, msg)
        }else{
            ToastAndroid.show(msg, ToastAndroid.SHORT)
        }
    }
    
    async function handleLaunchCamera(id = 0) {
        let options = {
            mediaType :'photo',
            // includeBase64: true,
            cameraType: "back",
            saveToPhotos:true,
            // didCancel: true
        }
        if(id == 0){
            await launchCamera(options)
            .then((res) => {
                setimage(res?.assets[0]?.uri)
                ToastMessage("Success","Image Added Successfully!")
            })
            .catch((err) => {
                ToastMessage("Error","Something went Worng Try again!")
            })
            .finally(( ) => console.log('finaly'))

        }else{
          await launchImageLibrary(options)
          .then((res) => {
            setimage(res?.assets[0]?.uri)
            ToastMessage("Success","Image Added Successfully!")
        })
        .catch((err) => {
            ToastMessage("Error","Something went Worng Try again!")
        })
        }
        
    }

    function handleBack() {
        navigation.goBack()
    }
 

    function handleCheck() {
        if(from === FROM){
            handleEditItems()
        }else{
            handleAddTodoItems()

        }
    }

    function handleEditItems() {
        if(title == ""){
            ToastMessage("warning","Fill Valid details!")
        }else if(title?.replace(/ /g,'').length < 3){
            ToastMessage("warning","Fill with Min 3 char")
        }else{
            const todo = {
                id : item?.id,
                title,
                desc,
                image
            }
            dispatch(edittodoitem(todo))
            navigation.navigate("TodoView")
        }
    }

    return (
        <ScrollView style={Styles.container}>
            <View style={Styles.main}>
            <TextInput
                style={Styles.TextInputtitle}
                placeholder="Title"
                value={title}
                onChangeText={settitle}
                placeholderTextColor={'black'}
            />
             <TextInput
             value={desc}
             onChangeText={setdesc}
                style={Styles.TextInputdesc}
                placeholder="Description"
                multiline
                numberOfLines={5}
                placeholderTextColor={'black'}
            />
            <View style={Styles.imageCaptureView}> 
                <View style={Styles.imageView}>
                     <Image source={image == "" ? DEFAULTIAMGE : {uri : image }} style={Styles.image} resizeMode="center"/>
                </View>
                <TouchableOpacity style={Styles.fliestylecamera} activeOpacity={0.5} onPress={() => handleLaunchCamera(0)}>
                    <AntDesign name="camera" size={30} style={{color: '#5F33E1'}}/>
                </TouchableOpacity>
                <TouchableOpacity style={Styles.fliestyle } activeOpacity={0.5} onPress={() => handleLaunchCamera(1)}>
                    <Entypo name="folder-images" size={30} style={{color: '#5F33E1'}}/>
                </TouchableOpacity>
                
            </View>
            </View>
            <View style={Styles.buttonView}> 
                    <TouchableOpacity  style={Styles.addtodobtnview} activeOpacity={0.5} onPress={handleCheck}>
                        <Text style={Styles.addtodobtntext}>{FROM === from ? 'Update Todo' : 'Add Todo' }</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleBack} style={Styles.backbtnview}>
                        <Text style={Styles.gobacktxt}>Go Back</Text>
                    </TouchableOpacity>
            </View>

        </ScrollView>
    
    )
}

export default CreateTodoItem;

const Styles = StyleSheet.create({
    container : {
        flex: 1,
        padding: 20,
        backgroundColor:'#fff'
    },
    main : {
        height: screenHeight * 0.82
    },  
    TextInputtitle : {
        marginVertical:10,
        borderWidth:0,
        borderColor:'black',
        fontSize: 25,
        borderBottomWidth: 0.5,
        color:'black'
    },
    TextInputdesc : {
        borderWidth:0.5,
        borderColor:'black',
        fontSize: 16,
        marginVertical:10,
        color:'black'

    },
    image : {
        width: screenWidth * 0.9,
        height: screenHeight * 0.14,
        margin: 1
    },  
    imageView : {
        width: '60%',
        justifyContent:'center',
        alignItems:'center'
    },
    addtodobtnview : {
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#5F33E1',
        borderRadius: 50,
        padding: 10,
        elevation: 2
    },
    backbtnview :{
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 50,
        padding: 10
    },
    imageCaptureView : {
        height: screenHeight * 0.15,
        borderWidth: 0.5,
        borderColor: 'black',
        flexDirection: 'row',

    },
    gobacktxt :{
        color: 'black',
        fontSize: screenHeight * 0.02
    },
    addtodobtntext: {
        color: 'white',
        fontSize: screenHeight * 0.02
    },
    fliestyle :{
        width: '20%',
        justifyContent:'center',
        alignItems:'center',
        elevation:1,
        backgroundColor:'white',
        borderWidth:0.4
    },
    fliestylecamera :{
        width: '20%',
        justifyContent:'center',
        alignItems:'center',
        elevation:1,
        backgroundColor:'white',
        borderRightColor: 'black',
        borderWidth:0.4
        }
})