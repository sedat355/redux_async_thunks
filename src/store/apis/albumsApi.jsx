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
          //console.log('fetchAlbums-result: ',result)
          const tags = result.map((album) => {
            return { type: 'Album', id: album.id };
          });
          tags.push({type: 'UsersAlbums', id: user.id});
          //console.log('provides tags: ', tags)
          return tags;
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
          //console.log('addAlbums-result: ', result)
          return [{type:'UsersAlbums', id: user.id}];
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
          //console.log('removeAlbum-result: ', result)
          return [{type:'Album', id: album.id}];
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

//! Sayfa yüklendiğinde gelen çıktılar:
// fetchAlbums-result:  (2) [{…}, {…}]
// provides tags:  (3) [{…}, {…}, {…}]

//! +Add Album' e tıklandıktan sonraki çıktılar:
// addAlbums-result:  {id: '8117', userId: '448a', title: 'Generic Concrete Shirt'}
// fetchAlbums-result:  (3) [{…}, {…}, {…}]
// provides tags:  (4) [{…}, {…}, {…}, {…}]

//! Yeni eklenen album silindiğinde:
// removeAlbum-result:  {id: '8117', userId: '448a', title: 'Generic Concrete Shirt'}
// fetchAlbums-result:  (2) [{…}, {…}]
// provides tags:  (3) [{…}, {…}, {…}]