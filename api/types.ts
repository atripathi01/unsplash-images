export interface PhotoUrls {
  raw?: string;
  full?: string;
  regular?: string;
  small?: string;
  thumb?: string;
}

export interface PhotoLinks {
  self?: string;
  html?: string;
  download?: string;
}

export interface Photo {
  id?: string;
  created_at?: string;
  width?: number;
  height?: number;
  description?: string;
  urls?: PhotoUrls;
  links?: PhotoLinks;
}

export interface UnsplashResponse {
  total?: number;
  total_pages?: number;
  results?: Photo[];
}

export interface ImageData {
  id: string;
  urls?:PhotoUrls
  alt_description?: string;
}

export interface ImageList {
  results?: ImageData[];
}

export interface MyPaginationProps {
  currentPage: number;
  total: number;
  handlePageChange: (page: number) => void;
}
