// ** React Imports
import { Fragment, useState, useEffect, memo, useRef } from 'react'

// ** Table Columns
// ** Store & Actions
import { getAllData, searchProduct } from './store/actions'
import { useSelector, useDispatch } from 'react-redux'
import Sidebar from '../../manage/show-rooms/stock-verification/Sidebar'
import AsyncSelect from "react-select/async";
// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ArrowRight, ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import {  Card, Col, Row, Spinner, Label, CustomInput, Input, Breadcrumb, BreadcrumbItem, CardBody, Button } from 'reactstrap'
import { Link, useHistory } from 'react-router-dom'


import axios from 'axios'
import { base_url } from "@src/utility/baseUrl"

import NoData from '@components/noDataComponent';
import ProgressingComponent from '@components/progressingComponent';
const CustomHeader = ({ handlePerPage, rowsPerPage }) => {

  return (
    <>
    <div className='invoice-list-table-header w-100 mr-1 ml-50 mt-2 mb-75'>
      <Row>
        <Col xl='4' className='d-flex align-items-center p-0'>
          <div className='d-flex align-items-center'>
            <Label for='rows-per-page'>Afficher</Label>
            <CustomInput
              className='form-control mx-50'
              type='select'
              id='rows-per-page'
              value={rowsPerPage}
              onChange={handlePerPage}
              style={{
                width: '5rem',
                padding: '0 0.8rem',
                backgroundPosition: 'calc(100% - 3px) 11px, calc(100% - 20px) 13px, 100% 0'
              }}
            >
              <option value='10'>10</option>
              <option value='25'>25</option>
              <option value='50'>50</option>
              <option value='100'>100</option>
            </CustomInput>
          </div>
          
        </Col>
      
      </Row>
    </div>
    </>
  )
}

const DataTableServerSide = () => {
  const userData = JSON.parse(localStorage.getItem('timsAdminuserData'))
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.stockIn)

  // ** States
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(1000000000)
  const [currentStock, setStock] = useState(null)

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const toggleSidebar = (update) => {
    setSidebarOpen(!sidebarOpen)
  }
  // ** Get data on mount
  useEffect(() => {
    dispatch(getAllData({limit: rowsPerPage, page: currentPage, agenceFromId: userData?.currentAgency, transferType: 'out' }))
  }, [currentPage, rowsPerPage])


  // ** Function in get data on page change
  const handlePagination = page => {
    setCurrentPage(page.selected + 1)
  }

  // ** Function in get data on rows per page
  const handlePerPage = e => {
    const value = parseInt(e.currentTarget.value)
    setRowsPerPage(value)
  }

  // ** Function in get data on search query change
  const handleFilter = val => {
    setSearchTerm(val)
    dispatch(searchProduct(val))
    if(!val) {
      dispatch(getAllData({limit: rowsPerPage, page: currentPage}))
    }
  }

  
  const columns = [
    {
      name: 'Product ID',
      minWidth: '20%',
      selector: 'productId',
      sortable: true,
      cell: row => (
        <div className='d-flex justify-content-left align-items-center'>
          <span className={`font-weight-bold`}>{row.productId?.productId}</span>
        </div>
      )
    },
    {
      name: 'Titre',
      selector: "title",
      minWidth: '40%',
      sortable: true,
      cell: row => (
        <span className={`font-weight-bold`}>{row.productId?.title}</span>
      )
    },
    {
      name: 'Quantité',
      selector: "quantity",
      minWidth: '8%',
      sortable: true,
      cell: row => (
        <div className='d-flex flex-column'>
         <span className='font-weight-bold '>{row.products?.length}</span>
        </div>
      )
    },
    {
      name: 'Vers',
      selector: "agenceToId",
      minWidth: '20%',
      sortable: true,
      cell: row => (
        <span className='font-weight-bold'>{row.agenceToId?.name}</span>
      )
    },
    {
      name: 'Actions',
      minWidth: '8%',
      cell: row => (
        <div className="d-flex">
        <Button
          color="flat-primary"
          onClick = {() => {
            setStock(row)
            toggleSidebar()
          }}
        >
          <ArrowRight size={15} />
        </Button>
        </div>
      )
    }
  ]

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Number((dataToRender().length / rowsPerPage))
    return (
      <ReactPaginate
        previousLabel={''}
        nextLabel={''}
        breakLabel='...'
        pageCount={count || 1}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        activeClassName='active'
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={page => handlePagination(page)}
        pageClassName={'page-item'}
        nextLinkClassName={'page-link'}
        nextClassName={'page-item next'}
        previousClassName={'page-item prev'}
        previousLinkClassName={'page-link'}
        pageLinkClassName={'page-link'}
        breakClassName='page-item'
        breakLinkClassName='page-link'
        loa
        containerClassName={
          'pagination react-paginate separated-pagination pagination-sm justify-content-end pr-1 mt-1'
        }
      />
    )
  }

  // ** Table data to render
  const dataToRender = () => {
    const filters = {
      q: searchTerm
    }

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0
    })

    if (store.data.length > 0) {
      return store.data
    } else if (store.data.length === 0 && isFiltered) {
      return []
    } else {
      return store.allData.slice(0, rowsPerPage)
    }
  }

  return (
    <Fragment>

        <Card>
            <CardBody>
            <div className='d-flex justify-content-start breadcrumb-wrapper mb-1'>
              <Breadcrumb>
                <BreadcrumbItem>
                <Link to='/'> Tims Admin </Link>  
                </BreadcrumbItem>

                <BreadcrumbItem>
                <Link to='#'> Gestion de stock </Link>  
                </BreadcrumbItem>
                
              <BreadcrumbItem>
                <span> Entrée de stock </span>
            </BreadcrumbItem>
          </Breadcrumb>
            </div>
          <h1 style={{fontWeight: 'bold', marginLeft: '1rem'}}>Entrée de stock </h1>
          </CardBody>
        </Card>
      <Card>
     
    <DataTable
    noHeader
    pagination
    subHeader
    responsive
    paginationServer
    columns={columns}
    sortIcon={<ChevronDown />}
    className='react-dataTable'
    paginationComponent={CustomPagination}
    data={dataToRender()}
    progressComponent={<ProgressingComponent />}
    noDataComponent={<NoData />}
    progressPending={store.loading}
    subHeaderComponent={
      <CustomHeader
        handlePerPage={handlePerPage}
        rowsPerPage={rowsPerPage}
        searchTerm={searchTerm}
        handleFilter={handleFilter}
        toggleSidebar={toggleSidebar}
      />
    }
  />
      </Card>

      <Sidebar open={sidebarOpen}
      toggleSidebar={toggleSidebar}
      currentStock = {currentStock}
      />
    </Fragment>
  )
}

export default memo(DataTableServerSide)
