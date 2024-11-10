import {  UPDATE_ITEM_DETAILS,  REMOVE_FROM_CART } from './actions';

const initialState = {
    cart: [],
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return {
                ...state,
                cart: [...state.cart, action.payload]
            };

        case UPDATE_ITEM_DETAILS:
            return {
                ...state,
                cart: state.cart.map(item =>
                    item.id === action.payload.id
                        ? {
                            ...item,
                            nights: action.payload.nights,
                            people: action.payload.people,
                            totalPrice: item.price * action.payload.nights * action.payload.people
                        }
                        : item
                )
            };
        
        case REMOVE_FROM_CART:
            return {
                ...state,
                cart: state.cart.filter(item => item.id !== action.payload),
            };
        default:
            return state;
    }
};

export default cartReducer;
