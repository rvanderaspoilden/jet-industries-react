import React, {createContext, useState} from "react";
import Loader from "../components/loader/loader.component";

export type LoaderContextType = {
    show: VoidFunction,
    hide: VoidFunction
}

type LoaderContextProviderProps = {
    children: JSX.Element
}

const LoaderContext = createContext<LoaderContextType>(undefined);

export function useLoader(): LoaderContextType {
    return React.useContext(LoaderContext);
}

export const LoaderContextProvider = ({children}: LoaderContextProviderProps) => {
    const [shown, setShown] = useState(false);

    const show = () => {
        setShown(true);
    }

    const hide = () => {
        setShown(false);
    }

    const value = {show, hide};

    return (
        <LoaderContext.Provider value={value}>
            {children}
            {shown && (<Loader/>)}
        </LoaderContext.Provider>
    );
}
