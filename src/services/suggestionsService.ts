import { sendRequest } from "@helpers";

export const suggestionsService = {
  randomUsers: (limit: string) => sendRequest({
    method: "GET",
    url: `/suggestions/get-users?limit=${limit}`,
    isAuthIncluded: true
  }),
  randomIndustryUsers: (limit: string) => sendRequest({
    method: "GET",
    url: `/suggestions/get-suggestions?limit=${limit}`,
    isAuthIncluded: true
  })
}