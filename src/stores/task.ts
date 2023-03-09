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

    removeTask(task: Task) {
      // tasks.splice(tasks.indexOf(task), 1)
      this.tasks = this.tasks.filter((t) => t.id !== task.id);
    },

    markDone(task: Task) {},
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTaskStore, import.meta.hot));
}
