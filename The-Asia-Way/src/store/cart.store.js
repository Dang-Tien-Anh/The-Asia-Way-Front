import { create } from "zustand";
import { useMemo } from "react";
import { ORDER_ITEM_STATUS } from "./status"; // import enums

export const useCartStore = create((set, get) => ({
    items: [],
    orders: [],
    customerTable: null,

    // Save table number
    setTable: (table) => set({ customerTable: table }),

    // Cart actions
    addItem: (item, quantity = 1, options) => {
        set((state) => {
            const index = state.items.findIndex((entry) => entry.item.id === item.id);
            if (index >= 0) {
                const items = [...state.items];
                items[index] = {
                    ...items[index],
                    quantity: items[index].quantity + quantity,
                    options: options ?? items[index].options,
                };
                return { items };
            }
            // ✅ keep type with item
            return { items: [...state.items, { item, quantity, options, type: item.type }] };
        });
    },

    removeItem: (itemId) =>
        set((state) => ({
            items: state.items.filter((entry) => entry.item.id !== itemId),
        })),

    updateQuantity: (itemId, quantity) =>
        set((state) => ({
            items: state.items
                .map((entry) =>
                    entry.item.id === itemId ? { ...entry, quantity } : entry
                )
                .filter((entry) => entry.quantity > 0),
        })),

    clearCart: () => set({ items: [] }),

    // Place order
    placeOrder: (customer = {}) => {
        const state = get();
        if (state.items.length === 0) return null;

        const order = {
            id: `order_${Date.now()}`,
            items: state.items.map((it) => ({
                ...it,
                status: ORDER_ITEM_STATUS.PENDING, // ✅ each item starts as PENDING
            })),
            total: state.items.reduce((s, i) => s + i.item.price * i.quantity, 0),
            customer: { ...customer, table: state.customerTable },
            createdAt: new Date().toISOString(),
            status: ORDER_ITEM_STATUS.PENDING, // ✅ overall order status
        };

        set({ orders: [order, ...state.orders], items: [] });
        return order;
    },

    // Update order status
    // updateOrderStatus now supports per-item updates
    updateOrderStatus: (orderId, newStatus, itemId = null) =>
        set((state) => ({
            orders: state.orders.map((o) => {
                if (o.id !== orderId) return o;

                return {
                    ...o,
                    items: o.items.map((it) => {
                        if (itemId && it.item.id === itemId) {
                            return { ...it, status: newStatus };
                        }
                        if (!itemId) {
                            return { ...it, status: newStatus };
                        }
                        return it;
                    }),
                };
            }),
        })),


    getSubtotal: () =>
        get().items.reduce(
            (sum, item) => sum + item.item.price * item.quantity,
            0
        ),
}));

// Hook
export const useCart = () => {
    const items = useCartStore((s) => s.items);
    const addItem = useCartStore((s) => s.addItem);
    const removeItem = useCartStore((s) => s.removeItem);
    const updateQuantity = useCartStore((s) => s.updateQuantity);
    const clearCart = useCartStore((s) => s.clearCart);
    const setTable = useCartStore((s) => s.setTable);
    const customerTable = useCartStore((s) => s.customerTable);

    const cart = useMemo(
        () =>
            items.map((it) => ({
                id: it.item.id,
                name: it.item.name,
                desc: it.item.description || it.item.name,
                price: it.item.price,
                quantity: it.quantity,
                type: it.type, // ✅ keep type visible in cart
            })),
        [items]
    );

    const totalPrice = useMemo(
        () => items.reduce((sum, i) => sum + i.item.price * i.quantity, 0),
        [items]
    );

    const orders = useCartStore((s) => s.orders);
    const placeOrder = useCartStore((s) => s.placeOrder);
    const updateOrderStatus = useCartStore((s) => s.updateOrderStatus);

    return {
        cart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalPrice,
        orders,
        placeOrder,
        updateOrderStatus,
        setTable,
        customerTable,
    };
};
