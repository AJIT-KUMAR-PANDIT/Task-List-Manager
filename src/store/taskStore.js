import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useTaskStore = create(
  persist(
    (set) => ({
      tasks: [],
      filterStatus: 'All',
      searchQuery: '',

      setTasks: (tasks) => set({ tasks }),
      
      addTask: (task) => set((state) => ({
        tasks: [...state.tasks, { ...task, id: Math.max(...state.tasks.map(t => t.id), 0) + 1 }]
      })),
      
      updateTask: (id, updates) => set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === id ? { ...task, ...updates } : task
        )
      })),
      
      deleteTask: (id) => set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id)
      })),
      
      setFilterStatus: (status) => set({ filterStatus: status }),
      
      setSearchQuery: (query) => set({ searchQuery: query })
    }),
    {
      name: 'task-storage',
      partialize: (state) => ({ tasks: state.tasks }),
    }
  )
);