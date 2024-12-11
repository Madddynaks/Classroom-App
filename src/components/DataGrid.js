import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

export default function DataGridDemo({ columns, rows, state, changeState, selectedIds }) {
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 5,
    page: 0,
  });

  return (
    <div className="my-2 w-full max-h-[50vh] overflow-scroll">
      <DataGrid
        getRowId={(row) => row._id}
        rows={rows}
        columns={columns}
        pagination
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        rowHeight={50}
        pageSizeOptions={[5]}
        checkboxSelection
        rowSelectionModel={selectedIds}
        disableRowSelectionOnClick
        initialState={{
          columns: {
            columnVisibilityModel: {
              _id: false,
            },
          },
        }}
        onRowSelectionModelChange={(newRowSelectionModel) => {
          if (changeState) {
            changeState(newRowSelectionModel);
          }
        }}
      />
    </div>
  );
}

