import { baseApi } from "@/Redux/api/baseApi";

const cars = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCarType: builder.query({
      query: () => ({ url: `/car-type`, method: "GET" }),
      providesTags: ["carTypes"],
    }),
    getCarWithType: builder.query({
      query: ({ id, search }) => {
        const searchTerm = search
          ? `?searchTerm=${encodeURIComponent(search)}`
          : "";
        return {
          url: `/cars/category/${id}${searchTerm}`,
          method: "GET",
        };
      },
      providesTags: ["car"],
    }),
    getCarFeature: builder.query({
      query: () => ({ url: `/car-features`, method: "GET" }),
      providesTags: ["car-features"],
    }),
    getCars: builder.query({
      query: ({
        search,
        data,
      }: {
        search?: string;
        data?: {
          priceSorting?: string;
          category?: string;
          priceRange?: string;
        };
      }) => {
        // Construct the search term query if `search` exists
        const searchTerm = search
          ? `?searchTerm=${encodeURIComponent(search)}`
          : "";

        // Construct additional filter terms (category, priceRange, priceSorting)
        const filterParams = new URLSearchParams();

        if (data?.category) {
          filterParams.append("category", data.category);
        }
        if (data?.priceRange) {
          filterParams.append("priceRange", data.priceRange);
        }
        if (data?.priceSorting) {
          filterParams.append("priceSorting", data.priceSorting);
        }

        // Build the complete query string with `searchTerm` and filters
        const queryString = searchTerm
          ? `${searchTerm}&${filterParams.toString()}`
          : `?${filterParams.toString()}`;

        return {
          url: `/cars${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["car"],
    }),
    makeCar: builder.mutation({
      query: ({ payload, token }) => {
        return {
          url: "/cars",
          method: "POST",
          body: payload,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ["car"],
    }),
    getSingleCar: builder.query({
      query: ( id ) => {
        return {
          url: `/cars/${id}`,
          method: "GET",
        };
      },
      providesTags: ["car"],
    }),
  }),
});

export const {
  useGetCarTypeQuery,
  useGetCarFeatureQuery,
  useMakeCarMutation,
  useGetCarsQuery,
  useGetCarWithTypeQuery,
  useGetSingleCarQuery
} = cars;
