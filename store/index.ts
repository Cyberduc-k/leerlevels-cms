import { GetterTree, ActionTree, MutationTree } from 'vuex';
import Vuex from 'vuex';
import { post } from '@/src/requests';
import { get } from '@/src/requests';
import { User } from '@/src/User';

export const state = () => ({
    authToken: "",
    stateUser: <User>{},
});

export const store = new Vuex.Store({
    state: {
        authToken: "",
        stateUser: <User>{},
    },
    getters: {
        getAuthToken(state) {
            return state.authToken;
        },
        getStateUser(state) {
            return state.stateUser;
        }
    },
    mutations: {
        setToken(state, token) {
            state.authToken = token;
        },
        setStateUser(state, user){
            state.stateUser = user;
        }
    }
})

export type RootState = ReturnType<typeof state>;

export const getters: GetterTree<RootState, RootState> = {
    getAuthToken(state) {
        return state.authToken;
    },
    getStateUser(state) {
        return state.stateUser;
    }
};

export const mutations: MutationTree<RootState> = {
    setToken (state, token) {
        state.authToken = token;
    },
    setStateUser(state, user){
        state.stateUser = user;
    }
};

export const actions: ActionTree<RootState, RootState> = {
    async login({ state, commit, rootState }, details: { email: string, password: string }) {
        try {
            const res: { accessToken: string } = await post('/login', details)

            store.commit('setToken', res.accessToken);
            store.commit('setStateUser', await get('/users/user'));
            
            this.commit('setToken', res.accessToken);
            this.commit('setStateUser', await get('/users/user'));

        } catch (e) {
            console.error(e);
        }
    },
};