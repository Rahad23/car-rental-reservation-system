import { baseApi } from "@/Redux/api/baseApi";

const paymentCar = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    paymentReturnCar: builder.mutation({
      query: ({ id, token, PType }) => {
        const paymentRequestSend = `?PType=${PType}`;

        return {
          url: `/payment${paymentRequestSend}`,
          method: "POST",
          body: { id },
          headers: {
            Authorization: `Bearer ${token}`,
            // "Content-Type": "application/json",
          },
        };
      },
      invalidatesTags: ["booking"],
    }),
  }),
});

export const { usePaymentReturnCarMutation } = paymentCar;
