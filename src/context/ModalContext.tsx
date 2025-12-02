"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type ModalContextType = {
    isModalOpen: boolean;
    setModalOpen: (open: boolean) => void;
    isServicesInView: boolean;
    setServicesInView: (inView: boolean) => void;
    isPortfolioInView: boolean;
    setPortfolioInView: (inView: boolean) => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
    const [isModalOpen, setModalOpen] = useState(false);
    const [isServicesInView, setServicesInView] = useState(false);
    const [isPortfolioInView, setPortfolioInView] = useState(false);

    return (
        <ModalContext.Provider value={{
            isModalOpen,
            setModalOpen,
            isServicesInView,
            setServicesInView,
            isPortfolioInView,
            setPortfolioInView
        }}>
            {children}
        </ModalContext.Provider>
    );
}

export function useModal() {
    const context = useContext(ModalContext);
    if (context === undefined) {
        throw new Error("useModal must be used within a ModalProvider");
    }
    return context;
}
