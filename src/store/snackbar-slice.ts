import { createSlice } from '@reduxjs/toolkit';

export type Tseverity = 'success' | 'info' | 'warning' | 'error' | undefined;

interface IOpen_Snackbar {
  payload: {
    message: string;
    severity: Tseverity;
  };
}

interface IState {
  toggleSnackbar: boolean;
  snackbarMessage: string;
  snackbarSeverity: Tseverity;
}

const initialState: IState = {
  toggleSnackbar: false,
  snackbarMessage: '',
  snackbarSeverity: undefined,
};

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    OPEN_SNACKBAR: (state, action: IOpen_Snackbar) => {
      state.toggleSnackbar = true;
      state.snackbarMessage = action.payload.message;
      if (action?.payload?.severity) {
        state.snackbarSeverity = action.payload.severity;
      }
    },
    CLOSE_SNACKBAR: (state) => {
      state.toggleSnackbar = false;
      state.snackbarMessage = '';
    },
  },
});

export const snackbarActions = snackbarSlice.actions;

export default snackbarSlice;
