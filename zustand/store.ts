import {create as createStore} from 'zustand';

interface StoreState {
    message: string;
    setMessage: (message: string) => void;

    isFetching: boolean;
    setIsFetching: (isFetching: boolean) => void;
}

const useStore = createStore<StoreState>((set) => ({
    message: "",
    setMessage: (message: string) => set({message}),

    isFetching: false,
    setIsFetching: (isFetching: boolean) => set({isFetching}),
}))

export default useStore;