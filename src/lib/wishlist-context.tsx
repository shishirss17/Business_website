"use client";

import React, { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import type { Product } from './types';
import { useToast } from '@/hooks/use-toast';

type WishlistState = {
    items: Product[];
};

type WishlistAction =
    | { type: 'ADD_ITEM'; payload: Product }
    | { type: 'REMOVE_ITEM'; payload: { id: string } }
    | { type: 'SET_STATE'; payload: WishlistState };

const WishlistContext = createContext<{
    items: Product[];
    addToWishlist: (product: Product) => void;
    removeFromWishlist: (id: string) => void;
    toggleWishlist: (product: Product) => void;
    isInWishlist: (id: string) => boolean;
    wishlistCount: number;
} | undefined>(undefined);

function wishlistReducer(state: WishlistState, action: WishlistAction): WishlistState {
    switch (action.type) {
        case 'ADD_ITEM': {
            if (state.items.find(item => item.id === action.payload.id)) {
                return state;
            }
            return {
                ...state,
                items: [...state.items, action.payload],
            };
        }
        case 'REMOVE_ITEM':
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload.id),
            };
        case 'SET_STATE':
            return action.payload;
        default:
            return state;
    }
}

const initialState: WishlistState = {
    items: [],
};

export function WishlistProvider({ children }: { children: ReactNode }) {
    const { toast } = useToast();
    const [state, dispatch] = useReducer(wishlistReducer, initialState);

    useEffect(() => {
        try {
            const storedWishlist = localStorage.getItem('cuddle_wishlist');
            if (storedWishlist) {
                dispatch({ type: 'SET_STATE', payload: JSON.parse(storedWishlist) });
            }
        } catch (error) {
            console.error("Could not load wishlist from local storage", error);
        }
    }, []);

    useEffect(() => {
        try {
            if (state !== initialState) {
                localStorage.setItem('cuddle_wishlist', JSON.stringify(state));
            }
        } catch (error) {
            console.error("Could not save wishlist to local storage", error);
        }
    }, [state]);

    const addToWishlist = (product: Product) => {
        dispatch({ type: 'ADD_ITEM', payload: product });
        toast({
            title: "Added to Wishlist!",
            description: `${product.name} is now in your wishlist.`,
        });
    };

    const removeFromWishlist = (id: string) => {
        const item = state.items.find(item => item.id === id);
        if (item) {
            dispatch({ type: 'REMOVE_ITEM', payload: { id } });
            toast({
                title: "Removed from Wishlist",
                description: `${item.name} has been removed from your wishlist.`,
            });
        }
    };

    const toggleWishlist = (product: Product) => {
        if (isInWishlist(product.id)) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    const isInWishlist = (id: string) => {
        return state.items.some(item => item.id === id);
    };

    const wishlistCount = state.items.length;

    return (
        <WishlistContext.Provider value={{
            items: state.items,
            addToWishlist,
            removeFromWishlist,
            toggleWishlist,
            isInWishlist,
            wishlistCount
        }}>
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlist() {
    const context = useContext(WishlistContext);
    if (context === undefined) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
}
