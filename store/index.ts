export const state = () => ({
    authToken: <string>null,
});

export const getters = {
    getAuthToken(state) {
        return state.authToken;
    }
};

export const mutations = {
};

export const actions = {
    async login({ state }, email: string, password: string) {
    }
};
