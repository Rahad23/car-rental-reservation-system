import { baseApi } from "@/Redux/api/baseApi";

const Bookings = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    bookingCar: builder.mutation({
      query: ({ payload, token }) => {
        return {
          url: "/bookings",
          method: "POST",
          body: payload,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ["booking"],
    }),
    getAllBookings: builder.query({
      query: (token) => {
        return {
          url: `/bookings`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        };
      },
      providesTags: ["booking"],
    }),
  }),
});

export const { useBookingCarMutation, useGetAllBookingsQuery } = Bookings;
