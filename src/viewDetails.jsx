import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, CardHeader, CardBody, CardFooter, Avatar, Button } from "@nextui-org/react";


function ViewDetails() {
    const navigate=useNavigate();
  const { empId } = useParams();
  const [empData, setEmpData] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const headers = {"projectId": "66aa11c539e2fdc09bbba4cb", "environmentId": "66aa11c639e2fdc09bbba4cc"};
      try {
        const response = await axios.get(`https://free-ap-south-1.cosmocloud.io/development/api/employeedetail/${empId}`, { headers: headers });
        setEmpData(response.data);
      } catch (error) {
        console.error('Error fetching employee details:', error);
      }
    };

    fetchDetails();
  }, [empId]);

  return (
    <div className='h-screen flex flex-col justify-center items-center'>
      {empData && (
        <Card className="max-w-[400px] shadow-lg rounded-lg">
          <CardHeader className="justify-between p-4">
          <button className='p-2 m-0 rounded-full text-sm' onClick={() => navigate('/')}>{"<"}</button>
            <div className="flex gap-5 items-center">
              <Avatar isBordered src={empData.avatar} />
              <div className="flex flex-col gap-2 items-start justify-center">
                <h4 className="text-lg font-semibold leading-none text-primary-600">{empData.name}</h4>
                <h5 className="text-base tracking-tight text-primary-400">{empData.address.line1}, {empData.address.city}, {empData.address.country} {empData.address.zip_code}</h5>
              </div>
            </div>
          </CardHeader>
          <CardBody className="px-4 py-2 text-base text-primary-400">
            <p>
              {empData.contact_methods.map((method) => (
                <span key={method.value} className="block">{method.contact_method}: {method.value}</span>
              ))}
            </p>
          </CardBody>
          <CardFooter className="p-4 gap-4">
            <div className="flex gap-2">
              <p className="font-semibold text-primary-400 text-base">Address:</p>
              <p className="text-primary-400 text-base">{empData.address.line1}, {empData.address.city}, {empData.address.country} {empData.address.zip_code}</p>
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}

export default ViewDetails;