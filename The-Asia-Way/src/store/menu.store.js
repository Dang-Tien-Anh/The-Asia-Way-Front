// src/store/menu.store.js
import { create } from "zustand";

// All items with their initial availability
const ALL_ITEMS = [
    { id: 1, name: "Spring Rolls", category: "Appetizers", type: "KITCHEN", price: 5, description: "Crispy rolls with veggies.", image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80", available: true },
    { id: 2, name: "Garlic Bread", category: "Appetizers", type: "KITCHEN", price: 4, description: "Toasted bread with garlic butter.", image: "https://images.unsplash.com/photo-1598785244280-7a428600d053?q=80&w=600", available: true },
    { id: 3, name: "Edamame", category: "Appetizers", type: "INSTANT", price: 3, description: "Steamed soybeans with sea salt.", image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=600&q=80", available: true },
    { id: 4, name: "Chicken Satay", category: "Appetizers", type: "KITCHEN", price: 6, description: "Grilled skewers with peanut sauce.", image: "https://images.unsplash.com/photo-1529563021893-cc83c992d75d?w=600&q=80", available: true },
    { id: 5, name: "Grilled Chicken", category: "Main Course", type: "KITCHEN", price: 12, description: "Served with herbs and lemon.", image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?q=80&w=600", available: true },
    { id: 6, name: "Beef Steak", category: "Main Course", type: "KITCHEN", price: 18, description: "Juicy steak with pepper sauce.", image: "https://images.unsplash.com/photo-1558030006-450675393462?w=600&q=80", available: true },
    { id: 7, name: "Pho Noodle Soup", category: "Main Course", type: "KITCHEN", price: 10, description: "Vietnamese beef broth with rice noodles.", image: "https://images.unsplash.com/photo-1631709497146-a239ef373cf1?q=80&w=600", available: true },
    { id: 8, name: "Pad Thai", category: "Main Course", type: "KITCHEN", price: 11, description: "Thai stir-fried noodles with shrimp.", image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=600&q=80", available: true },
    { id: 9, name: "Kung Pao Chicken", category: "Main Course", type: "KITCHEN", price: 13, description: "Spicy Sichuan stir-fry with peanuts.", image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=600&q=80", available: true },
    { id: 10, name: "Chocolate Cake", category: "Dessert", type: "INSTANT", price: 6, description: "Rich and moist with ganache.", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80", available: true },
    { id: 11, name: "Ice Cream Sundae", category: "Dessert", type: "INSTANT", price: 5, description: "Vanilla ice cream with toppings.", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&q=80", available: true },
    { id: 12, name: "Mango Sticky Rice", category: "Dessert", type: "INSTANT", price: 7, description: "Sweet Thai dessert with coconut milk.", image: "https://images.unsplash.com/photo-1711161988375-da7eff032e45?q=80&w=600", available: true },
    { id: 13, name: "Matcha Cheesecake", category: "Dessert", type: "INSTANT", price: 8, description: "Japanese green tea infused cheesecake.", image: "https://images.unsplash.com/photo-1491226907933-45f03868ca1a?q=80&w=600", available: true },
    { id: 14, name: "C2", category: "Drinks", type: "INSTANT", price: 12, description: "Cold green tea drink.", image: "https://images.unsplash.com/photo-1576470331849-6a25a384bfd8?q=80&w=600", available: true },
    { id: 15, name: "Fresh Lemonade", category: "Drinks", type: "INSTANT", price: 3, description: "Cool and refreshing citrus drink.", image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=600&q=80", available: true },
    { id: 16, name: "Iced Coffee", category: "Drinks", type: "INSTANT", price: 4, description: "Strong coffee served cold.", image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80", available: true },
    { id: 17, name: "Bubble Tea", category: "Drinks", type: "INSTANT", price: 5, description: "Milk tea with chewy tapioca pearls.", image: "https://images.unsplash.com/photo-1558857563-b371033873b8?w=600&q=80", available: true },
    { id: 18, name: "Green Tea", category: "Drinks", type: "INSTANT", price: 2, description: "Hot or iced, earthy and soothing.", image: "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?q=80&w=600", available: true },
    { id: 19, name: "Craft Beer", category: "Drinks", type: "INSTANT", price: 6, description: "Locally brewed, crisp and refreshing.", image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=600&q=80", available: true },
];

export const CATEGORIES = ["Appetizers", "Main Course", "Dessert", "Drinks"];

export const useMenuStore = create((set, get) => ({
    items: ALL_ITEMS,

    toggleAvailability: (itemId) =>
        set((state) => ({
            items: state.items.map((item) =>
                item.id === itemId ? { ...item, available: !item.available } : item
            ),
        })),

    getByCategory: (category) =>
        get().items.filter((item) => item.category === category),
}));