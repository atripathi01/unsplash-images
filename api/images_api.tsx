import { AxiosWrapper } from './axiosWrapper';
import { UnsplashResponse } from './types';



export const getImageList = async (searchQuery: string, currentPage: number) =>
  AxiosWrapper<UnsplashResponse>({
    method: 'GET',
    url: `/search/photos?page=${currentPage}&per_page=12&query=${searchQuery}&client_id=${process.env.UNSPLASH_CLIENT_ID}`,
    defaultHeaders: true,
  });



export const getRendomImages = async () =>
  AxiosWrapper<UnsplashResponse>({
    method: 'GET',
    url: `/photos/random&client_id=${process.env.UNSPLASH_CLIENT_ID}`,
    defaultHeaders: true,
  });
