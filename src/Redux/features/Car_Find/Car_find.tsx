import { baseApi } from "@/Redux/api/baseApi";

const findCars = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    findCar: builder.mutation({
      query: ({ payload, token }) => {
        return {
          url: `/cars/find-cars`,
          method: "POST",
          body: payload,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ["car"],
    }),
  }),
});

export const { useFindCarMutation } = findCars;
