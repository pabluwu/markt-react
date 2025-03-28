import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    flexRender,
} from "@tanstack/react-table";
import './style.css';
import { useEffect, useState } from "react";

const Table = ({ data, columns }) => {

    const [pageIndex, setPageIndex] = useState(0); // Track the current page
    const [pageSize, setPageSize] = useState(10); // Track the page size

    const totalPages = Math.ceil(data?.length / pageSize);
    useEffect(() => {
        setPageIndex(0);
    }, [data])

    const table = useReactTable({
        data, 
        columns,
        pageCount: Math.ceil(data.length / pageSize),
        state: {
            pagination: { pageIndex, pageSize },
        },
        // onPaginationChange: ({ pageIndex, pageSize }) => {
        //     setPageIndex(pageIndex);
        //     setPageSize(pageSize);
        // },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    const getPageNumbers = () => {
        const pages = [];
        // Current page
        pages.push(pageIndex);
        // Next two pages
        for (let i = 1; i <= 2; i++) {
            const nextPage = pageIndex + i;
            if (nextPage < totalPages) {
                pages.push(nextPage);
            }
        }
        return pages;
    };

    const pages = getPageNumbers();
    return (
        <>
            <table style={{ width: '100%' }}>
                <thead className="StyledThead">
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id}>{header.column.columnDef.header}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody className="StyledTbody">
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="ContainerPaginator">
                Mostrando registros del {pageIndex + 1} al {pageSize * (pageIndex + 1)} de un total de {data.length} registros.
                <div>
                    <span onClick={() => setPageIndex(prev => Math.max(prev - 1, 0))} disabled={pageIndex === 0}>
                        Anterior
                    </span>
                    {pages.map((page,index) => (
                        <span
                            key={index}
                            onClick={() => setPageIndex(page)}
                            style={{
                                fontWeight: page === pageIndex ? 'normal' : 'normal',
                                color: page === pageIndex && '#ffffff',
                                backgroundColor: page === pageIndex && '#002EFF'
                            }}
                        >
                            {page + 1}
                        </span>
                    ))}
                    <span onClick={() => setPageIndex(prev => Math.min(prev + 1, totalPages - 1))} disabled={pageIndex === totalPages - 1}>
                        Siguiente
                    </span>
                </div>
            </div>
        </>
    )
}

export default Table;