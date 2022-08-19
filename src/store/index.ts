import {configureStore} from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import {
    Dispatch
  } from "@reduxjs/toolkit";
  
import trainingReducer from './trainings/trainingsSlice';

export const store = configureStore({
    reducer: {
        trainings: trainingReducer
    }
});

export const useAppDispatch = () => useDispatch<typeof store.dispatch>()
export type RootState = ReturnType<typeof store.getState>