import { create } from "zustand";
import { isClientSide } from "./helpers";

// Initial state values
const INITIAL_STATE = {
  style: null,
  user: null,
};

// Same actions are used on server and client
const ACTIONS = (set) => {
  return {
    updateUser: (payload) => {
      return set((state) => ({ ...state, user: payload }));
    },
    clearUser: () =>
      set((state) => ({
        ...state,
        user: null,
      })),
    updateStyle: (payload) =>
      set((state) => ({
        ...state,
        style: payload,
      })),
    clearStyle: () =>
      set((state) => ({
        ...state,
        style: null,
      })),
    updatePosts: (payload) =>
      set((state) => ({
        ...state,
        posts: payload,
      })),
    updatePost: (payload) =>
      set((state) => ({
        ...state,
        post: payload,
      })),
    updateUsers: (payload) =>
      set((state) => ({
        ...state,
        users: payload,
      })),
  };
};

// Initialize new store on server that'll function as a singleton
const useStoreServer = () => {
  const newStore = create((set) => ({
    ...INITIAL_STATE,
    ...globalThis.___PREFETCHED___,
    ...ACTIONS(set),
  }));

  return newStore();
};

// Use store regularly on client
const useStoreClient = create((set) => ({
  ...INITIAL_STATE,
  ...globalThis.___PREFETCHED___,
  ...ACTIONS(set),
}));

// Return proper store depending on where rendering is taking place
export default isClientSide() ? useStoreClient : useStoreServer;
