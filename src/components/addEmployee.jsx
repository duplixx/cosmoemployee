import React from 'react';
import {
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure
} from "@nextui-org/react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

function AddEmployee() {
    console.log("clicked")
  const { isOpen, onClose } = useDisclosure();

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    addressLine1: Yup.string().required('Address Line 1 is required'),
    city: Yup.string().required('City is required'),
    country: Yup.string().required('Country is required'),
    zipCode: Yup.string().required('Zip Code is required'),
    contactMethod: Yup.string().email('Invalid email address').required('Contact Method (Email) is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      addressLine1: '',
      city: '',
      country: '',
      zipCode: '',
      contactMethod: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.post('your-api-endpoint', values);
        console.log(response.data);
        resetForm();
        onClose();
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <>
      <Modal backdrop="blur" isOpen={true} onClose={onClose}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">Add Employee</ModalHeader>
              <ModalBody>
                <form onSubmit={formik.handleSubmit}>
                  {[
                    { name: 'name', label: 'Name', type: 'text' },
                    { name: 'addressLine1', label: 'Address Line 1', type: 'text' },
                    { name: 'city', label: 'City', type: 'text' },
                    { name: 'country', label: 'Country', type: 'text' },
                    { name: 'zipCode', label: 'Zip Code', type: 'text' },
                    { name: 'contactMethod', label: 'Contact Method (Email)', type: 'email' },
                  ].map((field) => (
                    <div className="mb-4" key={field.name}>
                      <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        name={field.name}
                        id={field.name}
                        className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values[field.name]}
                      />
                      {formik.touched[field.name] && formik.errors[field.name] && (
                        <p className="mt-2 text-sm text-red-600">{formik.errors[field.name]}</p>
                      )}
                    </div>
                  ))}
                  <div className="mt-5">
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddEmployee;
