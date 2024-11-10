// actions.js
export const ADD_TO_CART = 'ADD_TO_CART';
export const UPDATE_ITEM_DETAILS = 'UPDATE_ITEM_DETAILS';
export const INCREASE_QUANTITY = 'INCREASE_QUANTITY';
export const DECREASE_QUANTITY = 'DECREASE_QUANTITY';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

// Дія для додавання товару до кошика
export const addToCart = (hotelWithDetails) => ({
    type: ADD_TO_CART,
    payload:hotelWithDetails
        
    
});

export const updateItemDetails = (id, nights, people) => ({
    type: UPDATE_ITEM_DETAILS,
    payload: { id, nights, people }
});
export const increaseQuantity = (id) => ({
    type: INCREASE_QUANTITY,
    payload: id,
});

export const decreaseQuantity = (id) => ({
    type: DECREASE_QUANTITY,
    payload: id,
});

export const removeFromCart = (id) => ({
    type: REMOVE_FROM_CART,
    payload: id,
});
