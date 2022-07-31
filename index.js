const redux = require("redux");
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators; // helper function

// i will create action
// action is a js object
// we need a action creator to create a action, action creator is a function that returns the action object
const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";

// action creator function
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

// i will implement reducer here..
// reducer is a pure function that returns the new state of the application
let initialState = {
  countOfCakes: 10,
};
function reducer(state = initialState, action) {
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
  }
}

// creating the store and passing the reducer as a argument
const store = createStore(reducer);

// prints the initial state of the application using store.getState() method
console.log("Initial state : ", store.getState());

// subscribe method in store... whenever the state change this subscribe method is called, subscribe method returns a unsubcribe method which can be used to unsubscribe from transition of state
const unsubscribe = store.subscribe(() => {
  console.log("Final state : ", store.getState());
});

// dispatch method in store...it is used to invoke any action , takes an action as a argument
store.dispatch(orderCake());
store.dispatch(orderCake());
store.dispatch(orderCake());
store.dispatch(restockCake(5));

// using bindActionCreators() method
const actions = bindActionCreators({ orderCake, restockCake }, store.dispatch);
actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.restockCake(3);

// calling the unsubscribe method
unsubscribe();

/* store.dispatch(orderCake());
console.log(store.getState()) */
