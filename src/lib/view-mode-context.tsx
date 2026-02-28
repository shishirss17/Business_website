"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type ViewMode = 'user' | 'admin';

interface ViewModeContextType {
    viewMode: ViewMode;
    setViewMode: (mode: ViewMode) => void;
    isAdminView: boolean;
}

const ViewModeContext = createContext<ViewModeContextType | undefined>(undefined);

export function ViewModeProvider({ children }: { children: React.ReactNode }) {
    const [viewMode, setViewModeState] = useState<ViewMode>('user');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Load view mode from localStorage
        const savedMode = localStorage.getItem('viewMode') as ViewMode;
        if (savedMode === 'admin' || savedMode === 'user') {
            setViewModeState(savedMode);
        }
    }, []);

    const setViewMode = (mode: ViewMode) => {
        setViewModeState(mode);
        if (mounted) {
            localStorage.setItem('viewMode', mode);
        }
    };

    return (
        <ViewModeContext.Provider
            value={{
                viewMode,
                setViewMode,
                isAdminView: viewMode === 'admin',
            }}
        >
            {children}
        </ViewModeContext.Provider>
    );
}

export function useViewMode() {
    const context = useContext(ViewModeContext);
    if (context === undefined) {
        throw new Error('useViewMode must be used within a ViewModeProvider');
    }
    return context;
}
