import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  tagTypes: ["registration", "login", "carTypes", "car-features", "car", "booking"],
  //Live link
  //https://campers-shop-backend-nine.vercel.app/api/v2
  //local host: http://localhost:5000
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1",
  }),
  //   endpoints: (builder) => ({
  //     getAllProduct: builder.query({
  //         query: () => ({ url: "/products", method: "GET" }),
  //       }),
  //   }),
  endpoints: () => ({}),
});
