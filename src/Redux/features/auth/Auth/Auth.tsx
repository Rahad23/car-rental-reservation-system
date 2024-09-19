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
  }),
});

export const { useGetSingleUserQuery } = user_;
