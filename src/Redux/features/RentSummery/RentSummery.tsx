import { baseApi } from "@/Redux/api/baseApi";

const rentSummery = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRentSummery: builder.query({
        query: ({ token }) => {
          return {
            url: `/bookings/avis-rent-summery`,
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
        },
        providesTags: ["car", "car-features", "carTypes"],
      }),
  }),
});

export const { useGetRentSummeryQuery } = rentSummery;
