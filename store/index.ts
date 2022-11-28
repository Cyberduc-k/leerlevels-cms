import { GetterTree, ActionTree, MutationTree } from 'vuex';
import { post } from '@/src/requests';

export const state = () => ({
    authToken: "",
});

export type RootState = ReturnType<typeof state>;

export const getters: GetterTree<RootState, RootState> = {
    getAuthToken(state) {
        return state.authToken;
    }
};

export const mutations: MutationTree<RootState> = {
};

export const actions: ActionTree<RootState, RootState> = {
    async login({ state }, details: { email: string, password: string }) {
        try {
            const res: { accessToken: string } = await post('login', details);

            state.authToken = res.accessToken;
        } catch (e) {
            console.error(e);
        }
    }
};
