import { baseApi } from "@/Redux/api/baseApi";

const forgotPassword = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    forgotPassword: builder.mutation({
      query: (payload) => {
        return {
          url: "/auth/user/password-forgot",
          method: "PATCH",
          body: payload,
        };
      },
      invalidatesTags: ["login", "registration"],
    }),
  }),
});

export const { useForgotPasswordMutation } = forgotPassword;
