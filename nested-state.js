const redux = require("redux");
const produce = require("immer").produce;

// initial state of our application
const initialState = {
  name: "Manas",
  address: {
    city: "gurgaon",
    street: "sushant lok 2",
    state: "haryana",
  },
};

// created a constant for action type
const UPDATE_CITY = "UPDATE_CITY";

// action creator
function updateCity(city) {
  return {
    type: UPDATE_CITY,
    payload: city,
  };
}

// reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_CITY:
      /* return {
        ...state,
        address: {
          ...state.address,
          city: action.payload,
        },
      }; */
      return produce(state, (draft) => {
        draft.address.city = action.payload;
      });
    default:
      return state;
  }
}

// store
const store = redux.createStore(reducer);

// display initial state
console.log("Initial state ", store.getState());

// subscribing to the store
const unsubcribe = store.subscribe(() => {
  console.log("Updated State ", store.getState());
});

// call dispatch method to invoke an action
store.dispatch(updateCity("gurugram"));

unsubcribe();
