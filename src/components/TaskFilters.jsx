import React from 'react';
import { Search } from 'lucide-react';
import { useTaskStore } from '../store/taskStore';

const statusOptions = ['All', 'To Do', 'In Progress', 'Done'];

export const TaskFilters = () => {
  const { filterStatus, setFilterStatus, searchQuery, setSearchQuery, tasks } = useTaskStore();

  const statusCounts = tasks.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative flex-1 max-w-xs">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search tasks..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <select
          className="block w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status} {status !== 'All' && `(${statusCounts[status] || 0})`}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-4 flex-wrap">
        {Object.entries(statusCounts).map(([status, count]) => (
          <div
            key={status}
            className="px-4 py-2 rounded-lg bg-white shadow-sm border border-gray-200"
          >
            <span className="text-sm font-medium text-gray-600">{status}:</span>
            <span className="ml-2 text-sm font-bold text-gray-900">{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};