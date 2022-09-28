import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import productSaga from './productSaga';
import createSagaMiddleware from 'redux-saga';
import cartSaga from './cartSaga';
import watchUsersAsync from './productaddsaga';

const sagaMiddleware=createSagaMiddleware();

const cartMiddleware=createSagaMiddleware();

const productMiddleware=createSagaMiddleware();

const store=configureStore({
    reducer:rootReducer,
    middleware:()=>[sagaMiddleware,cartMiddleware,productMiddleware]
});

sagaMiddleware.run(productSaga);
cartMiddleware.run(cartSaga);
productMiddleware.run(watchUsersAsync);

export default store;