import { Store, GetterTree, ActionTree, MutationTree } from 'vuex';
import { login, post } from '@/src/requests';
import { get } from '@/src/requests';
import { User } from '@/src/User';

export const state = () => ({
    authToken: "",
    stateUser: <User>{},
});

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
    async login({ state }, details: { email: string, password: string }) {
        try {
            const res: { accessToken: string } = await login('/login', details)

            //this is not allowed, you have to commit this to a mutation instead
            //state.authToken = res.accessToken;
            
            this.commit('setToken', res.accessToken);

            this.commit('setStateUser', await get('/users/user'));

            console.log(state.authToken + " " + state.stateUser);
        } catch (e) {
            console.error(e);
        }
    }
};
