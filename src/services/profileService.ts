import { sendRequest } from "@helpers";

export const profileService = {
  editProfile: (data: unknown) => sendRequest({
    method: "POST",
    url: "/profile/update-profile",
    data,
    isAuthIncluded: true
  }),
  updateProfilePic: (data: unknown) => sendRequest({
    method: "POST",
    url: "/profile/profile-pic",
    data,
    isAuthIncluded: true
  }),
  updateProfileBanner: (data: unknown) => sendRequest({
    method: "POST",
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
  })
}