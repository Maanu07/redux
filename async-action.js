const redux = require('redux')
const thunkMiddleware = require('redux-thunk').default
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const axios = require('axios')

// initial state
const initialState={
    loading:false,
    users:[],
    errors:''
}

// constants for action type 
const FETCH_USERS_REQUESTED = 'FETCH_USERS_REQUESTED'
const FETCH_USERS_SUCCEEDED = 'FETCH_USERS_SUCCEEDED'
const FETCH_USERS_FAILED = 'FETCH_USERS_FAILED'

// action creators 
function fetchUserRequest(){
    return {
        type:FETCH_USERS_REQUESTED
    }
}
function fetchUserSucceeded(users){
    return {
        type:FETCH_USERS_SUCCEEDED,
        paylaod:users
    }
}
function fetchUserFailed(error){
    return {
        type:FETCH_USERS_FAILED,
        paylaod:error
    }
}


// reducer
function reducer(state=initialState,action){
    switch(action.type){
        case FETCH_USERS_REQUESTED:
            return {
                ...state,
                loading:false
            }
        case FETCH_USERS_SUCCEEDED:
            return {
                ...state,
                loading:true,
                users:action.paylaod
            }
        case FETCH_USERS_FAILED:
            return {
                ...state,
                loading:true,
                error: action.paylaod
            }
        default:
            state
    }
}

// async action creator
/* const fetchUsers = () =>{
    return function(dispatch){
        dispatch(fetchUserRequest())
        axios.get('https://jsonplaceholder.typicode.com/users').then(result => {
            users = result.data.map(user => user.id)
            dispatch(fetchUserSucceeded(users))
        }).catch(err =>{
            error = err.message 
            dispatch(fetchUserFailed(error))
        })

    }
} */

const fetchUsers = () =>{
    store.dispatch(fetchUserRequest())
    axios.get('https://jsonplaceholder.typicode.com/users').then(result => {
        users = result.data.map(user => user.id)
        store.dispatch(fetchUserSucceeded(users))
    }).catch(err =>{
        error = err.message 
        store.dispatch(fetchUserFailed(error))
    })
}

// creating the store
const store = createStore(reducer,applyMiddleware(thunkMiddleware))

store.subscribe(()=> {
    console.log(store.getState())
})

// store.dispatch(fetchUsers())
fetchUsers()

