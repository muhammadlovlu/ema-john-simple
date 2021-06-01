import React from 'react';
import { useForm } from 'react-hook-form';
import '../Shipment/Shipment.css';
const Shipment = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  console.log(watch("example"));

  return (
    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
      <input defaultValue="test" {...register("example")} />
      
      <input {...register("exampleRequired", { required: true })} />
      {errors.exampleRequired && <span className="error">This field is required</span>}
      
      <input type="submit" />
    </form>
  );
};

export default Shipment;