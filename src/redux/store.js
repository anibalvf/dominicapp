
import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducer';

const store = configureStore({
  reducer: {
    avfSlice: reducer, 
  },
});

export default store;