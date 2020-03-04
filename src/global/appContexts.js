import React from 'react';

export const API_RESULT = {
  success: '#caffda',
  error: '#ffacac',
  white: '#FFF',
};

export const StoreContext = React.createContext();

export const INITIAL_STATE = {
  isConnected: null,
  backgroundColor: API_RESULT.white,
  errorType: null,
  errorText: null,
  senderStatus: 'INITIAL',
  user: 'user',
  repo: 'repo',
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'REPO_ERROR':
    case 'BOT_ERROR':
    case 'CONNECTION_ERROR':
      return {
        ...state,
        errorType: action.payload.errorType,
        errorText: action.payload.text,
        backgroundColor: API_RESULT.error,
      };
    case 'REPO_SUCCESS':
      return {
        ...state,
        errorType: null,
        errorText: null,
        backgroundColor: API_RESULT.success,
        senderStatus: 'REPO',
      };
    case 'BOT_SUCCESS':
      return {
        ...state,
        errorType: null,
        errorText: null,
        backgroundColor: API_RESULT.white,
        senderStatus: 'BOT',
      };
    case 'RESET':
      return {
        ...state,
        errorType: null,
        errorText: null,
        backgroundColor: API_RESULT.white,
        senderStatus: 'INITIAL',
        user: 'user',
        repo: 'repo',
      };
    case 'CONNECTION':
      return {
        ...state,
        isConnected: action.payload,
      };
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        backgroundColor: API_RESULT.white,
        errorType: null,
        errorText: null,
      };
    case 'SET_REPO':
      return {
        ...state,
        repo: action.payload,
        backgroundColor: API_RESULT.white,
        errorType: null,
        errorText: null,
      };
    default:
      return INITIAL_STATE;
  }
};
