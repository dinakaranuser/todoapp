import { View, Text, SafeAreaView, KeyboardAvoidingView, TouchableOpacity, StyleSheet, Dimensions, Platform, FlatList } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign"
import TodoItem from "./TodoItem";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
const screenHeight = Dimensions.get("window").height
const screenWidtth = Dimensions.get("window").width

const FROM = "ADDTODOITEM"

const TodoView = () => {
  const navigation = useNavigation()
  const todoitem = useSelector((state) => state.todo)
  const [todoList, settodoList] = useState([])

  function handleAddTodoItems() {
    navigation.navigate("CreateTodoItem", {from : FROM, item : []})
  }

  useFocusEffect(
    useCallback(() => {
      settodoList(todoitem)
    },[todoitem])
  )


  return(
    <SafeAreaView style={Styles.container}>
      <View style={Styles.taskview}>
        <Text style={Styles.tasktext}>Today's Task</Text>
      </View>
      <FlatList 
        data={todoList}
        renderItem={({item, index}) => <TodoItem Item={item} index={index} />}
        keyExtractor={(item) => {return item.id}}
      />
      <KeyboardAvoidingView style={[Styles.bottomView, Platform.OS === "ios" ? "padding" : "height"]}>
        <TouchableOpacity style={Styles.addbtn} onPress={handleAddTodoItems} activeOpacity={0.5}>
            <AntDesign name="plus" size={30} color="#111" style={{color: '#fff'}}  />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default TodoView; 

const Styles = StyleSheet.create({
  bottomView  :{
    position:'absolute',
    bottom: 20,
    right: 20,
  },
  container : {
    flex :1,
    backgroundColor: '#FFF',
    padding: 20
  },
  addbtn : {
    backgroundColor:'#5F33E1',
    width: screenWidtth * 0.15,
    justifyContent:'center',
    alignItems:'center',
    height : screenHeight * 0.07,
    borderRadius: 50,
    elevation: 10
  },
  taskview : {
    paddingTop: 10
  },
  tasktext : {
    fontSize: 20,
    fontWeight:'bold',
    color:'#5F33E1'
  },
 
})