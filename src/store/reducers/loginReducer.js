const initialState = {
  ID: '',
  RoleID: '',
  Role: {
    Name: ''
  },
  FirstName: '',
  LastName: '',
  Account: {
    Email: '',
    FcmToken: '',
  },
  Department: '',
  Position: '',
  CompanyID: '',
  CompanyName: '',
  CompanyCode: '',
  Token: ''
};

const loginReducer = (state = initialState, action) => {
  const { type, payload } = action;
  console.log(action);
  switch (type) {
        case "ADD":
        return {
            ...state,
            ID: payload.ID,
            RoleID: payload.RoleID,
            Role: {
              Name: payload.Role.Name
            },
            FirstName: payload.FirstName,
            LastName: payload.LastName,
            Account: {
              Email: payload.Account.Email,
              FcmToken: payload.Account.FcmToken,
            },
            Department: payload.Department,
            Position: payload.Position,
            CompanyID: payload.CompanyID,
            CompanyName: payload.CompanyName,
            CompanyCode: payload.CompanyCode,
            Token: payload.Token
        };
        case "DEL":
          return initialState;
        default:
          return {
            ...state
          };
    }
  };

export default loginReducer;

// import { Reducer } from 'redux';
// import { LoginActionTypes, LoginActions } from '../actions/loginActions';

// export interface ILoginState {
//   ErrorMessage: string,
//   ID: string,
//   RoleID: string,
//   Role: {
//     Name: string
//   },
//   FirstName: string,
//   LastName: string,
//   Account: {
//     Email: string,
//     FcmToken: string,
//   },
//   Department: string,
//   Position: string,
//   CompanyID: string,
//   CompanyName: string,
//   CompanyCode: string,
//   Token: string
// }

// const initialLoginState: ILoginState = {
//   ErrorMessage: '',
//   ID: '',
//   RoleID: '',
//   Role: {
//     Name: ''
//   },
//   FirstName: '',
//   LastName: '',
//   Account: {
//     Email: '',
//     FcmToken: '',
//   },
//   Department: '',
//   Position: '',
//   CompanyID: '',
//   CompanyName: '',
//   CompanyCode: '',
//   Token: ''
// };

// export const dogReducer: Reducer<ILoginState, LoginActions> = (
//     state = initialLoginState,
//     action
//   ) => {
//     switch (action.type) {
//       case LoginActionTypes.ADD: {
//         return {
//           ...state,
//           ID: action.ID,
//           RoleID: action.RoleID,
//           Role: {
//             Name: action.Role.Name
//           },
//           FirstName: action.FirstName,
//           LastName: action.LastName,
//           Account: {
//             Email: action.Account.Email,
//             FcmToken: action.Account.FcmToken,
//           },
//           Department: action.Department,
//           Position: action.Position,
//           CompanyID: action.CompanyID,
//           CompanyName: action.CompanyName,
//           CompanyCode: action.CompanyCode,
//           Token: action.Token
//         };
//       }
//       case LoginActionTypes.ERROR: {
//         return {
//           ...state,
//           ErrorMessage: action.errorMessage
//         }
//       }
//       default:
//         return state;
//     }
//   };
