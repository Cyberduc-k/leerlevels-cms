import { GetterTree, ActionTree, MutationTree } from 'vuex';
import Vuex from 'vuex';
import { post } from '@/src/requests';
import { get } from '@/src/requests';
import { User } from '@/src/User';

export const state = () => {
    const authToken = sessionStorage.getItem("authToken") ?? "";
    const stateUser = JSON.parse(sessionStorage.getItem("stateUser") ?? "{}");

    return {
        authToken,
        stateUser: <User>stateUser,
    };
};

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
    setToken(state, token) {
        state.authToken = token;
        sessionStorage.setItem("authToken", token);
    },
    setStateUser(state, user) {
        state.stateUser = user;
        sessionStorage.setItem("stateUser", JSON.stringify(user));
    }
};

export const store = new Vuex.Store({
    state: state(),
    getters: { ...getters },
    mutations: { ...mutations }
});

export const actions: ActionTree<RootState, RootState> = {
    async login({ }, details: { email: string, password: string }): Promise<boolean> {
        try {
            const res: { accessToken: string } = await post('/login', details);

            store.commit('setToken', res.accessToken);
            this.commit('setToken', res.accessToken);
            
            const user: User = await get('/users/user');
            
            store.commit('setStateUser', user);
            this.commit('setStateUser', user);

            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    },
};