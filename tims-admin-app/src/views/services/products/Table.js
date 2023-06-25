// ** React Imports
import { Fragment, useState, useEffect, memo } from 'react'

// ** Table Columns
// ** Store & Actions
import { getAllData, searchProduct } from './store/actions'
import { useSelector, useDispatch } from 'react-redux'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { Archive, ArrowLeftCircle, ArrowRight, ChevronDown, Copy, Edit, Eye, EyeOff, MoreVertical, Trash, Trash2 } from 'react-feather'
import DataTable from 'react-data-table-component'
import {  Card, Col, Button, Row, Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Spinner, Label, CustomInput, Input, UncontrolledTooltip, Breadcrumb, BreadcrumbItem, CardBody } from 'reactstrap'
import { Link, useHistory } from 'react-router-dom'

import Avatar from '@components/avatar'

import useJwt from '@src/auth/jwt/useJwt'
import moment from 'moment'
// ** Table Header
// ** Table Header

import axios from 'axios'
import { base_url, file_url } from "@src/utility/baseUrl"
import { config } from '@src/utility/axiosconfig'
import NoData from '@components/noDataComponent';
import ProgressingComponent from '@components/progressingComponent';

const CustomHeader = ({ handlePerPage, rowsPerPage, handleFilter, searchTerm }) => {
  const history = useHistory()
  return (
    <div className='invoice-list-table-header w-100 mr-1 ml-50 mt-2 mb-75'>
      <Row>
        <Col xl='6' className='d-flex align-items-center p-0'>
          <div className='d-flex align-items-center w-100'>
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
        <Col
          xl='6'
          className='d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-lg-0 mt-1'
        >
          <div className='d-flex align-items-center mb-sm-0 mb-1 mr-1'>
            <Label className='mb-0' for='search-invoice'>
              Recherche:
            </Label>
            <Input
              id='search-invoice'
              className='ml-50 w-100'
              type='text'
              value={searchTerm}
              onChange={e => handleFilter(e.target.value)}
            />
          </div>
        </Col>
      </Row>
    </div>
  )
}

const DataTableServerSide = () => {


  const history = useHistory()
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.products)

  // ** States
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [currentData, setCurrentData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // ** Get data on mount
  useEffect(() => {
    dispatch(getAllData({limit: rowsPerPage, page: currentPage, search: searchTerm}))
  }, [currentPage, rowsPerPage])

  // ** Function in get data on page change
  const handlePagination = page => {
    setCurrentPage(page.selected + 1)
  }

  // ** Function in get data on rows per page
  const handlePerPage = e => {
    const value = parseInt(e.currentTarget.value)
    setRowsPerPage(value)
    setCurrentPage(1)
  }

  // ** Function in get data on search query change
  const handleFilter = val => {
    setSearchTerm(val)
    dispatch(searchProduct(val))

    if(!val) {
      dispatch(getAllData({limit: rowsPerPage, page: currentPage, search: searchTerm}))
    }
  }


  
  const columns = [
    {
      name: 'Titre',
      minWidth: '40%',
      selector: 'Produit',
      sortable: true,
      cell: row => (
        <div className='d-flex justify-content-left align-items-center'>
        <div className='d-flex flex-column'>
          <div
            className='user-name text-truncate mb-0 txt-ellipsis'
          >
            <span className='font-weight-bold '>{row.title}</span>
          </div>
        </div>
      </div>
      )
    },
    {
      name: 'Partner',
      minWidth: '24%',
      selector: 'createdAt',
      sortable: true,
      cell: row => (
        <Link
              to={`/manage/users/providers/${row.partnerId?._id}`}
              className='user-name text-truncate mb-0'
        >
          <span className='font-weight-bold'>{row?.partnerId?.companyInfo?.companyName}</span>
        </Link>
      )
    },
    {
      name: 'Etat',
      minWidth: '20%',
      selector: 'updatedAt',
      sortable: true,
      cell: row => (
        <Badge className='text-capitalize' color={`${(row.isNew || row.isUpdated) ? 'light-secondary': `${row.isBlocked ? 'light-warning' :'light-success'}`}`} pill>
          {
            (row.isNew || row.isUpdated) ? 'En attente de vérification': <>
            {row.isBlocked ? 'Non publié' :'Publié'}
            </>
          }
        </Badge>
      )
    },
    {
      name: 'Actions',
      minWidth: '10%',
      cell: row => (
        <div className="d-flex">
        <Button
          color="flat-primary"
          onClick = {() => history.push(`/service/products/edit/${row?._id}`)}
        >
          <ArrowRight size={15} />
        </Button>
        
        </div>
      )
    }
  ]

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Number((store.total / rowsPerPage))
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
                <span> Nouveaux produits </span>
              </BreadcrumbItem>
            </Breadcrumb>
          </div>
          <h1 style={{fontWeight: 'bold', marginLeft: '1rem'}}>LISTE DES NOUVEAUX ARTICLES ({(store.total ?? 0) }) </h1>
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
      />
    }
  />
      </Card>
    </Fragment>
  )
}

export default memo(DataTableServerSide)
