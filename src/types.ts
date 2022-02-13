
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

export type Action =
  | { type: 'request', payload: { index: number } }
  | { type: 'setSuccess', payload: { index: number } }
  | { type: 'setError', payload: { index: number, error: Error } }
  | { type: 'failure', payload: { error: Error } }
  | { type: 'done' };

export interface Api {
  setSuccess: (index: number) => void;
  request: (index: number) => void;
  setError: (index: number, error: Error) => void;
  failure: (error: Error) => void;
  done: () => void;
}

export interface Msg {
  title: string
  message?: string
}