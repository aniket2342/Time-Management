import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../src/Redux/store';
import DataTable from './components/DataTable';
import TableForm from './components/TableForm';

function App() {
  return (
    <Provider store={store}>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Table Management App</h1>
        <div className="grid md:grid-cols-2 gap-4">
          <DataTable />
          <TableForm />
        </div>
      </div>
    </Provider>
  );
}

export default App;
