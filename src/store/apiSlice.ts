import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const dataApi = createApi({
  reducerPath: 'dataApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://rickandmortyapi.com/api/',
  }),
  endpoints: (builder) => ({
    getAllCharacters: builder.query({
      query: ({ name, page }) => {
        let url = `character/?page=${page}`;
        if (name) url += `&name=${name}`;
        return url;
      },
    }),
  }),
});

export const { useGetAllCharactersQuery } = dataApi;
