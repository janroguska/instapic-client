import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'
import storage from 'redux-persist/lib/storage'
import rootReducer from './reducers/reducers'

const persistConfig = {
    key: 'root',
    storage: storage,
 };
const presistedReducer = persistReducer(persistConfig, rootReducer )
const store = createStore(
	presistedReducer, 
	applyMiddleware(thunk)
)
const persistor = persistStore(store)

export { store, persistor }
