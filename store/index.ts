import { createStore, combineReducers } from "redux";

import popupReducer from "./popup";
import expertReducer from "./expert";
import creationReducer from "./creation";

const store = createStore(
  combineReducers({
    popup: popupReducer,
    expert: expertReducer,
    creation: creationReducer,
  })
);
export default store;
