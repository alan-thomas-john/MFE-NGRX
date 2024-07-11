import { createReducer, on } from '@ngrx/store';
import { login, loginSuccess, loginFailure, logout, loadTokenFromLocalStorage } from './auth.action';

export interface AuthState {
  token: string | null;
  error: any;
}

export const initialState: AuthState = {
  token: null,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, { token }) => ({ 
    ...state, token, 
    error: null 
  })),

  on(loadTokenFromLocalStorage, (state) => ({ 
    ...state })),

  on(loginFailure, (state, { error }) => ({
     ...state, token: null, error
     })),

  on(logout, state => ({ 
    ...state, token: null,
     error: null 
    }))
);