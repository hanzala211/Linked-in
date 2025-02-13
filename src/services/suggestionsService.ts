import { sendRequest } from "@helpers";

export const suggestionsService = {
  randomUsers: (limit: string) => sendRequest({
    method: "GET",
    url: `/suggestions/users?limit=${limit}`,
    isAuthIncluded: true
  }),
  randomIndustryUsers: (limit: string) => sendRequest({
    method: "GET",
    url: `/suggestions/industry?limit=${limit}`,
    isAuthIncluded: true
  })
}