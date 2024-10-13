import { configureStore, isFulfilled, isRejectedWithValue } from '@reduxjs/toolkit';
import { baseApi } from '../services/baseApi';
import authReducer from '../../utils/authSlice';
import { useDispatch } from 'react-redux';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
export const history = createBrowserHistory();

export const rtkQueryErrorLogger = (api) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
        let statusCode, message;
        
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
            
        }
    }

    return next(action);
};

export const store = configureStore({
    reducer: {
        auth: authReducer,
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