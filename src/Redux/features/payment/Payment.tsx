import { baseApi } from "@/Redux/api/baseApi";

const paymentCar = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    paymentReturnCar: builder.mutation({
      query: ({ paymentTK, token }) => {
        console.log(paymentTK, "check taka");
        return {
          url: "/payment",
          method: "POST",
          body: { paymentTK: paymentTK },
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        };
      },
      invalidatesTags: ["booking"],
    }),
  }),
});

export const { usePaymentReturnCarMutation } = paymentCar;
