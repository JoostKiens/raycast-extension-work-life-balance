import { useReducer, useMemo } from 'react'

export interface Item {
  key: string;
  title: string;
  success?: boolean;
  script: string;
  error?: Error
}

export interface State {
  items: Item[];
  error?: Error;
  done?: boolean;
  isLoading?: boolean
}

type Action =
  | { type: 'request', payload: { index: number } }
  | { type: 'setSuccess', payload: { index: number } }
  | { type: 'setError', payload: { index: number, error: Error } }
  | { type: 'failure', payload: { error: Error }}
  | { type: 'done' };

interface Api {
  setSuccess: (index: number) => void;
  request: (index: number) => void;
  setError: (index: number, error: Error) => void;
  failure: (error: Error) => void;
  done: () => void;
}

function storeReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'request':
      return {
        ...state,
        items: state.items.map((x, i) => (action.payload.index === i ? { ...x, isLoading: true } : x)),
      }
    case 'setSuccess':
      return {
        ...state,
        isLoading: false,
        items: state.items.map((x, i) => (action.payload.index === i ? { ...x, success: true } : x)),
      }
    case 'setError':
      return {
        ...state,
        isLoading: false,
        items: state.items.map((x, i) => (
          action.payload.index === i
            ? { ...x, error: formatErrorMessage(action.payload.error) }
            : x
        )),
      }
    case 'failure':
      return {
        ...state,
        isLoading: false,
        error:  formatErrorMessage(action.payload.error)
    }
    case 'done':
      return { ...state, done: true }
  }
}

function formatErrorMessage(error: Error) {
  return  error instanceof Error ?  error : new Error("Something went wrong")
}

export const useStore = (initialState: State): [State, Api] => {
  const [state, dispatch] = useReducer(storeReducer, initialState);
  const api = useMemo(
      () => ({
        setSuccess : (index: number) => { dispatch({ type:'setSuccess', payload: { index } }) },
        request : (index: number) => { dispatch({ type:'request', payload: { index } }) },
        setError : (index: number, error: Error) => { dispatch({ type:'setError', payload: { index, error } }) },
        failure : (error: Error) => { dispatch({ type:'failure', payload: { error } }) },
        done : () => { dispatch({ type:'done' }) },
      }),
      []
    )

  return [state, api]
}
