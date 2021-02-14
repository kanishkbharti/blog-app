import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Typography from "@material-ui/core/Typography";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { Link } from "react-router-dom";

const BlogAppListView = () => {
  const [items, setItems] = useState([]);

  const [error, setError] = useState(null);

  const fetchItems = async () => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await res.json();
      const items_data = data.map((d) => ({
        id: d.id,
        userName: d.name,
        companyName: d.company.name,
      }));
      setItems(items_data);
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const columnDefs = [
    { field: "id", headerName: "ID", width: 300, hide: true },
    {
      field: "userName",
      headerName: "User Name",
      sortable: true,
      resizable: true,
      filter: "agTextColumnFilter",
      floatingFilterComponentParams: {
        suppressFilterButton: true,
      },
      floatingFilter: true,
      suppressMenu: true,
      flex: 1,
    },
    {
      field: "companyName",
      headerName: "Company Name",
      sortable: true,
      resizable: true,
      filter: "agTextColumnFilter",
      floatingFilterComponentParams: {
        suppressFilterButton: true,
      },
      floatingFilter: true,
      suppressMenu: true,
      flex: 1,
    },
    {
      headerName: "Actions",
      cellRendererFramework: (params) => (
        <div style={{ outline: "none" }}>
          <Link to={`/posts/${params.data.id}`}>
            <VisibilityIcon />
          </Link>
        </div>
      ),
    },
  ];
  console.log(items);
  return (
    <>
      <AppBar style={{ marginBottom: 50 }} position="static">
        <Toolbar>
          <Typography variant="h6" color="primary">
            Blog App
          </Typography>
        </Toolbar>
      </AppBar>
      <div
        id="myGrid"
        className="ag-theme-alpine"
        style={{ height: 800, width: "100%" }}
      >
        <AgGridReact columnDefs={columnDefs} rowData={items} />
      </div>
    </>
  );
};

export default BlogAppListView;
