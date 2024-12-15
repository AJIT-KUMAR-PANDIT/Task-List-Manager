import React, { useEffect, useRef } from 'react';
import { TabulatorFull as Tabulator } from 'tabulator-tables';
import "tabulator-tables/dist/css/tabulator.min.css";
import { useTaskStore } from '../../store/taskStore';
import toast from 'react-hot-toast';

export const TabulatorTable = () => {
  const tableRef = useRef(null);
  const { tasks, updateTask, deleteTask, filterStatus, searchQuery } = useTaskStore();

  const statusOptions = ['To Do', 'In Progress', 'Done'];

  useEffect(() => {
    if (!tableRef.current) return;

    const table = new Tabulator(tableRef.current, {
      data: tasks,
      layout: "fitColumns",
      responsiveLayout: "collapse",
      columns: [
        { title: "ID", field: "id", width: 70, headerSort: true },
        {
          title: "Title",
          field: "title",
          editor: "input",
          headerSort: true,
          validator: ["required", "string"],
          width: 200
        },
        {
          title: "Description",
          field: "description",
          editor: "input",
          headerSort: true,
          validator: ["required", "string"],
          width: 250
        },
        {
          title: "Status",
          field: "status",
          editor: "select",
          editorParams: {
            values: statusOptions
          },
          headerSort: true,
          formatter: function(cell) {
            const value = cell.getValue();
            const colors = {
              'Done': 'bg-green-100 text-green-800',
              'In Progress': 'bg-yellow-100 text-yellow-800',
              'To Do': 'bg-gray-100 text-gray-800'
            };
            return `<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${colors[value]}">${value}</span>`;
          }
        },
        {
          title: "Actions",
          formatter: function(cell) {
            return '<button class="delete-btn text-red-600 hover:text-red-900">Delete</button>';
          },
          width: 100,
          hozAlign: "center",
          cellClick: function(e, cell) {
            if (e.target.classList.contains('delete-btn')) {
              const row = cell.getRow();
              const id = row.getData().id;
              deleteTask(id);
              toast.success('Task deleted successfully');
            }
          }
        }
      ],
      cellEdited: function(cell) {
        const row = cell.getRow();
        const data = row.getData();
        updateTask(data.id, data);
        toast.success('Task updated successfully');
      }
    });

    // Apply filters when filterStatus or searchQuery changes
    if (filterStatus !== 'All') {
      table.setFilter("status", "=", filterStatus);
    } else {
      table.clearFilter();
    }

    if (searchQuery) {
      table.setFilter([
        [
          { field: "title", type: "like", value: searchQuery },
          { field: "description", type: "like", value: searchQuery }
        ]
      ]);
    }

    return () => {
      table.destroy();
    };
  }, [tasks, filterStatus, searchQuery]);

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div ref={tableRef} className="tabulator"></div>
    </div>
  );
};