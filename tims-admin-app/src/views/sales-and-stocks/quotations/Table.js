// ** React Imports
import { Fragment, useState, useEffect, memo } from 'react'

// ** Table Columns
// ** Store & Actions
import { getAllData, searchProduct } from './store/actions'
import { useSelector, useDispatch } from 'react-redux'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { Archive, ChevronDown, Copy, Edit, Eye, EyeOff, MoreVertical, Trash2 } from 'react-feather'
import DataTable from 'react-data-table-component'
import {  Card, Col, Button, Row, Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Spinner, Label, CustomInput, Input, UncontrolledTooltip } from 'reactstrap'
import { useHistory } from 'react-router-dom'

import Avatar from '@components/avatar'

import useJwt from '@src/auth/jwt/useJwt'
import moment from 'moment'
// ** Table Header
// ** Table Header
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
          <Button.Ripple color='primary'
          onClick = {() => history.push('/sale/quotations/new')}
          >
            Créer
          </Button.Ripple>
        </Col>
      </Row>        
      

    </div>
  )
}

const DataTableServerSide = () => {


  const history = useHistory()
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.quotation)

  // ** States
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const [currentData, setCurrentData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // ** Get data on mount
  useEffect(() => {
    dispatch(getAllData({limit: rowsPerPage, page: currentPage}))
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
      dispatch(getAllData({limit: rowsPerPage, page: currentPage, search: searchTerm}))
    }
  }

  const copy = (vaue) => {
    /* Copy the text inside the text field */
    navigator.clipboard.writeText(vaue);
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 2000);
  }

  // ** Columns
const renderClient = row => {
  const stateNum = Math.floor(Math.random() * 6),
    states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary'],
    color = states[stateNum]

    if (row?.images && row?.images.length) {
    return <Avatar className='mr-1' img={`${process.env.REACT_APP_YEPIA_STATIC}${row.images[0]?.url}`} width='32' height='32' />
  } else {
    return <Avatar color={color || 'primary'} className='mr-1' content={row.title ?? ''} initials />
  }
}

  const supprimer = async (id, data) => {
    await client.updateProduct(id, {...data, isDeleted: true})
    .then(response => {
      dispatch(getAllData())
    })
    .then(() => {
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
    })

    .catch((error) => {
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
      console.log('Error', error)
      setLoading(false)
    })
  }
  
  const columns = [
    
    {
      name: 'Client',
      minWidth: '20%',
      selector: 'amount',
      sortable: true,
      cell: row => (
        <span className='font-weight-bold'>{(row?.user?.label)}</span>
      )
    },
    {
      name: 'Quantité',
      minWidth: '10%',
      cell: row => (
        <span className='font-weight-bold'>{row?.products?.length}</span>
      )
    },
    {
      name: 'Total',
      minWidth: '10%',
      cell: row => {
        let sum = 0;
        for (let index = 0; index < row?.products?.length; index++) {
          sum += (((100 - Number(row?.products[index].discount)) * row?.products[index].cost)/100);
        }
        return <span className='font-weight-bold'>{(((100 - Number(row?.globalDiscount)) * (Number(sum)))/100).toLocaleString('fr-FR')}</span>   
        
      }
    },
    
    {
      name: 'Prorgès',
      minWidth: '28%',
      selector: 'isActivated',
      sortable: true,
      cell: row => (
        <>
        {row?.accepted && row?.transformed && <Badge className='text-capitalize' color={ 'light-success'} pill>
          Accepté et transformé
        </Badge>}

        {row?.cancelled && <Badge className='text-capitalize' color={ 'light-danger'} pill>
          Réjété
        </Badge>}

        {row?.accepted && !row?.transformed && <Badge className='text-capitalize' color={ 'light-danger'} pill>
          Accepté
        </Badge>}
        </>
      )
    },
    {
      name: 'Expiration',
      minWidth: '20%',
      selector: 'expireDate',
      sortable: true,
      cell: row => (
        <>
        {moment(new Date(row.expireDate),  'DD/MM/YYYY hh:mm').format("DD-MM-YYYY")}
        </>
      )
    },
    
    {
      name: 'Actions',
      minWidth: '10%',
      cell: row => (
        <UncontrolledDropdown>
          <DropdownToggle tag='div' className='btn btn-sm'>
            <MoreVertical size={14} className='cursor-pointer' />
          </DropdownToggle>
          <DropdownMenu right>
           
            <DropdownItem
              className='w-100'
              onClick = {() => history.push(`/sale/quotations/edit/${row?._id}`)}
            >
              <Archive size={14} className='mr-50' />
              <span className='align-middle'>
                Détails
              </span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      )
    }
  ]

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
     
    {!store.loading ? 
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
    subHeaderComponent={
      <CustomHeader
        handlePerPage={handlePerPage}
        rowsPerPage={rowsPerPage}
        searchTerm={searchTerm}
        handleFilter={handleFilter}
      />
    }
  />
    : <Spinner/>}
      </Card>
    </Fragment>
  )
}

export default memo(DataTableServerSide)
