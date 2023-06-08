import {create as createStore} from 'zustand';

const useStore = createStore((set) => ({
    message: "",

    setMessage: (message: string) => set({message}),
}))

export default useStore;