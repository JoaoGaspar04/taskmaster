import React, { useState, useEffect } from 'react';
import { X, Plus, Trash } from 'lucide-react';
import { Category } from '../types';
import { getCategories, saveCategories } from '../utils/storage';

interface ManageCategoriesDialogProps {
  onClose: () => void;
}

const ManageCategoriesDialog: React.FC<ManageCategoriesDialogProps> = ({ onClose }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryColor, setNewCategoryColor] = useState('#3B82F6');

  useEffect(() => {
    setCategories(getCategories());
  }, []);

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newCategoryName.trim()) return;
    
    const newCategory: Category = {
      id: crypto.randomUUID(),
      name: newCategoryName.trim(),
      color: newCategoryColor,
    };
    
    const updatedCategories = [...categories, newCategory];
    setCategories(updatedCategories);
    saveCategories(updatedCategories);
    
    // Reset form
    setNewCategoryName('');
  };

  const handleDeleteCategory = (id: string) => {
    const updatedCategories = categories.filter(category => category.id !== id);
    setCategories(updatedCategories);
    saveCategories(updatedCategories);
  };

  const predefinedColors = [
    '#3B82F6', // Blue
    '#10B981', // Green
    '#8B5CF6', // Purple
    '#F97316', // Orange
    '#EF4444', // Red
    '#0EA5E9', // Light Blue
    '#14B8A6', // Teal
    '#F59E0B', // Amber
    '#EC4899', // Pink
    '#6366F1', // Indigo
  ];

  return (
    <dialog id="manage-categories-dialog" className="bg-white rounded-lg shadow-xl p-0 w-full max-w-lg mx-auto">
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">
          Manage Categories
        </h3>
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-gray-500 focus:outline-none"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="p-6">
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Current Categories</h4>
          
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {categories.length === 0 ? (
              <p className="text-sm text-gray-500">No categories yet. Add one below!</p>
            ) : (
              categories.map((category) => (
                <div key={category.id} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-md">
                  <div className="flex items-center">
                    <div 
                      className="h-4 w-4 rounded-full mr-3" 
                      style={{ backgroundColor: category.color }}
                    ></div>
                    <span className="text-gray-800">{category.name}</span>
                  </div>
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Trash className="h-4 w-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Add New Category</h4>
          
          <form onSubmit={handleAddCategory} className="space-y-4">
            <div>
              <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700">
                Category Name
              </label>
              <input
                type="text"
                id="categoryName"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category Color
              </label>
              <div className="flex flex-wrap gap-2">
                {predefinedColors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className={`h-6 w-6 rounded-full ${newCategoryColor === color ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setNewCategoryColor(color)}
                    aria-label={`Select ${color} color`}
                  />
                ))}
                <input
                  type="color"
                  value={newCategoryColor}
                  onChange={(e) => setNewCategoryColor(e.target.value)}
                  className="h-6 w-10 border-0"
                  aria-label="Custom color"
                />
              </div>
            </div>
            
            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Category
              </button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default ManageCategoriesDialog;