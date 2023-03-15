import type Task from "@/types/task";
import { acceptHMRUpdate, defineStore } from "pinia";
import { uid } from "uid";

export const useTaskStore = defineStore("Tasks", {
  state: () => {
    return {
      tasks: <Task[]>[],
    };
  },
  actions: {
    addNewTask(task: Task) {
      task.id = uid();
      this.tasks.push(task);
    },

    removeTask(id: string) {
      // tasks.splice(tasks.indexOf(task), 1)
      this.tasks = this.tasks.filter((t) => t.id !== id);
    },

    markDone(id: string) {
      let task = this.tasks.find((t) => t.id === id);
      if (task) task.done = !task.done;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTaskStore, import.meta.hot));
}
