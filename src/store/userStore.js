import { create } from 'zustand';

const useStore = create((set) => ({
    user: null,
    setUser: (userData) => set({ user: userData }), // Acción para modificar el estado
}));

export default useStore;
