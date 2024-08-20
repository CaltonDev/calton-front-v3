import styles from './Table.module.scss'
import { TableProps } from './Table.interface'
import React, { HTMLProps, useEffect } from 'react'
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getSortedRowModel,
    PaginationState,
    getPaginationRowModel,
} from '@tanstack/react-table'
import PageNavigator from '../PageNavigator/PageNavigator'
import SvgWrapper from '../SvgWrapper/SvgWrapper'

function IndeterminateCheckbox({
    indeterminate,
    className = '',
    ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
    const ref = React.useRef<HTMLInputElement>(null!)

    React.useEffect(() => {
        if (typeof indeterminate === 'boolean') {
            ref.current.indeterminate = !rest.checked && indeterminate
        }
    }, [ref, indeterminate])

    return (
        <input
            type="checkbox"
            ref={ref}
            className={className + ' cursor-pointer'}
            {...rest}
        />
    )
}

const Table = ({
    data = [],
    columnsData = [],
    fullyLoaded = false,
    fetchData,
}: TableProps) => {
    const columnHelper = createColumnHelper<any>()

    const columns: any[] = [
        columnHelper.accessor((row) => row, {
            id: 'select',
            header: () => <span></span>,
            cell: ({ row }) => (
                <div className="px-1">
                    <IndeterminateCheckbox
                        {...{
                            checked: row.getIsSelected(),
                            disabled: !row.getCanSelect(),
                            indeterminate: row.getIsSomeSelected(),
                            onChange: row.getToggleSelectedHandler(),
                        }}
                    />
                </div>
            ),
        }),
    ]

    let idx = 0
    columnsData?.forEach((column: any) => {
        idx += 1
        columns.push(
            columnHelper.accessor((row) => row[column?.title], {
                id: column?._id ? column._id : idx,
                cell: (info) => <i>{info.getValue()}</i>,
                header: () => <span>{column?.title}</span>,
                footer: (info) => info.column.id,
            })
        )
    })

    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    })

    const [rowSelection, setRowSelection] = React.useState({})
    const [columnVisibility, setColumnVisibility] = React.useState<any>({
        select: false,
    })

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: {
            pagination,
            rowSelection,
            columnVisibility,
        },
        enableRowSelection: true, //enable row selection for all rows
        onRowSelectionChange: setRowSelection,
        onColumnVisibilityChange: setColumnVisibility,
        getRowId: (row: any) => row?._id,
    })

    const changePage = (direction: any) => {
        if (direction === 'next') {
            setPagination({
                pageIndex: pagination.pageIndex + 1,
                pageSize: pagination.pageSize,
            })
        } else if (direction === 'previous') {
            setPagination({
                pageIndex: pagination.pageIndex - 1,
                pageSize: pagination.pageSize,
            })
        } else {
            const number = Number(direction)
            if (
                number > 0 &&
                number <= Math.ceil(data?.length / pagination.pageSize)
            ) {
                setPagination({
                    pageIndex: number - 1,
                    pageSize: pagination.pageSize,
                })
            } else {
                setPagination({
                    pageIndex: 0,
                    pageSize: pagination.pageSize,
                })
            }
        }
        if (!fullyLoaded) {
            if (fetchData) {
                fetchData(pagination.pageIndex, pagination.pageSize)
            }
        }
    }

    const changeElementsPerPage = (e: any) => {
        setPagination({
            pageIndex: 0,
            pageSize: e.value,
        })

        if (!fullyLoaded) {
            if (fetchData) {
                fetchData(pagination.pageIndex, pagination.pageSize)
            }
        }
    }

    const handleRowSelection = () => {
        setColumnVisibility({ select: true })
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.headerBtn}>
                    <div
                        className={styles.rowSelectionContainer}
                        onClick={handleRowSelection}
                    >
                        <SvgWrapper
                            keySvg={'rowSelection.svg'}
                            size={'medium'}
                            onClick={table.getToggleAllRowsSelectedHandler()}
                        />
                    </div>
                </div>
                <PageNavigator
                    pageElements={pagination.pageSize}
                    totalElements={data?.length}
                    currentPage={pagination.pageIndex}
                    changePage={changePage}
                    changeElementsPerPage={changeElementsPerPage}
                />
            </div>
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th key={header.id} className={styles.th}>
                                        <div
                                            {...{
                                                className:
                                                    header.column.getCanSort()
                                                        ? 'cursor-pointer select-none'
                                                        : '',
                                                onClick:
                                                    header.column.getToggleSortingHandler(),
                                            }}
                                        >
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                            {{
                                                asc: ' 🔼',
                                                desc: ' 🔽',
                                            }[
                                                header.column.getIsSorted() as string
                                            ] ?? null}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row) => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id} className={styles.td}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Table
