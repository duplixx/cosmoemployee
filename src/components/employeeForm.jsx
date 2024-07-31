import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddEmployee({modalIsOpen,setIsOpen}) {
    console.log("clicked")

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    address: Yup.object({
      line1: Yup.string().required('Address Line 1 is required'),
      city: Yup.string().required('City is required'),
      country: Yup.string().required('Country is required'),
      zip_code: Yup.string().required('Zip Code is required'),
    }),
    contact_methods: Yup.array().of(Yup.object({
      contact_method: Yup.string().required('Contact Method is required'),
      value: Yup.string().required('Value is required'),
    })),
  });
  const formik = useFormik({
    initialValues: {
      name: '',
      address: {
        line1: '',
        city: '',
        country: '',
        zip_code: '',
      },
      contact_methods: [
        {
          contact_method: '',
          value: '',
        },
      ],
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
        const headers = {"projectId": "66aa11c539e2fdc09bbba4cb", "environmentId": "66aa11c639e2fdc09bbba4cc"};
      try {
        // Ensure the API endpoint is correct and the headers are properly formatted
        const response = await axios.post('https://free-ap-south-1.cosmocloud.io/development/api/employeedetail', values, {headers: headers});
        console.log(response.data);
        resetForm();
        // Close the modal after successful submission
        closeModal()
        toast.success("User added Successfully");
      } catch (error) {
        console.error(error);
        toast.error("Failed to add user. Please try again.");
      }
    },
  });
  const message = () => toast("User added Successfully");

  function closeModal() {
    setIsOpen(false);
  }
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  return (
    <>
    <Modal
        isOpen={modalIsOpen}
        contentLabel="Example Modal"
        style={customStyles}
      >
        <div className='min-w-[200px]'>
          <div className="flex flex-col gap-1">Add Employee</div>
          <div>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="mt-2 text-sm text-red-600">{formik.errors.name}</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="address.line1" className="block text-sm font-medium text-gray-700">
                  Address Line 1
                </label>
                <input
                  type="text"
                  name="address.line1"
                  id="address.line1"
                  className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.address.line1}
                />
                {formik.touched.address?.line1 && formik.errors.address?.line1 && (
                  <p className="mt-2 text-sm text-red-600">{formik.errors.address.line1}</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="address.city" className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  name="address.city"
                  id="address.city"
                  className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.address.city}
                />
                {formik.touched.address?.city && formik.errors.address?.city && (
                  <p className="mt-2 text-sm text-red-600">{formik.errors.address.city}</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="address.country" className="block text-sm font-medium text-gray-700">
                  Country
                </label>
                <input
                  type="text"
                  name="address.country"
                  id="address.country"
                  className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.address.country}
                />
                {formik.touched.address?.country && formik.errors.address?.country && (
                  <p className="mt-2 text-sm text-red-600">{formik.errors.address.country}</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="address.zip_code" className="block text-sm font-medium text-gray-700">
                  Zip Code
                </label>
                <input
                  type="text"
                  name="address.zip_code"
                  id="address.zip_code"
                  className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.address.zip_code}
                />
                {formik.touched.address?.zip_code && formik.errors.address?.zip_code && (
                  <p className="mt-2 text-sm text-red-600">{formik.errors.address.zip_code}</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="contact_methods.0.contact_method" className="block text-sm font-medium text-gray-700">
                  Contact Method
                </label>
                <input
                  type="text"
                  name="contact_methods.0.contact_method"
                  id="contact_methods.0.contact_method"
                  className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.contact_methods[0].contact_method}
                />
                {formik.touched.contact_methods?.[0]?.contact_method && formik.errors.contact_methods?.[0]?.contact_method && (
                  <p className="mt-2 text-sm text-red-600">{formik.errors.contact_methods[0].contact_method}</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="contact_methods.0.value" className="block text-sm font-medium text-gray-700">
                  Value
                </label>
                <input
                  type="text"
                  name="contact_methods.0.value"
                  id="contact_methods.0.value"
                  className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.contact_methods[0].value}
                />
                {formik.touched.contact_methods?.[0]?.value && formik.errors.contact_methods?.[0]?.value && (
                  <p className="mt-2 text-sm text-red-600">{formik.errors.contact_methods[0].value}</p>
                )}
              </div>
              <div className="mt-5">
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default AddEmployee;
