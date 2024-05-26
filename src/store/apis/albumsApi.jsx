import { faker } from '@faker-js/faker';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  })
}

const albumsApi = createApi({
  reducerPath: 'albums',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000',
    fetchFn: async (...args) => {
      //!ONLY DEV
      await pause(1000);
      return fetch(...args);
    }
   }),

  endpoints(builder) {
    return {
      fetchAlbums: builder.query({
        providesTags: (result, error, user) => {
          return [{type:'Album', id: user.id}];
        },
        query: (user) => {
          return {
            url: '/albums',
            params: {
              userId: user.id,
            },
            method: 'GET',
          }
        }
      }),
      addAlbum: builder.mutation({
        invalidatesTags: (result, error, user) => {
          return [{type:'Album', id: user.id}];
        },
        query: (user) => {
          return {
            url: '/albums',
            method: 'POST',
            body: {
              userId: user.id,
              title: faker.commerce.productName()
            }
          }
        }
      }),
      removeAlbum: builder.mutation({
        invalidatesTags: (result, error, album) => {
          console.log(album)
          return [{type:'Album', id: album.userId}];
        },
        query: (album) => {
          return {
            url: `/albums/${album.id}`,
            method: 'DELETE',
          }
        }
      })
    }
  }
});

export const { useFetchAlbumsQuery, useAddAlbumMutation, useRemoveAlbumMutation } = albumsApi;
export { albumsApi }

