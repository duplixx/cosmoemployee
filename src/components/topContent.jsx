import React, { useMemo, useState } from 'react'
import { Input, useDisclosure } from '@nextui-org/react'
import { Button } from "@nextui-org/button";
import { PlusIcon } from './Icons/plusIcon';
import { SearchIcon } from './Icons/searchIcon';
import AddEmployee from './employeeForm';

export default function TopContent({ filterValue,
    users,
    setFilterValue,
    setPage,
    setRowsPerPage }) {
    const onRowsPerPageChange = React.useCallback((e) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);

    const [modalIsOpen, setIsOpen] = React.useState(false);
    const onSearchChange = React.useCallback((value) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
    }, []);

    const onClear = React.useCallback(() => {
        setFilterValue("")
        setPage(1)
    }, [])  
    function openModal() {
        setIsOpen(true);
      }


    return (
        <div className="flex flex-col gap-4 w-full px-4 z-0">
            <AddEmployee modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen} />
            <div className="flex justify-between gap-3 items-end">
                <Input
                    isClearable
                    className="w-full sm:max-w-[44%]"
                    placeholder="Search by name..."
                    startContent={<SearchIcon />}
                    value={filterValue}
                    onClear={() => onClear()}
                    onValueChange={onSearchChange}
                />
                <div className="flex gap-3">
                    <Button color="primary" endContent={<PlusIcon />} onClick={openModal}>
                        Add New
                    </Button>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-default-400 text-small">Total {users.length} users</span>
                <label className="flex items-center text-default-400 text-small">
                    Rows per page:
                    <select
                        className="bg-transparent outline-none text-default-400 text-small"
                        onChange={onRowsPerPageChange}
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                    </select>
                </label>
            </div>
        </div>
    )
}
