import { baseApi } from "@/Redux/api/baseApi";
// import { TRegister } from "./RegistrationSlice";

const userRegistration = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      registrationUser: builder.mutation({
        query: (data) => {
          return {
            url: "/auth/signup",
            method: "POST",
            body: data,
          };
        },
        invalidatesTags: ["registration"],
      }),
    };
  },
});

export const { useRegistrationUserMutation } = userRegistration;
