export const ADD_TO_CART = 'ADD_TO_CART';
export const UPDATE_ITEM_DETAILS = 'UPDATE_ITEM_DETAILS';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

export const addToCart = (hotelWithDetails) => ({
    type: ADD_TO_CART,
    payload:hotelWithDetails
        
    
});

export const updateItemDetails = (id, nights, people) => ({
    type: UPDATE_ITEM_DETAILS,
    payload: { id, nights, people }
});

export const removeFromCart = (id) => ({
    type: REMOVE_FROM_CART,
    payload: id,
});
