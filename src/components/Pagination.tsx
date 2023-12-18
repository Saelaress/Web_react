// Ваш компонент Pagination.tsx
import React from "react";
import { Pagination as MuiPagination, PaginationProps } from "@mui/material";

interface CustomPaginationProps extends Omit<PaginationProps, "onChange"> {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

const Pagination: React.FC<CustomPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  ...props
}) => {
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    onPageChange(page);
  };

  return (
    <MuiPagination
      {...props}
      page={currentPage}
      count={totalPages}
      onChange={handlePageChange}
      sx={{
        display: "flex",
        justifyContent: "center",
        marginTop: 2,
        marginBottom: 4,
      }}
    />
  );
};

export default Pagination;
