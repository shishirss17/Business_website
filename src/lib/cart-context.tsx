"use client";

import React, { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import type { CartItem, Product } from './types';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';
import Link from 'next/link';

type CartState = {
  items: CartItem[];
};

type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: { id: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { id:string; quantity: number } }
  | { type: 'SET_STATE'; payload: CartState };

const CartContext = createContext<{
  state: CartState;
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  itemCount: number;
  cartTotal: number;
} | undefined>(undefined);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.product.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.product.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { product: action.payload, quantity: 1 }],
      };
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.product.id !== action.payload.id),
      };
    case 'UPDATE_QUANTITY': {
        if (action.payload.quantity <= 0) {
            return {
                ...state,
                items: state.items.filter(item => item.product.id !== action.payload.id),
            }
        }
        return {
            ...state,
            items: state.items.map(item =>
                item.product.id === action.payload.id
                ? { ...item, quantity: action.payload.quantity }
                : item
            ),
        };
    }
    case 'SET_STATE':
        return action.payload;
    default:
      return state;
  }
}

const initialState: CartState = {
  items: [],
};

export function CartProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('cuddle_cart');
      if (storedCart) {
        dispatch({ type: 'SET_STATE', payload: JSON.parse(storedCart) });
      }
    } catch (error) {
      console.error("Could not load cart from local storage", error);
    }
  }, []);

  useEffect(() => {
    try {
        if(state !== initialState){
            localStorage.setItem('cuddle_cart', JSON.stringify(state));
        }
    } catch (error) {
        console.error("Could not save cart to local storage", error);
    }
  }, [state]);

  const addToCart = (product: Product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
    toast({
        title: "Added to Cart!",
        description: `${product.name} is now in your cart.`,
        action: <ToastAction altText="Checkout" asChild><Link href="/checkout">Checkout</Link></ToastAction>,
    })
  };

  const removeFromCart = (id: string) => {
    const item = state.items.find(item => item.product.id === id);
    if (item) {
        dispatch({ type: 'REMOVE_ITEM', payload: { id } });
        toast({
            title: "Item Removed",
            description: `${item.product.name} has been removed from your cart.`,
            variant: "destructive"
        })
    }
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = state.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ state, addToCart, removeFromCart, updateQuantity, itemCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
