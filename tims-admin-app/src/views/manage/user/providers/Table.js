// ** React Imports
import { Fragment, useState, useEffect } from 'react'


// ** Store & Actions
import { getAllData, searchProvider } from './store/action'
import { useDispatch, useSelector } from 'react-redux'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ChevronDown, MoreVertical, FileText, Eye, Trash2, Archive, Check, Edit, Trash, ArrowRight } from 'react-feather'
import DataTable from 'react-data-table-component'
import { Card, Input, Row, Col, Label, CustomInput, Button, Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Spinner, CardBody, Breadcrumb, BreadcrumbItem } from 'reactstrap'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import Avatar from '@components/avatar'
import moment from 'moment'
import NoData from '@components/noDataComponent';
import ProgressingComponent from '@components/progressingComponent';
import useJwt from '@src/auth/jwt/useJwt'
import { Slide, toast } from 'react-toastify'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import { base_url } from "@src/utility/baseUrl"
import { config } from '@src/utility/axiosconfig'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)
// ** Table Header
const CustomHeader = ({ handlePerPage, rowsPerPage, handleFilter, searchTerm }) => {
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

const CollaboratorList = () => {
 const histor = useHistory();
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.providers)

  // ** States
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [currentData, setCurrentData] = useState(null);
  const [editMode, setEditMode] = useState(false);

  // ** Function to toggle sidebar
  

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
    dispatch(searchProvider(val))

    if(!val) {
      dispatch(getAllData({limit: rowsPerPage, page: currentPage, search: searchTerm}))
    }
  }

  // ** Columns
const renderClient = row => {
  const stateNum = Math.floor(Math.random() * 6),
    states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary'],
    color = states[stateNum]

    return <Avatar color={color || 'primary'} className='mr-1' content={row?.companyInfo?.companyName ?? ''} initials />
}
const handleDeleteConfirmation = async ({_id}) => {
  return MySwal.fire({
    title: 'Êtes-vous sûr ?',
    text: "Vous ne pouvez pas annuler cela !",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Oui, supprimez-le !',
    cancelButtonText: 'Annuler',
    customClass: {
      confirmButton: 'btn btn-primary',
      cancelButton: 'btn btn-outline-danger ml-1'
    },
    buttonsStyling: false
  }).then(function (result) {
    if (result.value) {
      setDeleteLoading(true)
     axios.delete(`${base_url}partner/delete/${_id} `, config).then(() => {
      dispatch(getAllData({limit: rowsPerPage, page: currentPage, search: searchTerm, role: 'user'}))
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
      setDeleteLoading(false)
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
        setDeleteLoading(false)
      })
    }
  })
  .catch((error) => {
    console.log('Error', error)
    setDeleteLoading(false)
  })
}

const columns = [
  {
    name: 'Entreprise',
    minWidth: '25%',
    selector: 'company',
    sortable: true,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {renderClient(row)}
        <div className='d-flex flex-column'>
        <Link
              to={`/manage/users/providers/${row._id}`}
              className='user-name text-truncate mb-0'
        >
          <span className='font-weight-bold'>{row.companyInfo?.companyName}</span>
        </Link>
        </div>
      </div>
    )
  },
  {
    name: 'Addresse',
    minWidth: '30%',
    selector: 'company',
    sortable: true,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        <span className='font-weight-bold'>{row.locationInfo?.countryEmoji} {row.locationInfo?.countryName}, {row.locationInfo?.cityName}</span>
      </div>
    )
  },
  {
    name: 'Email',
    minWidth: '20%',
    cell: row => (

      <div className='d-flex flex-column'>
      <span className='font-weight-bold'>{row.email}</span>
      </div>
     
    )
  },
  {
    name: 'Etat',
    minWidth: '10%',
    cell: row => (
      <Badge className='text-capitalize' color={ !row.isActivated ? 'light-warning': (!row.isBlocked ? 'light-success' : 'light-secondary')} pill>

        {!row.isActivated ? 'Pas vérifié'
        :<>
        {!row.isBlocked ? 'actif' :  'inactif'}
        </>
        }
      </Badge>
    )
  },
  {
    name: 'Actions',
    minWidth: '15%',
    cell: row => (
      <div className="d-flex">
      <Button
        color="flat-primary"
        onClick={() => {
          histor.push(`/manage/users/providers/${row._id}`)
        }}
      >
        <Eye size={15} />
      </Button>
      <Button
        color="flat-primary"
        onClick={() => {
          window.open(`${process.env.REACT_APP_PARTNER_BASE_URL}/login?email=${row.email}&from=administration`, '_blank');
        }}
      >
        <ArrowRight/>
      </Button>
      
    </div>
    )
  }

]

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Number(Math.ceil(store.total / rowsPerPage))

    return (
      <ReactPaginate
        previousLabel={''}
        nextLabel={''}
        pageCount={count || 1}
        activeClassName='active'
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={page => handlePagination(page)}
        pageClassName={'page-item'}
        nextLinkClassName={'page-link'}
        nextClassName={'page-item next'}
        previousClassName={'page-item prev'}
        previousLinkClassName={'page-link'}
        pageLinkClassName={'page-link'}
        containerClassName={'pagination react-paginate justify-content-end my-2 pr-1'}
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
                <Link to='/'> OV </Link>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <Link to='#'> Utilisateurs </Link>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <span> Fournisseurs </span>
              </BreadcrumbItem>
            </Breadcrumb>
          </div>
            <h1 style={{fontWeight: 'bold', marginLeft: '1rem'}}>LISTE DES FOURNISSEURS ({(store.total ?? 0) }) </h1>
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

export default CollaboratorList
