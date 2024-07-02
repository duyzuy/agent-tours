"use client";
import { ModalsManagerContext } from "../context";
import { useReducer } from "react";

import {
    modalManagerReducer,
    initModalManager,
} from "../reducers/modalManagerReducer";
type Props = {
    children?: React.ReactNode;
};

export const ModalManagerProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(modalManagerReducer, initModalManager);
    return (
        <ModalsManagerContext.Provider value={[state, dispatch]}>
            {children}
        </ModalsManagerContext.Provider>
    );
};
