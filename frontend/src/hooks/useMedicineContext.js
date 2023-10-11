import {  MedicineContext } from "../views/Admin/Medicine/components/Context";
import { useContext } from "react";

export const useMedicineContext = () => {
    const context =useContext(MedicineContext);
    
    if(!context){
        throw Error('Custom:useMedicineContext should be used inside an MedicineContextProvider')
    }
    return context;
};
