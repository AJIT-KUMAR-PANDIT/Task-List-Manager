import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { TaskTable } from "./components/TaskTable";
import { TaskFilters } from "./components/TaskFilters";
import { AddTaskForm } from "./components/AddTaskForm";
import { useTaskStore } from "./store/taskStore";
import { ClipboardList } from "lucide-react";

function App() {
  const { tasks, setTasks } = useTaskStore();

  useEffect(() => {
    const fetchTasks = async () => {
      if (tasks.length === 0) {
        try {
          const response = await fetch(
            "https://jsonplaceholder.typicode.com/todos?_limit=20"
          );
          const data = await response.json();

          const transformedTasks = data.map((task) => ({
            id: task.id,
            title: task.title,
            description: `Task ${task.id} description`,
            status: task.completed ? "Done" : "To Do",
          }));

          setTasks(transformedTasks);
        } catch (error) {
          console.error("Error fetching tasks:", error);
        }
      }
    };

    fetchTasks();
  }, [setTasks, tasks.length]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-right" />

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <ClipboardList className="h-8 w-8 text-indigo-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">
                Task List Manager
              </h1>
            </div>
          </div>

          <AddTaskForm />
          <TaskFilters />
          <TaskTable />
        </div>
      </div>
    </div>
  );
}

export default App;
