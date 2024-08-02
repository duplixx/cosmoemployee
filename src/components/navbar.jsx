import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import React from 'react'
import {Switch} from "@nextui-org/react";

function navbar() {
  return (
   <>
   <Navbar className="mt-3">
      <NavbarBrand className="flex justify-center items-center space-x-2">
        <img src="/cosmo.avif" alt="ada" className="w-10 h-10 rounded-full"/>
        <p className="font-bold text-inherit">Cosmo Employee Management</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
      <NavbarItem>
        <Button type="" color="" size="sm" onClick={() => document.documentElement.classList.toggle('dark')}>
          Toggle Dark Mode
        </Button>
      </NavbarItem>
      </NavbarContent>
    </Navbar>
   </>
  )
}

export default navbar