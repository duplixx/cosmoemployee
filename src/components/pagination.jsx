import React, { useMemo } from 'react';
import { Pagination, Button } from '@nextui-org/react';
export default function PaginationComponent({ selectedKeys, items, page, pages, setPage }) {
    const onPreviousPage = () => setPage(page - 1);
    const onNextPage = () => setPage(page + 1);
    const filteredItems = useMemo(() => {
        if (Array.isArray(selectedKeys)) {
            return items.filter(item => selectedKeys.includes(item.id));
        }
        return items;
    }, [items, selectedKeys]);
    return (
      <div className="py-2 px-2 flex justify-between items-center ">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.length} of ${filteredItems.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button isDisabled={page === 1} size="sm" variant="flat" onPress={onPreviousPage}>
            Previous
          </Button>
          <Button isDisabled={page === pages} size="sm" variant="flat" onPress={onNextPage}>
            Next
          </Button>
        </div>
      </div>
    );
}
