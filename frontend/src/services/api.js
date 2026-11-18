import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// Attach the token to every request if the user is logged in
API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

// Auth
export const registerUser = async (data) =>
  (await API.post("/auth/register", data)).data;
export const loginUser = async (data) =>
  (await API.post("/auth/login", data)).data;

// Jobs
export const fetchJobs = async () => (await API.get("/jobs")).data;
export const createJob = async (jobData) =>
  (await API.post("/jobs", jobData)).data;
export const updateJob = async (id, jobData) =>
  (await API.put(`/jobs/${id}`, jobData)).data;
export const deleteJob = async (id) => (await API.delete(`/jobs/${id}`)).data;
export const fetchStats = async () => (await API.get("/jobs/stats")).data;
