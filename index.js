const redux = require("redux");
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators; // helper function
const combineReducers = redux.combineReducers

// i will create action
// action is a js object
// we need a action creator to create a action, action creator is a function that returns the action object
const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";
const ICECREAM_ORDERED = "ICECREAM_ORDERED"
const ICECREAM_RESTOCKED = "ICECREAM_RESTOCKED"

// action creator functions
function orderCake() {
  return {
    type: CAKE_ORDERED,
    payload: 1,
  };
}

function restockCake(qty) {
  return {
    type: CAKE_RESTOCKED,
    payload: qty,
  };
}

function orderIcecream(qty=1){
  return {
    type:ICECREAM_ORDERED,
    payload:qty
  }
}

function restockIcecream(qty=1){
  return {
    type:ICECREAM_RESTOCKED,
    payload:qty
  }
}

// i will implement reducer here..
// reducer is a pure function that returns the new state of the application
let cakeInitialState={
  countOfCakes: 10,
}
let icecreamInitialState = {
  countOfIcecream:5
};

function cakeReducer(state=cakeInitialState,action){
  switch (action.type) {
    case "CAKE_ORDERED":
      return {
        ...state,
        countOfCakes: state.countOfCakes - action.payload,
      };
    case "CAKE_RESTOCKED":
      return {
        ...state,
        countOfCakes: state.countOfCakes + action.payload,
      };
    default:
      return state
    }
}
function icecreamReducer(state = icecreamInitialState, action) {
  switch (action.type) {
      case 'ICECREAM_ORDERED':
        return {
          ...state,
          countOfIcecream:state.countOfIcecream - action.payload
        }
      case 'ICECREAM_RESTOCKED':
        return {
          ...state,
          countOfIcecream:state.countOfIcecream + action.payload
        }
      default:
        return state
  }
}

// combining the multiple reducers together using combineReducers() method
const rootReducer = combineReducers({
  cake:cakeReducer,
  icecream:icecreamReducer
})

// creating the store and passing the reducer as a argument
const store = createStore(rootReducer);

// prints the initial state of the application using store.getState() method
console.log("Initial state : ", store.getState());

// subscribe method in store... whenever the state change this subscribe method is called, subscribe method returns a unsubcribe method which can be used to unsubscribe from transition of state
const unsubscribe = store.subscribe(() => {
  console.log("Final state : ", store.getState());
});

// dispatch method in store...it is used to invoke any action , takes an action as a argument
/*   store.dispatch(orderCake());
  store.dispatch(orderCake());
  store.dispatch(orderCake());
  store.dispatch(restockCake(5)); */

// using bindActionCreators() method
const actions = bindActionCreators({ orderCake, restockCake, orderIcecream,restockIcecream}, store.dispatch);
actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.restockCake(3);
actions.orderIcecream()
actions.orderIcecream()
actions.restockIcecream(5)
// calling the unsubscribe method
unsubscribe();

/* store.dispatch(orderCake());
console.log(store.getState()) */
