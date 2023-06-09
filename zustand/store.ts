import {create as createStore} from 'zustand';

interface StoreState {
    message: string;
    setMessage: (message: string) => void;
}

const useStore = createStore((set) => ({
    message: "",

    setMessage: (message: string) => set({message}),
}))

export default useStore;