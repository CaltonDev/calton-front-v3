import styles from './Table.module.scss'
import { TableProps } from './Table.interface'
import React, { HTMLProps, useEffect, useState } from 'react'
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getSortedRowModel,
    getPaginationRowModel,
} from '@tanstack/react-table'
import PageNavigator from '../PageNavigator/PageNavigator'
import SvgWrapper from '../SvgWrapper/SvgWrapper'
import Typography from '../Typography/Typography'
import { useTranslation } from 'react-i18next'
import Switch from '../Switch/Switch'
import Hooks from '../../utils/hooks/Hooks'

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
    customHeight,
    bottomNavigator = false,
    pagination,
    setPagination,
    customToggleButton = undefined,
    totalItems = undefined,
}: TableProps) => {
    const { t } = useTranslation()
    const [tableSize, setTableSize] = useState('small')
    const [showTableColumnsVisibilityMenu, setShowTableColumnsVisibilityMenu] =
        useState(false)
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
    const [columnVisibility, setColumnVisibility] = React.useState<any>({})

    columnsData?.forEach((column: any) => {
        columns.push(
            columnHelper.accessor((row) => row[column?.title], {
                //TODO: fix apis to get always the same field id
                id: column?._id
                    ? column._id
                    : column?.name
                      ? column.name
                      : column?.title,
                cell: (info) => (
                    <>
                        {Array.isArray(info.getValue())
                            ? info.getValue()?.join(', ')
                            : info.getValue()}
                    </>
                ),
                header: () => <span>{column?.title}</span>,
                footer: (info) => info.column.id,
            })
        )
    })

    useEffect(() => {
        const tmpColumnsVisibility: any = {
            select: false,
        }

        columnsData?.forEach((column: any) => {
            tmpColumnsVisibility[column?.title] = true
        })

        setColumnVisibility(tmpColumnsVisibility)
    }, [columnsData])

    useEffect(() => {
        if (!fullyLoaded) {
            if (fetchData) {
                fetchData(pagination.pageIndex, pagination.pageSize)
            }
        }
    }, [pagination])

    const [rowSelection, setRowSelection] = React.useState({})
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: fullyLoaded
            ? {
                  pagination,
                  rowSelection,
                  columnVisibility,
              }
            : {
                  pagination: { pageIndex: 0, pageSize: pagination.pageSize },
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
                number <=
                    Math.ceil(
                        (totalItems ? totalItems : data?.length) /
                            pagination.pageSize
                    )
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
        // if (!fullyLoaded) {
        //     if (fetchData) {
        //         fetchData(pagination.pageIndex, pagination.pageSize)
        //     }
        // }
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

    //todo: move this outside table component
    const handleRowSelection = () => {
        setColumnVisibility({ select: true })
    }

    const handleChangeTableSize = (value: boolean) => {
        setTableSize(value ? 'large' : 'small')
    }

    const handleTableColumnsVisibility = () => {
        //todo: check why this not working
        setShowTableColumnsVisibilityMenu(!showTableColumnsVisibilityMenu)
    }

    const setColumnVisible = (column: string) => {
        const tmpColumnVisibility = JSON.parse(JSON.stringify(columnVisibility))

        tmpColumnVisibility[column] = !tmpColumnVisibility[column]

        setColumnVisibility(tmpColumnVisibility)
    }

    const handleClickOutside = () => {
        setShowTableColumnsVisibilityMenu(false)
    }

    const ref = Hooks.useOutsideClick(handleClickOutside)

    return (
        <div
            className={
                bottomNavigator ? styles.containerReverse : styles.container
            }
        >
            <div
                className={
                    bottomNavigator ? styles.headerReverse : styles.header
                }
            >
                {!bottomNavigator && (
                    <div className={styles.headerBtn}>
                        <div
                            className={styles.rowSelectionContainer}
                            onClick={handleTableColumnsVisibility}
                        >
                            <SvgWrapper
                                keySvg={'rowSelection.svg'}
                                size={'medium'}
                                //onClick={table.getToggleAllRowsSelectedHandler()}
                            />
                            <SvgWrapper
                                keySvg={'arrowDownSvg'}
                                size={'medium'}
                                color={'black'}
                                //onClick={table.getToggleAllRowsSelectedHandler()}
                            />
                        </div>
                        {showTableColumnsVisibilityMenu && (
                            <div className={styles.columnsMenu} ref={ref}>
                                {columnsData?.map((column: any) => {
                                    return (
                                        <div
                                            key={column?.title}
                                            className={styles.menuRow}
                                        >
                                            <Typography
                                                size={'bodySmall'}
                                                weight={'light'}
                                            >
                                                {column?.title}
                                            </Typography>
                                            <div
                                                className={
                                                    styles.menuIconsContainer
                                                }
                                            >
                                                <Switch
                                                    checked={
                                                        columnVisibility[
                                                            column?.title
                                                        ]
                                                    }
                                                    disabled={false}
                                                    onClick={() =>
                                                        setColumnVisible(
                                                            column?.title
                                                        )
                                                    }
                                                    icon={true}
                                                />
                                                <SvgWrapper
                                                    keySvg={'trashIcon'}
                                                    size={'medium'}
                                                    customColor={
                                                        column?.type
                                                            ? 'black'
                                                            : '#C0BBC5'
                                                    }
                                                    disabled={!column?.type}
                                                    //onClick={table.getToggleAllRowsSelectedHandler()}
                                                />
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                        <div className={styles.tableSizeSelectorContainer}>
                            <div
                                className={styles.textContainer}
                                onClick={() => handleChangeTableSize(true)}
                                style={{
                                    background:
                                        tableSize === 'large'
                                            ? 'black'
                                            : 'white',
                                    borderTopLeftRadius:
                                        tableSize === 'large' ? 5 : 10,
                                    borderBottomLeftRadius:
                                        tableSize === 'large' ? 5 : 10,
                                }}
                            >
                                <Typography
                                    size={'bodyMedium'}
                                    weight={'normal'}
                                    customTextColor={
                                        tableSize === 'large'
                                            ? 'white'
                                            : 'black'
                                    }
                                >
                                    {t('Large')}
                                </Typography>
                            </div>
                            <div
                                className={styles.textContainer}
                                onClick={() => handleChangeTableSize(false)}
                                style={{
                                    background:
                                        tableSize === 'small'
                                            ? 'black'
                                            : 'white',
                                    borderTopRightRadius:
                                        tableSize === 'small' ? 5 : 10,
                                    borderBottomRightRadius:
                                        tableSize === 'small' ? 5 : 10,
                                }}
                            >
                                <Typography
                                    size={'bodyMedium'}
                                    weight={'normal'}
                                    customTextColor={
                                        tableSize === 'small'
                                            ? 'white'
                                            : 'black'
                                    }
                                >
                                    {t('Small')}
                                </Typography>
                            </div>
                        </div>
                        {customToggleButton && (
                            <div
                                className={
                                    styles.tableCustomToggleButtonContainer
                                }
                            >
                                <div
                                    className={styles.textContainer}
                                    onClick={() =>
                                        customToggleButton.handleToggle(true)
                                    }
                                    style={{
                                        background:
                                            customToggleButton.currentState ===
                                            customToggleButton.leftValue.value
                                                ? 'black'
                                                : 'white',
                                        borderTopLeftRadius: 7,
                                        borderBottomLeftRadius: 7,
                                    }}
                                >
                                    <Typography
                                        size={'bodyMedium'}
                                        weight={'normal'}
                                        customTextColor={
                                            customToggleButton.currentState ===
                                            customToggleButton.leftValue.value
                                                ? 'white'
                                                : 'black'
                                        }
                                    >
                                        {t(customToggleButton.leftValue.label)}
                                    </Typography>
                                </div>
                                <div
                                    className={styles.textContainer}
                                    onClick={() =>
                                        customToggleButton.handleToggle(false)
                                    }
                                    style={{
                                        background:
                                            customToggleButton.currentState ===
                                            customToggleButton.rightValue.value
                                                ? 'black'
                                                : 'white',
                                        borderTopRightRadius: 7,
                                        borderBottomRightRadius: 7,
                                    }}
                                >
                                    <Typography
                                        size={'bodyMedium'}
                                        weight={'normal'}
                                        customTextColor={
                                            customToggleButton.currentState ===
                                            customToggleButton.rightValue.value
                                                ? 'white'
                                                : 'black'
                                        }
                                    >
                                        {t(customToggleButton.rightValue.label)}
                                    </Typography>
                                </div>
                            </div>
                        )}
                    </div>
                )}
                <PageNavigator
                    pageElements={pagination.pageSize}
                    totalElements={totalItems ? totalItems : data?.length}
                    currentPage={pagination.pageIndex}
                    changePage={changePage}
                    changeElementsPerPage={changeElementsPerPage}
                />
            </div>
            <div
                className={styles.tableContainer}
                //style={{ height: customHeight ? customHeight : '' }}
            >
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
                                    <td
                                        key={cell.id}
                                        className={
                                            tableSize === 'large'
                                                ? styles.tdLarge
                                                : styles.tdSmall
                                        }
                                    >
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
