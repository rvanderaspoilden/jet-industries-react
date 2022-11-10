import React, {createContext, useState} from "react";

export const UserContext = createContext(undefined);

type UserContextProviderProps = {
    children: any
}

export function UserContextProvider(props: UserContextProviderProps) {
    const [user, setUser] = useState(undefined);

    return (
        <UserContext.Provider value={{user}}>
            {props.children}
        </UserContext.Provider>
    );
}
