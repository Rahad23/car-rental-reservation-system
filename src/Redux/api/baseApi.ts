import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  tagTypes: [
    "registration",
    "login",
    "carTypes",
    "car-features",
    "car",
    "booking",
    "auth",
  ],
  //Live link
  //https://mission-3-assignment.vercel.app
  //local host: http://localhost:5000
  baseQuery: fetchBaseQuery({
    baseUrl: "https://mission-3-assignment.vercel.app/api/v1",
  }),
  //   endpoints: (builder) => ({
  //     getAllProduct: builder.query({
  //         query: () => ({ url: "/products", method: "GET" }),
  //       }),
  //   }),
  endpoints: () => ({}),
});
