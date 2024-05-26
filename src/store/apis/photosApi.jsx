import { faker } from "@faker-js/faker";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const photosApi = createApi({
  reducerPath: 'photos',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000'
  }),
  endpoints(builder) {
    return {
      fetchPhotos: builder.query({
        query: (album) => {
          return {
            url: '/photos',
            params: {
              albumId: album.id, 
            },
            method: 'GET'
          };
        }
      }),
      addPhoto: builder.mutation({
        //Bu api' de photos dizisinde işlemler yapıyoruz ve bu dizi photo nesnelerinden oluşuyor. Her photo nesnesinde, hangi albume ait olduğu bilgisini içeren yani o albumun id değerini içeren albumId özelliği var. yeni foto'yu hangi albume ekleyeceğimi bilmem lazım (yani yeni photo nesnesini oluştururken albumId değerine atayacağım album.id değerine erişebilmem lazım). Bu yüzden +Add Photo' ya tıklandığında album nesnesini buraya göndereceğiz. İşte tıklanınca gelen album nesnesinin kendi id değerini bu yeni photo nesnesinin albumId değerine atıyoruz. Böylece her photo nesnesi, hangi album nesnesine ait olduğu bilgisini albumId özelliğinde tutacak.
        query: (album) => {
          return {
            url: '/photos',
            method: 'POST',
            body: {
              albumId: album.id,
              url: faker.image.abstract(150, 150, true)
            }
          }
        }
      }),
      removePhoto: builder.mutation({
        //deletePhoto' ya tıklandığında hangi photo' yu sileceğimi bilmem lazım. Her bir photo nesnesinin kendi benzersiz id değeri var. Bu yüzdden tıklanan photo nesnesini buraya gönderiyoruz ve photo.id değerini url' e ekliyoruz. Böylece doğru photo nesnesini silmiş olacağız.
        query: (photo) => {
          return {
            url: `/photos/${photo.id}`,
            method: 'DELETE',
          }
        }
      })
    }
  }
});

export { photosApi }
export const {
  useFetchPhotosQuery,
  useAddPhotoMutation,
  useRemovePhotoMutation,
} = photosApi;