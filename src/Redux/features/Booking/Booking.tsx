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
    confirmRentCar: builder.mutation({
      query: ({ id, token }) => {
        return {
          url: `/bookings/confirm?id=${id}`,
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ["booking"],
    }),
    cancelRentCar: builder.mutation({
      query: ({ id, token }) => {
        return {
          url: `/bookings/cancel?id=${id}`,
          method: "PATCH",
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
    getUserBookings: builder.query({
      query: (token) => {
        return {
          url: `/bookings/my-bookings`,
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

export const {
  useBookingCarMutation,
  useGetAllBookingsQuery,
  useGetUserBookingsQuery,
  useCancelRentCarMutation,
  useConfirmRentCarMutation,
} = Bookings;
