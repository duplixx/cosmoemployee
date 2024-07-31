import React from 'react'
import { Route,Routes } from 'react-router-dom';
import App from './App';
import MemberDetails from "./viewDetails"

export default function routes() {
  return (
    <>
    <Routes>

    <Route path="/" element={<App />} />
    <Route exact path="/memberDetails/:empId" element={<MemberDetails/>}/>
    </Routes>
    </>
  )
}
