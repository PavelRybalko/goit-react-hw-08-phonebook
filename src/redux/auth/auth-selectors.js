const getIsLoggedIn = state => state.auth.isLoggedIn;

const getUsername = state => state.auth.user.name;

const getIsFetchingCurrentUser = state => state.auth.isFetchingCurrentUser;

const exportModule = { getIsLoggedIn, getUsername, getIsFetchingCurrentUser };

export default exportModule;
