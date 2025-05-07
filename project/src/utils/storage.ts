import { Item, Category } from '../types';

// Save items to localStorage
export const saveItems = (items: Item[]): void => {
  localStorage.setItem('items', JSON.stringify(items));
};

// Get items from localStorage
export const getItems = (): Item[] => {
  const items = localStorage.getItem('items');
  return items ? JSON.parse(items) : [];
};

// Save categories to localStorage
export const saveCategories = (categories: Category[]): void => {
  localStorage.setItem('categories', JSON.stringify(categories));
};

// Get categories from localStorage
export const getCategories = (): Category[] => {
  const categories = localStorage.getItem('categories');
  return categories 
    ? JSON.parse(categories) 
    : [
        { id: '1', name: 'Work', color: '#3B82F6' },
        { id: '2', name: 'Personal', color: '#10B981' },
        { id: '3', name: 'Ideas', color: '#8B5CF6' },
        { id: '4', name: 'Projects', color: '#F97316' },
      ];
};