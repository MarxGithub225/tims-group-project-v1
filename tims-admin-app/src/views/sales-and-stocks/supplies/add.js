import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Card, CardBody, Form, FormGroup, Button, Spinner, Breadcrumb, BreadcrumbItem } from 'reactstrap'


import { useForm } from 'react-hook-form';

import Avatar from '@components/avatar'
import {Check, Edit, Printer} from 'react-feather'
import { Slide, toast } from 'react-toastify'
import { Link, useHistory, useParams } from 'react-router-dom';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import $ from 'jquery'
import axios from 'axios'
import { base_url } from "@src/utility/baseUrl"
// ** Invoice List Sidebar
import Sidebar from './Sidebar'

// ** Table Columns
// ** Store & Actions
import { getAllData, searchProduct } from './store/actions'
import { useSelector, useDispatch } from 'react-redux'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { Archive, ChevronDown, Copy, Eye, EyeOff, MoreVertical, Trash2 } from 'react-feather'
import DataTable from 'react-data-table-component'
import {  Col, Row, Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Label, CustomInput, Input, UncontrolledTooltip} from 'reactstrap'

import NoData from '@components/noDataComponent';
import ProgressingComponent from '@components/progressingComponent';
import moment from 'moment';
import dateToLocalString from '../../../utility/dateToLocalString';

function ProductForm() {

  const dispatch = useDispatch()
  const store = useSelector(state => state.supplies)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  const closeSidebar = () => {
    setSidebarOpen(!sidebarOpen)
    setEditMode(false)
    setCurrentData(null)
  }
  const [currentData, setCurrentData] = useState(null);
  const [loading, setLoading] = useState(false)
  const [loadingData, setLoadingData] = useState(true)
  const {id} = useParams()
  // ** Vars
  const [editMode, setEditMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [selectedProduct, setSelectedProduct] = useState(null)
  useEffect(() => {
    dispatch(getAllData({limit: rowsPerPage, page: currentPage, productId: id}))
  }, [currentPage, rowsPerPage])

  useEffect(() => {
    if(id) {
    ;(async () => {
      try {
          const product = await axios.get(`${base_url}product/${id}`);
          setSelectedProduct({...product?.data})
          dispatch(getAllData({limit: rowsPerPage, page: currentPage, productId: id}))
      } catch (error) {
        
      }
      setLoadingData(false)
    })()
  }
  
  }, [id])
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

   // ** Custom Pagination
   const CustomPagination = () => {
    const count = Number((store.total / rowsPerPage).toFixed(0))

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
        containerClassName={
          'pagination react-paginate separated-pagination pagination-sm justify-content-end pr-1 mt-1'
        }
      />
    )
  }

  // ** Table data to render
  const dataToRender = () => {
    

    

    if (store.data.length > 0) {
      return store.data
    } else if (store.data.length === 0) {
      return []
    } else {
      return store.allData.slice(0, rowsPerPage)
    }
  }
  const columns = [
    {
      name: 'Date d\'arrivage',
      minWidth: '20%',
      selector: 'name',
      sortable: true,
      cell: row => (
        <span className='font-weight-bold'>{moment(row.arrivalDate).format('DD/MM/YYY à HH:mm:s')}</span>
      )
    },
    {
      name: 'Fournisseur',
      minWidth: '15%',
      cell: row => (
  
        <div className='d-flex flex-column'>
        <Link
          to={`/apps/user/view/${row?.providerId && row?.providerId?._id}`}
          className='user-name text-truncate mb-0'
        >
          <span className='font-weight-bold'>{row?.providerId && row?.providerId?.companyName}</span>
        </Link>
        <small className='text-truncate text-muted mb-0'>@{row?.providerId && row?.providerId?.email}</small>
        </div>
       
      )
    },
    {
      name: 'Guarantie',
      minWidth: '10%',
      cell: row => (
  
        <div className='d-flex flex-column'>
        <span className='font-weight-bold'>{row.warrantyPeriod === 0 ? 'Aucune': `${row.warrantyPeriod} mois`}</span>
        </div>
       
      )
    },
    {
      name: 'P. Achat',
      minWidth: '10%',
      cell: row => (
  
        <div className='d-flex flex-column'>
        <span className='font-weight-bold'>{row?.purchasePrice?.toLocaleString('fr-FR')} F</span>
        </div>
       
      )
    },
    {
      name: 'P. Vente',
      minWidth: '10%',
      cell: row => (
  
        <div className='d-flex flex-column'>
        <span className='font-weight-bold'>{!row.isPromoted ? row?.sellingPrice?.toLocaleString('fr-FR'): 
        `${row?.sellingPrice?.toLocaleString('fr-FR')} | ${row?.promoPrice?.toLocaleString('fr-FR')}`} F</span>
        </div>
       
      )
    },
    {
      name: 'Total',
      minWidth: '5%',
      cell: row => (
  
        <div className='d-flex flex-column'>
        <span className='font-weight-bold'>{(() => {
            let total = 0;
            row?.supplies?.map(supp => total = total + supp.quantity);
            return <>{total}</>
          })()}
        </span>
        </div>
       
      )
    },
    {
      name: 'S. Rémise',
      minWidth: '10%',
      cell: row => (
  
        <div className='d-flex flex-column'>
        <span className='font-weight-bold'>{row.discountThreshold}%</span>
        </div>
       
      )
    },
    {
      name: 'Actions',
      minWidth: '20%',
      cell: row => (
        <div className="d-flex">
        <Button
          color="flat-primary"
          onClick={() => {
            setEditMode(true)
            setCurrentData(row)
            toggleSidebar()
          }}
        >
          <Eye size={15} />
        </Button>
        <Button
          color="flat-warning"
          onClick={() => {
            setEditMode(true)
            setCurrentData(row)
            toggleSidebar()
          }}
        >
          <Printer size={15} />
        </Button>
      </div>
        
      )
    }
   
  ]
  return (
    <>

          <Card>
            <CardBody>
            <div className='d-flex justify-content-start breadcrumb-wrapper mb-1'>
              <Breadcrumb>
                <BreadcrumbItem>
                <Link to='/'> Tims Admin </Link>  
                </BreadcrumbItem>

                <BreadcrumbItem>
                <Link to='/service/products'> Produits </Link>  
                </BreadcrumbItem>
                
              <BreadcrumbItem>
                <span> Réapprovisionnement </span>
            </BreadcrumbItem>
          </Breadcrumb>
            </div>
            <h1 style={{fontWeight: 'bold', marginLeft: '1rem'}}>PRODUIT: {loadingData ? <Spinner/> : `${selectedProduct?.title}`} </h1>
          </CardBody>
        </Card>
    <Card>
      <CardBody>

        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
          >

            <h1 style={{fontWeight: 'bold', marginLeft: '1rem'}}>ARRIVAGES ({(store.total ?? 0) }) </h1>
            <Button type='button' className='mr-1' color='primary'
            onClick = {() => toggleSidebar()}
            >
              Ajouter un arrivage
            </Button>
        </div>
       
      </CardBody>
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
        />
    </Card>

    <Sidebar open={sidebarOpen} 
      currentData = {currentData}
      editMode = {editMode}
      rowsPerPage={rowsPerPage}
      currentPage={currentPage}
      toggleSidebar={!editMode ? toggleSidebar: closeSidebar} productId={id} />
    </>
  )
}

export default ProductForm