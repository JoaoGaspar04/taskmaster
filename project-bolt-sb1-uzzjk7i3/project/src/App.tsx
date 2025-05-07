import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import ItemCard from './components/ItemCard';
import CreateItemDialog from './components/CreateItemDialog';
import ManageCategoriesDialog from './components/ManageCategoriesDialog';
import SettingsDialog from './components/SettingsDialog';
import { Item } from './types';
import { getItems, saveItems } from './utils/storage';

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', isDarkMode.toString());
  }, [isDarkMode]);

  useEffect(() => {
    const savedItems = getItems();
    setItems(savedItems);
  }, []);

  useEffect(() => {
    let filtered = [...items];
    
    if (activeCategory !== 'all') {
      if (activeCategory.startsWith('category-')) {
        const categoryId = activeCategory.replace('category-', '');
        filtered = filtered.filter(item => item.category === categoryId);
      } else {
        filtered = filtered.filter(item => item.type === activeCategory);
      }
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        item => 
          item.title.toLowerCase().includes(term) || 
          item.description.toLowerCase().includes(term)
      );
    }
    
    filtered.sort((a, b) => {
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      if (a.priority !== b.priority) {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      
      if (a.dueDate && b.dueDate) {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      } else if (a.dueDate) {
        return -1;
      } else if (b.dueDate) {
        return 1;
      }
      
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    
    setFilteredItems(filtered);
  }, [items, activeCategory, searchTerm]);

  const handleAddItem = (item: Item) => {
    let updatedItems;
    
    if (items.some(i => i.id === item.id)) {
      updatedItems = items.map(i => (i.id === item.id ? item : i));
    } else {
      updatedItems = [...items, item];
    }
    
    setItems(updatedItems);
    saveItems(updatedItems);
    setEditingItem(null);
  };

  const handleToggleComplete = (id: string) => {
    const updatedItems = items.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    
    setItems(updatedItems);
    saveItems(updatedItems);
  };

  const handleDeleteItem = (id: string) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
    saveItems(updatedItems);
  };

  const handleEditItem = (item: Item) => {
    setEditingItem(item);
    document.getElementById('create-item-dialog')?.showModal();
  };

  const handleCloseItemDialog = () => {
    document.getElementById('create-item-dialog')?.close();
    setEditingItem(null);
  };

  const handleCloseCategoriesDialog = () => {
    document.getElementById('manage-categories-dialog')?.close();
  };

  const handleCloseSettingsDialog = () => {
    document.getElementById('settings-dialog')?.close();
  };

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <Layout
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        isSidebarCollapsed={isSidebarCollapsed}
        setIsSidebarCollapsed={setIsSidebarCollapsed}
      >
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {activeCategory === 'all' 
              ? 'All Items' 
              : activeCategory.startsWith('category-')
                ? `Category Items`
                : `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}s`}
            <span className="text-gray-500 dark:text-gray-400 text-base font-normal ml-2">
              ({filteredItems.length})
            </span>
          </h1>
          
          {filteredItems.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-8 text-center">
              <p className="text-gray-500 dark:text-gray-400 mb-4">No items found.</p>
              <button
                onClick={() => document.getElementById('create-item-dialog')?.showModal()}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Create your first item
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredItems.map(item => (
                <ItemCard
                  key={item.id}
                  item={item}
                  onToggleComplete={handleToggleComplete}
                  onEdit={handleEditItem}
                  onDelete={handleDeleteItem}
                />
              ))}
            </div>
          )}
        </div>
      </Layout>
      
      <CreateItemDialog
        addItem={handleAddItem}
        editItem={editingItem}
        onClose={handleCloseItemDialog}
      />
      
      <ManageCategoriesDialog
        onClose={handleCloseCategoriesDialog}
      />

      <SettingsDialog
        onClose={handleCloseSettingsDialog}
      />
    </div>
  );
}

export default App;