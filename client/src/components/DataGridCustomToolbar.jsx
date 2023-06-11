import React from "react";
import { Search } from "@mui/icons-material";
import { IconButton, TextField, InputAdornment } from "@mui/material";
import {
  GridToolbarDensitySelector,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
  useGridApiContext,
  gridPaginatedVisibleSortedGridRowIdsSelector,
} from "@mui/x-data-grid";
import FlexBetween from "./FlexBetween";

const getRowsFromCurrentPage = ({ apiRef }) =>
  gridPaginatedVisibleSortedGridRowIdsSelector(apiRef);

const DataGridCustomToolbar = ({ searchInput, setSearchInput, setSearch }) => {

  const apiRef = useGridApiContext();
  const handleExport = (options) => apiRef.current.exportDataAsCsv(options);

  return (
    <GridToolbarContainer>
      <FlexBetween width="100%">
        <FlexBetween>
          <GridToolbarColumnsButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport
            onClick={() =>
              handleExport({ getRowsToExport: getRowsFromCurrentPage })
            }
          />
        </FlexBetween>
      </FlexBetween>
      <TextField
        label="Search..."
        sx={{ mb: "0.5rem", width: "15rem" }}
        onChange={(e) => setSearchInput(e.target.value)}
        value={searchInput}
        variant="standard"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => {
                  setSearch(searchInput);
                  setSearchInput("");
                }}
              >
                <Search />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </GridToolbarContainer>
  );
};

export default DataGridCustomToolbar;
