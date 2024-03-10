import { createSlice } from "@reduxjs/toolkit";

const initialState = []

export const TodoReducer = createSlice({
    name : 'TodoReducer',
    initialState,
    reducers : {
        addtodoitem : (state, {payload}) => {
            state.unshift(payload)
            // state.push(payload) 
        },
        edittodoitem : (state,{payload}) => { 
                state?.filter((todoitems, index) => {
                    if(todoitems?.id == payload?.id){
                        state[index] = payload
                       return state
                    }
                })
        },
        deletetodoitem : (state, {payload}) => {
            let deletedArr = []
            state.filter((todoitems, index) => {
                if(todoitems?.id != payload?.id){
                    deletedArr.push(todoitems)
                }
            })
            state = deletedArr
            return state
        }
    }
})

export const {addtodoitem, edittodoitem, deletetodoitem} = TodoReducer.actions


export default TodoReducer.reducer