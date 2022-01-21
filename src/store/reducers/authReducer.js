const initialState = {
  Data: {
    ID: '',
    CompanyID: '',
    CompanyName: '',
    CompanyCode: '',
    Token: ''
  }
};
  
const authReducer = (state = initialState, action) => {
const { type, payload } = action;
  switch (type) {
      case "ADD":
      return {
          ...state,
          ID: payload.ID,
          CompanyID: payload.CompanyID,
          CompanyName: payload.CompanyName,
          CompanyCode: payload.CompanyCode,
          Token: payload.Token
      };
      case "DEL":
      return initialState;
      default:
      return state;
  }
};

export default authReducer;