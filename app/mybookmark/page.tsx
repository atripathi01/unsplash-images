'use client';

import { ImageData, Photo } from '@/api/types';
import { BookmarkAdded, BookmarkBorderOutlined } from '@mui/icons-material';
import { Container, Grid, Typography } from '@mui/material';
import { styled } from '@stitches/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const MyBookmark = () => {


  const [bookmarkImages, setBookmarkImage] = useState<ImageData[]>([]);


  useEffect(() => {

    if (typeof window !== 'undefined' && window.localStorage) {
      const arr: string | null = localStorage.getItem('myBookmark');
      //@ts-ignore
      setBookmarkImage(JSON.parse(arr));
    }
    
  }, []);


  return (
    <main>
      <Container sx={{ position: 'relative' }}>
        <BackToHomePage>
          {' '}
          <a href='/'> back to home </a>
        </BackToHomePage>
        <Typography variant='h2' sx={{ textAlign: 'center', my: 5 }}>
          My Bookmarks
        </Typography>
        <Grid container spacing={2}>
          {bookmarkImages?.map((image: ImageData) => {
            return (
              <Grid
                item
                xs={12}
                lg={4}
                key={image?.id}
                sx={{ position: 'relative' }}
              >
                <div>
                  <ImageContainer>
                    <Image
                      width={350}
                      height={200}
                      src={image?.urls?.thumb}
                      //@ts-ignore
                      alt={image?.alt_description}
                    />
                  </ImageContainer>

                  {image?.alt_description}
                </div>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </main>
  );
};

export default MyBookmark;

const ImageContainer = styled('div', {
  width: '100%',
  maxHeight: '300px',
  overflow: 'hidden',
});
const BackToHomePage = styled('div', {
  position: 'absolute',
  top: '1rem',
  left: '1rem',
  textDecoration: 'underline',
  '&:hover': {
    color: 'blue',
  },
});
