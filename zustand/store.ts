import {create as createStore} from 'zustand';

interface StoreState {
    message: string;
    setMessage: (message: string) => void;
}

const useStore = createStore<StoreState>((set) => ({
    message: "",

    setMessage: (message: string) => set({message}),
}))

export default useStore;