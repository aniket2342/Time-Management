import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  setFilteredData, 
  changePage, 
  sortColumn 
} from '../Redux/tableSlice';
import { downloadExcel } from '../utils/downloadExcel';

const DataTable = () => {
  const dispatch = useDispatch();
  const { filteredData, currentPage, itemsPerPage } = useSelector(state => state.table);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sortConfig, setSortConfig] = useState({ column: null, direction: 'asc' });

  // Pagination and Filtering
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Global filter
    const filtered = filteredData.filter(row => 
      Object.values(row).some(value => 
        String(value).toLowerCase().includes(globalFilter.toLowerCase())
      )
    );

    return filtered.slice(startIndex, endIndex);
  }, [filteredData, currentPage, globalFilter, itemsPerPage]);

  // Sorting Handler
  const handleSort = (column) => {
    let direction = 'asc';
    if (sortConfig.column === column && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    
    setSortConfig({ column, direction });
    dispatch(sortColumn({ column, direction }));
  };

  // Global Filter Handler
  const handleGlobalFilter = (e) => {
    const value = e.target.value;
    setGlobalFilter(value);
    
    const filtered = filteredData.filter(row => 
      Object.values(row).some(val => 
        String(val).toLowerCase().includes(value.toLowerCase())
      )
    );
    
    dispatch(setFilteredData(filtered));
  };

  // Download Handler
  const handleDownload = () => {
    downloadExcel(filteredData);
  };

  return (
    <div className="p-4">
      <div className="mb-4 flex justify-between">
        <h1 className='text-4xl font-semibold '>Account List</h1>
        <div className='flex-row'>
        <input 
          type="text" 
          placeholder="Global Search" 
          value={globalFilter}
          onChange={handleGlobalFilter}
          className="border p-2 w-full"
        />
        <button 
          onClick={handleDownload}
          className="bg-green-500 text-white px-4 py-2 ml-2"
        >
          Download Excel
        </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead>
            <tr>
              {Object.keys(filteredData[0] || {}).map(column => (
                <th 
                  key={column}
                  onClick={() => handleSort(column)}
                  className="border p-2 cursor-pointer hover:bg-gray-100"
                >
                  {column.toUpperCase()}
                  {sortConfig.column === column && (
                    <span>{sortConfig.direction === 'asc' ? ' ▲' : ' ▼'}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50">
                {Object.values(row).map((cell, cellIndex) => (
                  <td key={cellIndex} className="border p-2">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        {Array.from({ 
          length: Math.ceil(filteredData.length / itemsPerPage) 
        }).map((_, index) => (
          <button
            key={index}
            onClick={() => dispatch(changePage(index + 1))}
            className={`mx-1 px-3 py-1 ${
              currentPage === index + 1 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DataTable;