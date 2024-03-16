'use client';

import { getImageList } from '@/api/images_api';
import Image from 'next/image';
import { useEffect, useState } from 'react';
// import debounce from 'lodash.debounce';
import { ImageData, ImageList, Photo } from '@/api/types';
import { styled } from '@stitches/react';
import { Box, Container, Grid, Typography } from '@mui/material';
import {
  BookmarkAdded,
  BookmarkBorder,
  BookmarkBorderOutlined,
  Search,
} from '@mui/icons-material';
import 'rc-pagination/assets/index.css';
import MyPagination from '@/UI/pagination';

export default function Home() {
  const [imageList, setImageList] = useState<ImageList>({});
  const [search, setSearch] = useState<string>('programmer with computer');
  const [bookmarkList, setBookmarkList] = useState<Photo[]>(
    (typeof window !== 'undefined' &&
      window.localStorage &&
      //@ts-ignore
      JSON.parse(localStorage.getItem('myBookmark'))) ||
      []
  );
  const [isInputFocused, setIsInputFocused] = useState(false);
  // open setopen state used for custom model, infeature if we need to impliment to show the complete detail of image
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleBlur = () => {
    setIsInputFocused(false);
  };

  // fucntion useed to handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // @ts-ignore
  //   const handleSearch = (e) => debounce(handleSearchValue(e), 800);

  // useEffect only render whenever search value or curreent page will change
  // fetch image list

  useEffect(() => {
    getImageList(search, currentPage)
      //@ts-ignore
      .then((res) => setImageList(res))
      .catch((err) => console.log(err));
    console.log(imageList);
  }, [search, currentPage]); // eslint-disable-line

  // this function used to handle the users bookmarks image
  const handleSaveBookmark = (image: Photo) => {
    if (
      !bookmarkList.some((savedBookmark) => savedBookmark?.id === image?.id)
    ) {
      // Add the image
      setBookmarkList([...bookmarkList, image]);
    } else {
      // Remove the image
      // @ts-ignore
      setBookmarkList(
        bookmarkList.filter((saveBookmark) => saveBookmark.id !== image.id)
      );
    }
  };

  // this handles the page change for pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (
      bookmarkList &&
      bookmarkList.length > 0 &&
      typeof window !== 'undefined' &&
      window.localStorage
    ) {
      localStorage.setItem('myBookmark', JSON.stringify(bookmarkList));
    }
  }, [bookmarkList]);

  return (
    <main>
      <Container>
        <Grid
          container
          sx={{ display: 'flex', justifyContent: 'space-between', my: 3 }}
        >
          <Grid item xs={12} lg={2}></Grid>
          <Grid item xs={12} lg={6} sx={{ position: 'relative' }}>
            <SearchInput
              placeholder='search image (ex: programmer with computer)'
              onChange={(e) => handleSearch(e)}
              onFocus={() => setIsInputFocused(true)}
              onBlur={handleBlur}
            />
            <Search
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                opacity: 0.4,
                background: '#fff',
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            lg={2}
            sx={{
              textAlign: { xs: 'end', lg: 'start' },
              my: { lg: 'auto', xs: '1rem' },
            }}
          >
            <a href='/mybookmark'>
              <span>
                <BookmarkBorder />
              </span>{' '}
              My Bookmark
            </a>
          </Grid>
        </Grid>
        <Typography variant='h3' sx={{ textAlign: 'center', my: 7 }}>
          Unsplash Images
        </Typography>
        <Grid container spacing={2}>
          {/* @ts-ignore */}
          {imageList && imageList?.results?.length > 0 ? (
            imageList?.results?.map((image: ImageData) => {
              return (
                <Grid
                  item
                  xs={12}
                  lg={4}
                  md={4}
                  sm={6}
                  key={image?.id}
                  sx={{ position: 'relative' }}
                >
                  <div>
                    <ImageContainer>
                      <Image
                        width={800}
                        height={1000}
                        //@ts-ignore
                        src={image?.urls?.thumb}
                        //@ts-ignore
                        alt={image?.alt_description}
                      />
                    </ImageContainer>

                    {image?.alt_description}
                    <div onClick={() => handleSaveBookmark(image)}>
                      {bookmarkList.some(
                        (savedBookmark) => savedBookmark.id === image.id
                      ) ? (
                        <BookmarkAdded
                          sx={{
                            position: 'absolute',
                            top: '2rem',
                            right: { xs: '1rem', lg: '2rem' },
                            color: 'green',
                            backgroundColor: '#fff',
                            borderRadius: '3px',
                          }}
                        />
                      ) : (
                        <BookmarkBorderOutlined
                          sx={{
                            position: 'absolute',
                            top: '2rem',
                            right: { xs: '1rem', lg: '2rem' },
                            color: '#000',
                            backgroundColor: '#fff',
                            borderRadius: '3px',
                          }}
                        />
                      )}
                    </div>
                  </div>
                </Grid>
              );
            })
          ) : (
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              <Typography variant='h3' sx={{ opacity: 0.4 }}>
                No Image Found
              </Typography>
            </Grid>
          )}
        </Grid>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '3rem 0',
          }}
        >
          <MyPagination
            currentPage={currentPage}
            //@ts-ignore
            total={imageList?.total}
            handlePageChange={handlePageChange}
          />
        </Box>
      </Container>
    </main>
  );
}

const SearchInput = styled('input', {
  background: '#fff',
  padding: '0.5rem 1rem',
  color: '#000',
  border: '1px solid #010101',
  borderRadius: '5px',
  width: '100%',
});

const ImageContainer = styled('div', {
  width: '100%',
  maxHeight: '300px',
  overflow: 'hidden',
});
