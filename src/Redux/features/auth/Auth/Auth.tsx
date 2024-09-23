import { baseApi } from "@/Redux/api/baseApi";

const user_ = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSingleUser: builder.query({
      query: ({ email, token }) => {
        return {
          url: `/auth/user/${email}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      providesTags: ["auth"],
    }),
    registrationUser: builder.mutation({
      query: (data) => {
        return {
          url: "/auth/user",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["auth"],
    }),
    updateUser: builder.mutation({
      query: ({ payload, token }) => {
        return {
          url: "/auth/user/update-profile",
          method: "PATCH",
          body: payload,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ["auth"],
    }),
    getAllUser: builder.query({
      query: ({ search, token }: { search: string; token: string }) => {
        const searchTerm = search
          ? `?searchTerm=${encodeURIComponent(search)}`
          : "";
        return {
          url: `/auth/user/all-users/all${searchTerm}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      providesTags: ["auth"],
    }),
    updateUserRole: builder.mutation({
      query: ({ id, token }) => {
        return {
          url: `/auth/user/roll-change?userId=${id}`,
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ["auth"],
    }),
    blockUser: builder.mutation({
      query: ({ id, token }) => {
        const userId = `?userId=${id}`;

        return {
          url: `/auth/user/block-user${userId}`,
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ["auth"],
    }),
    unblockUser: builder.mutation({
      query: ({ id, token }) => {
        const userId = `?blockUserId=${id}`;
        return {
          url: `/auth/user/block-user${userId}`,
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ["auth"],
    }),
  }),
});

export const {
  useGetSingleUserQuery,
  useUpdateUserMutation,
  useGetAllUserQuery,
  useUpdateUserRoleMutation,
  useBlockUserMutation,
  useUnblockUserMutation,
} = user_;
