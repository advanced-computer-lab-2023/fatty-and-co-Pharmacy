import { useReducer } from "react";
import { createContext } from "react";

export const MedicineContext = createContext();

export const medicinesReducer = (state, action) => {
  switch (action.type) {
    case "SET_MEDICINES":
      return {
        medicines: action.payload,
      };
    case "ADD_MEDICINE":
      return {
        medicines: [action.payload, ...state.medicines],
      };
    case "UPDATE_MEDICINE":
      return {
        medicines: state.medicines.map((Medicine) =>
          Medicine._id === action.payload._id ? action.payload : Medicine
        ),
      };
    case "DELETE_MEDICINE":
      return {
        medicines: state.medicines.filter(
          (Medicine) => Medicine._id !== action.payload
        ),
      };
    case "FILTER_MEDICINES":
      return {
        medicines: state.medicines.filter(
          (Medicine) =>
            Medicine.Active_Ingredients.some(
              (ingredient) =>
                ingredient.toLowerCase() === action.payload.toLowerCase()
            ) && Medicine.Quantity > 0
        ),
      };
    default:
      return state;
  }
};

export const MedicineContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(medicinesReducer, {
    medicines: null,
  });
  return (
    <MedicineContext.Provider value={{ ...state, dispatch }}>
      {children}
    </MedicineContext.Provider>
  );
};
