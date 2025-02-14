import { sendRequest } from "@helpers";

export const jobService = {
  createJob: (data: unknown) => sendRequest({
    method: "POST",
    url: '/jobs/create',
    isAuthIncluded: true,
    data
  }),
  getJobs: (page: unknown, limit: unknown) => sendRequest({
    method: "GET",
    url: `/jobs/list?limit=${limit}&page=${page}`,
    isAuthIncluded: true
  }),
  searchJobs: (searchQuery: string, signal?: AbortSignal) => sendRequest({
    method: "GET",
    url: `/jobs?search=${searchQuery}`,
    isAuthIncluded: true,
    signal
  }),
  getJob: (jobId: string) => sendRequest({
    method: "GET",
    url: `/jobs/${jobId}`,
    isAuthIncluded: true
  }),
  applyToJob: (data: unknown, jobId: string) => sendRequest({
    method: "POST",
    url: `/jobs/apply/${jobId}`,
    isAuthIncluded: true,
    data
  })
}