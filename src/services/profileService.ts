import { sendRequest } from "@helpers";

export const profileService = {
  editProfile: (data: unknown) => sendRequest({
    method: "POST",
    url: "/profile/update-profile",
    data,
    isAuthIncluded: true
  }),
  updateProfilePic: (data: unknown) => sendRequest({
    method: "PATCH",
    url: "/profile/profile-pic",
    data,
    isAuthIncluded: true
  }),
  updateProfileBanner: (data: unknown) => sendRequest({
    method: "PATCH",
    url: "/profile/profile-banner",
    data,
    isAuthIncluded: true
  }),
  deleteProfilePic: () => sendRequest({
    method: "DELETE",
    url: "/profile/remove-profile-pic",
    isAuthIncluded: true
  }),
  deleteProfileBanner: () => sendRequest({
    method: "DELETE",
    url: "/profile/remove-banner",
    isAuthIncluded: true
  }),
  downloadPDF: (id: string | undefined) => sendRequest({
    method: 'GET',
    url: `/download-pdf/${id}`,
    isAuthIncluded: false,
    responseType: "blob"
  }),
  followUser: (userId: string | undefined) => sendRequest({
    method: "GET",
    url: `/profile/follow-user/${userId}`,
    isAuthIncluded: true
  }),
  unFollowUser: (userId: string) => sendRequest({
    method: "GET",
    url: `/profile/unfollow-user/${userId}`,
    isAuthIncluded: true
  }),
}