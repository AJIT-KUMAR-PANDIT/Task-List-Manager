import React, { useState } from 'react';
import { Pencil, Trash2, Check, X } from 'lucide-react';
import { useTaskStore } from '../store/taskStore';

const statusOptions = ['To Do', 'In Progress', 'Done'];

export const TaskTable = () => {
  const { tasks, updateTask, deleteTask, filterStatus, searchQuery } = useTaskStore();
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus = filterStatus === 'All' || task.status === filterStatus;
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const startEditing = (task) => {
    setEditingId(task.id);
    setEditForm(task);
  };

  const saveEdit = () => {
    if (editingId && editForm.title && editForm.description && editForm.status) {
      updateTask(editingId, editForm);
      setEditingId(null);
      setEditForm({});
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredTasks.map((task) => (
            <tr key={task.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{task.id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {editingId === task.id ? (
                  <input
                    type="text"
                    className="border rounded px-2 py-1 w-full"
                    value={editForm.title || ''}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  />
                ) : task.title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {editingId === task.id ? (
                  <input
                    type="text"
                    className="border rounded px-2 py-1 w-full"
                    value={editForm.description || ''}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  />
                ) : task.description}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {editingId === task.id ? (
                  <select
                    className="border rounded px-2 py-1"
                    value={editForm.status}
                    onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                ) : (
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${task.status === 'Done' ? 'bg-green-100 text-green-800' :
                      task.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'}`}>
                    {task.status}
                  </span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                {editingId === task.id ? (
                  <div className="flex space-x-2">
                    <button
                      onClick={saveEdit}
                      className="text-green-600 hover:text-green-900"
                    >
                      <Check size={18} />
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="text-red-600 hover:text-red-900"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => startEditing(task)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};