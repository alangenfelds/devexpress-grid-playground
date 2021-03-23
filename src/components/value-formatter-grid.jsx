import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import { DataTypeProvider } from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableHeaderRow,
} from "@devexpress/dx-react-grid-material-ui";

import { generateRows, globalSalesValues } from "../utils/generator";

const CurrencyFormatter = ({ value }) => (
  <b style={{ color: "darkblue" }}>
    {value.toLocaleString("en-US", { style: "currency", currency: "USD" })}
  </b>
);

const CurrencyTypeProvider = (props) => (
  <DataTypeProvider formatterComponent={CurrencyFormatter} {...props} />
);

const DateFormatter = ({ value }) =>
  value.replace(/(\d{4})-(\d{2})-(\d{2})/, "$3.$2.$1");

const DateTypeProvider = (props) => (
  <DataTypeProvider formatterComponent={DateFormatter} {...props} />
);

const ValueFormatterGrid = () => {
  const [columns] = useState([
    { name: "customer", title: "Customer" },
    { name: "product", title: "Product" },
    { name: "saleDate", title: "Sale Date" },
    { name: "amount", title: "Sale Amount" },
  ]);
  const [rows] = useState(
    generateRows({ columnValues: globalSalesValues, length: 8 })
  );

  const [tableColumnExtensions] = useState([
    { columnName: "amount", align: "right" },
  ]);

  const [dateColumns] = useState(["saleDate"]);
  const [currencyColumns] = useState(["amount"]);

  return (
    <div>
      <h4>Value Formatter Grid</h4>
      <Paper>
        <Grid rows={rows} columns={columns}>
          <CurrencyTypeProvider for={currencyColumns} />
          <DateTypeProvider for={dateColumns} />
          <Table columnExtensions={tableColumnExtensions} />
          <TableHeaderRow />
        </Grid>
      </Paper>
    </div>
  );
};

export default ValueFormatterGrid;
