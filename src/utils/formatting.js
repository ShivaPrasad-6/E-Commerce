import date from 'dayjs';

export function formatPrice(price){
    return `$${(price / 100).toFixed(2)}`;
}

export function formatDate(dateString) {
    return date(dateString).format('dddd, MMMM D');
}

export function cartQuantity(cart) {
    if (cart && Array.isArray(cart)) {
        return cart.reduce((total, item) => total + item.quantity, 0);
    }
    return 0;
}