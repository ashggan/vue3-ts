// import { search_api } from "@/api/job";
import { search_api } from "@/api/job";
import type { Job } from "@/types/job";
import axios from "axios";
import { acceptHMRUpdate, defineStore } from "pinia";

export const useJobStore = defineStore("jobs list", {
  state: () => {
    return {
      jobs: <Job[]>[],
    };
  },
  actions: {
    async getJob() {
      try {
        await axios
          .get(search_api)
          .then((res) => (this.jobs = res.data.results));
      } catch (error) {
        console.log(error);
      }
    },
  },
});

// if (import.meta.hot) {
//   import.meta.hot.accept(acceptHMRUpdate(useJobStore, import.meta.hot));
//
