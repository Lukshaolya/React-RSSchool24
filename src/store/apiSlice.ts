import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';

export const dataApi = createApi({
  reducerPath: 'dataApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://rickandmortyapi.com/',
  }),
  endpoints: (builder) => ({
    getAllCharacters: builder.query({
      query: () => 'api/character/',
    }),
  }),
});

export const { useGetAllCharacters } = dataApi;
