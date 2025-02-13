import { sendRequest } from "@helpers";

export const profileService = {
  editProfile: (data: unknown) => sendRequest({
    method: "POST",
    url: "/profile/update",
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
    url: "/profile/banner",
    data,
    isAuthIncluded: true
  }),
  deleteProfilePic: () => sendRequest({
    method: "DELETE",
    url: "/profile/profile-pic",
    isAuthIncluded: true
  }),
  deleteProfileBanner: () => sendRequest({
    method: "DELETE",
    url: "/profile/banner",
    isAuthIncluded: true
  }),
  downloadPDF: (id: string | undefined) => sendRequest({
    method: 'GET',
    url: `/pdf/download/${id}`,
    isAuthIncluded: false,
    responseType: "blob"
  }),
  followUser: (userId: string | undefined) => sendRequest({
    method: "POST",
    url: `/profile/follow/${userId}`,
    isAuthIncluded: true
  }),
  unFollowUser: (userId: string) => sendRequest({
    method: "POST",
    url: `/profile/unfollow/${userId}`,
    isAuthIncluded: true
  }),
  getFollow: () => sendRequest({
    method: "GET",
    url: `/profile/follow`,
    isAuthIncluded: true
  })
}