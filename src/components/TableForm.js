import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { tableFormSchema } from '../utils/validationSchema';
import { useDispatch } from 'react-redux';
import { setTableData } from '../Redux/tableSlice';

const TableForm = () => {
  const dispatch = useDispatch();
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset 
  } = useForm({
    resolver: yupResolver(tableFormSchema)
  });

  const onSubmit = (data) => {
    // In a real app, you'd typically send this to a backend
    dispatch(setTableData(prevData => [...prevData, { 
      id: prevData.length + 1, 
      ...data 
    }]));
    reset(); // Clear form after submission
  };

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="max-w-md mx-auto p-6 bg-white shadow-md rounded"
    >
      <div className="mb-4">
        <label className="block mb-2">Name</label>
        <input 
          {...register('name')}
          className="w-full p-2 border"
          placeholder="Enter Name"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-2">Email</label>
        <input 
          {...register('email')}
          className="w-full p-2 border"
          placeholder="Enter Email"
          type="email"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-2">Age</label>
        <input 
          {...register('age')}
          className="w-full p-2 border"
          placeholder="Enter Age"
          type="number"
        />
        {errors.age && (
          <p className="text-red-500 text-sm">{errors.age.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-2">City</label>
        <input 
          {...register('city')}
          className="w-full p-2 border"
          placeholder="Enter City"
        />
        {errors.city && (
          <p className="text-red-500 text-sm">{errors.city.message}</p>
        )}
      </div>

      <button 
        type="submit" 
        className="w-full bg-blue-500 text-white p-2 rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default TableForm;
