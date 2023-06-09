import { createContext, useContext, useState } from "react";

const DataContext = createContext();

const DataProvider = ({children}) =>{
    const [auth , setauth] = useState({});

    return(
        <DataContext.Provider value={{auth, setauth}}>
                  {children}
        </DataContext.Provider>
    )
}


export default DataProvider

export const FetContext = () =>{

    return useContext(DataContext)
}

 