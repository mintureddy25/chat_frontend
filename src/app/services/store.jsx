import { configureStore, isFulfilled, isRejectedWithValue } from '@reduxjs/toolkit';
import { baseApi } from '../services/baseApi';
import authReducer from '../../utils/authSlice';
//import errorSlice, { setErrors } from '../../Utils/ErrorSlice';
//import notificationsPopupSlice from '../../Utils/NotificationsSlice';
import { useDispatch } from 'react-redux';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
//import CartItemsSlice from '../../utils/CartItemsSlice';
export const history = createBrowserHistory();

export const rtkQueryErrorLogger = (api) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
        let statusCode, message;
        // below condition if HH API stops working
        if (!action.meta.baseQueryMeta.response) {
            statusCode = 500;
            message = 'Something went wrong! We\'re working on fixing it.';
        } else {
            statusCode = action.payload.status;
            message = action.payload.data?.error?.message
                ? action.payload.data?.error?.message
                : 'Oops! Something went wrong.';
        }
        if (statusCode !== 404) {
            //api.dispatch(setErrors(action.payload));
        }
    }

    return next(action);
};

export const store = configureStore({
    reducer: {
        auth: authReducer,
        //errors: errorSlice,
        //notificationsPopup: notificationsPopupSlice,
        //cartItems:CartItemsSlice,
        router: connectRouter(history),
        [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) => [
        rtkQueryErrorLogger,
        ...getDefaultMiddleware().concat([
            routerMiddleware(history),
            baseApi.middleware,
        ]),
    ],
});