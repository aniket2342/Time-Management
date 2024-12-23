import { createSlice } from '@reduxjs/toolkit';

// Dummy initial data
const initialData = [
  { id: 1, Accountname: 'John Doe', email: 'john@example.com', Phone:'1779551265',website:'www.xyz.com', industry:'Real estate company', Accountstatus:'True' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', Phone:'5779551265',website:'www.xyz.com', industry:'Trader Commpany', Accountstatus:'False' },
  { id: 3, name: 'Alice Brown', email: 'alice@example.com', Phone:'2779551265',website:'www.xyz.com', industry:'Carpenter industry', Accountstatus:'True'},
  { id: 4, name: 'Bob White', email: 'bob@example.com', Phone:'7779551265',website:'www.xyz.com', industry:'Automoblie', Accountstatus:'False'},
  { id: 5, name: 'Chris Black', email: 'chris@example.com', Phone:'3779551265',website:'www.xyz.com', industry:'Industry Specialies', Accountstatus:''},
  { id: 6, name: 'Daisy Yellow', email: 'daisy@example.com', Phone:'8779551265',website:'www.xyz.com', industry:'EDPS', Accountstatus:'False'},
  { id: 7, name: 'Edward Green', email: 'edward@example.com', Phone:'4779551265',website:'www.xyz.com', industry:'Industry Specialies', Accountstatus:'True'},
  { id: 8, name: 'Fiona Blue', email: 'fiona@example.com', Phone:'8779551265',website:'www.xyz.com', industry:'Automoblie ', Accountstatus:'False'},
  { id: 9, name: 'George Red', email: 'george@example.com', Phone:'8779551265',website:'www.xyz.com', industry:'EDPS', Accountstatus:'False' },
  { id: 10, name: 'Hannah Purple', email: 'hannah@example.com', Phone:'6779551265',website:'www.xyz.com', industry:'Hospital Nusring', Accountstatus:'True'}
];

const tableSlice = createSlice({
  name: 'table',
  initialState: {
    data: initialData,
    filteredData: initialData,
    currentPage: 1,
    itemsPerPage: 10
  },
  reducers: {
    setTableData: (state, action) => {
      state.data = action.payload;
      state.filteredData = action.payload;
    },
    setFilteredData: (state, action) => {
      state.filteredData = action.payload;
      state.currentPage = 1;
    },
    changePage: (state, action) => {
      state.currentPage = action.payload;
    },
    sortColumn: (state, action) => {
      const { column, direction } = action.payload;
      state.filteredData = [...state.filteredData].sort((a, b) => {
        if (direction === 'asc') {
          return a[column] > b[column] ? 1 : -1;
        } else {
          return a[column] < b[column] ? 1 : -1;
        }
      });
    }
  }
});

export const { 
  setTableData, 
  setFilteredData, 
  changePage, 
  sortColumn 
} = tableSlice.actions;

export default tableSlice.reducer;
