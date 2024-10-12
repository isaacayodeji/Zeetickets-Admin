import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiConfig = createApi({
  reducerPath: "apiConfig",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
  }),
  tagTypes: ["getData"],
  endpoints: (builder) => ({
    getData: builder.query({
      query: (data) => {
        return {
          url: data.getUrl,
        };
      },
      providesTags: ["getData"],
    }),
    postData: builder.mutation({
      query: (data) => {
        return {
          url: data.postUrl,
          method: "POST",
          body: data.request,
        };
      },
      invalidatesTags: (_result, _error, arg) => [
        { type: "getData", id: arg.id },
      ],
    }),
    PutData: builder.mutation({
      query: (data) => {
        return {
          url: data.putUrl,
          method: "PUT",
          body: data.request,
        };
      },
      invalidatesTags: (_result, _error, arg) => [
        { type: "getData", id: arg.id },
      ],
    }),
    DeleteData: builder.mutation({
      query: (data) => {
        return {
          url: data.deleteUrl,
          method: "DELETE",
          body: data.request,
        };
      },
      invalidatesTags: (_result, _error, arg) => [
        { type: "getData", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetDataQuery,
  usePostDataMutation,
  useDeleteDataMutation,
  usePutDataMutation,
} = apiConfig;
