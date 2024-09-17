import { baseApi } from "@/Redux/api/baseApi";
// import { TRegister } from "./RegistrationSlice";

const userLogin = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
     loginUser: builder.mutation({
        query: (data) => {
          return {
            url: "/auth/signin",
            method: "POST",
            body: data,
          };
        },
        invalidatesTags: ["login"],
      }),
    };
  },
});

export const { useLoginUserMutation } = userLogin;
