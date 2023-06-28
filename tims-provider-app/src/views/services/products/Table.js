// ** React Imports
import { Fragment, useState, useEffect, memo } from 'react'

// ** Table Columns
// ** Store & Actions
import { getAllData } from './store/actions'
import { useSelector, useDispatch } from 'react-redux'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { Archive, ChevronDown, Edit } from 'react-feather'
import DataTable from 'react-data-table-component'
import {  Card, Col, Row, Badge, Label, CustomInput, Input, Breadcrumb, BreadcrumbItem, CardBody, Button, Spinner} from 'reactstrap'
import { Link, useHistory } from 'react-router-dom'


import axios from 'axios'
import { base_url, file_url } from "@src/utility/baseUrl"
import { config } from '@src/utility/axiosconfig'

import NoData from '@components/noDataComponent';
import ProgressingComponent from '@components/progressingComponent';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
let timer = null
const MySwal = withReactContent(Swal)
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
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState(null)

  // ** Get data on mount
  useEffect(() => {
    dispatch(getAllData({limit: rowsPerPage, page: currentPage, search: searchTerm, archived: 'un-archived'}))
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
    
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      dispatch(getAllData({limit: rowsPerPage, page: 1, search: val, archived: 'un-archived'}))
    }, 1000)
  }
  let refuseTranslate = {
    "wrong-content": 'Mauvais contenu',
    "pornographic-images": 'Contenu pornographique',
    "poor-quality-images": "Mauvaise qualité d'image",
    "misspellings": "Graves fautes d'orthographe"
  }

  const getErrorMessage = ( errs ) => {
    let allMessage = [];
    errs.forEach(err => {
      allMessage.push(refuseTranslate[err])
    });
    return allMessage.toString().split(',').join(' - ')
  }

  const handleConfirmation = async (row) => {
    setSelected(row)
    return MySwal.fire({
      title: 'Êtes-vous sûr ?',
      text: "Vous ne pouvez pas annuler cela !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, archivez-le !',
        cancelButtonText: 'Annuler',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-outline-danger ml-1'
      },
      buttonsStyling: false
    }).then(async function (result) {
      if (result.value) {
        setLoading(true)
        await axios.put(`${base_url}product/update/${row?._id}`, {...row, isArchived: true, isBlocked: true}, config).then(() => {
        dispatch(getAllData({limit: rowsPerPage, page: currentPage, search: searchTerm, archived: 'un-archived'}))
        toast.success(
          <Fragment>
            <div className='toastify-header'>
              <div className='title-wrapper'>
                <Avatar size='sm' color='success' icon={<Check size={12} />} />
                <h6 className='toast-title font-weight-bold'>Archivage réussie!</h6>
              </div>
            </div>
          </Fragment>,
          { transition: Slide, hideProgressBar: true, autoClose: 2000 }
        )
        setLoading(false)
        }).catch((e) => {
          console.log(e)
          toast.success(
            <Fragment>
              <div className='toastify-header'>
                <div className='title-wrapper'>
                  <Avatar size='sm' color='success' icon={<Check size={12} />} />
                  <h6 className='toast-title font-weight-bold'>Suppression réussie!</h6>
                </div>
              </div>
            </Fragment>,
            { transition: Slide, hideProgressBar: true, autoClose: 2000 }
          )
          setLoading(false)
        })
      }
    })
    .catch((error) => {
      console.log('Error', error)
      setLoading(false)
    })
  }
  const columns = [
    {
      name: 'Titre',
      minWidth: '40%',
      selector: 'title',
      sortable: true,
      cell: row => (
        <div className='d-flex justify-content-left align-items-center'>
         <div
            className='user-name text-truncate mb-0 txt-ellipsis'
          >
            <span className='font-weight-bold '>{row.title}</span>
          </div>
      </div>
      )
    },
    {
      name: 'Nb. vendu(s)',
      minWidth: '10%',
      selector: 'createdAt',
      sortable: true,
      cell: row => (
        <>{row.purchaseCount}</>
      )
    },
    {
      name: 'Nb. vue(s)',
      minWidth: '10%',
      selector: 'createdAt',
      sortable: true,
      cell: row => (
        <>{row.viewsCount}</>
      )
    },
    {
      name: 'Etat',
      minWidth: '25%',
      selector: 'updatedAt',
      sortable: true,
      cell: row => (
        <div className='d-flex align-items-center' >
         <Badge className='text-capitalize' color={`${(row.isNew || row.isUpdated) ? 'light-secondary': `${row.cancelled ? 'light-danger' :row.isBlocked ? 'light-warning' :'light-success'}`}`} pill>
          {
            (row.isNew || row.isUpdated) ? 'En attente de vérification': 
            
            <>
            {row.cancelled ? 'Réfusé': row.isBlocked ? 'Non publié' :'Publié'}
            </>
          }
        </Badge>
        {row.cancelled && row?.refuseId && <span style={{padding: '0px 10px'}}>{getErrorMessage(row?.refuseId?.reason)}</span>}
        </div>
       
      )
    },
    {
      name: 'Actions',
      minWidth: '15%',
      cell: row => (
        <div className="d-flex align-items-center justify-content-center">
        <Button
          color="flat-primary"
          onClick = {() => history.push(`/service/products/edit/${row?._id}`)}
        >
          <Edit size={15} />
        </Button>

        {!row?.isNew && !loading && <Button
          color="flat-secondary"
          onClick = {() => handleConfirmation(row)}
        >
          <Archive size={15} />
        </Button>}

        {loading && (selected?._id === row?._id )&& <Spinner/>}
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
                <Link to='/'> Dashboard </Link>  
              </BreadcrumbItem>
              <BreadcrumbItem>
                <span> Produits </span>
              </BreadcrumbItem>
            </Breadcrumb>
          </div>
          <h1 style={{fontWeight: 'bold', marginLeft: '1rem'}}>LISTE DES ARTICLES ({(store.total ?? 0) }) </h1>
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
