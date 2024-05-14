export default (state, action) => {
  switch (action.type) {
      case 'GET_USER':
          return {
              ...state,
              loading: false,
              user: action.payload,
          }
      case 'REFRSH_TOKEN':
          return {
              ...state,
              loading: false,
              token: action.payload,
          }
      case 'LOGIN_USER':
          return {
              ...state,
              loading: false,
              user: [...state.user, action.payload],
          }
      case 'REGISTER_USER':
          return {
              ...state,
              loading: false,
              user: action.payload
          }
      case 'USER_ERROR':
          return {
              ...state,
              error: action.payload
          }
        case 'ADD_PROFILE':
            return {
              ...state,
              loading: false,
              user: action.payload
          }
      case 'GET_ALL_USERS':
          return {
              ...state,
              loading: false,
              user: action.payload,
          }
      case 'EDIT_PROFILE':
          return {
              ...state,
              user: [...state.user, action.payload]
          }
      default:
          return state;
  }
}