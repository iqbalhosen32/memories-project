import { combineReducers } from "redux";

import posts from './Posts'
import auth from './Auth'

export const Reducers = combineReducers({posts, auth});