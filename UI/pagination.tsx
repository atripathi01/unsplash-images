import React from 'react'
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import { Box } from '@mui/material';

const MyPagination = ({currentPage, total, handlePageChange}) => {
  return (
    <Box sx={{width:"100%"}}>

<Pagination
    current={currentPage}
    total={total || 0}
    pageSize={12} // Adjust the page size as needed
    onChange={handlePageChange}
    
/>
    </Box>
  )
}

export default MyPagination