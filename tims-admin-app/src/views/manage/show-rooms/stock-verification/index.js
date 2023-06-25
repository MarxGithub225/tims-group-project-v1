// ** React Imports
import { Fragment, useState, useEffect, memo } from 'react'

// ** Table Columns
// ** Store & Actions
import { getAllStockData } from '../store/action'
import { useSelector, useDispatch } from 'react-redux'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import {  Card, Col, Button, Row, Breadcrumb, BreadcrumbItem, CardBody } from 'reactstrap'
import { Link, useHistory, useParams } from 'react-router-dom'


import axios from 'axios'
import { base_url } from "@src/utility/baseUrl"
import { config } from '@src/utility/axiosconfig'
import NoData from '@components/noDataComponent';
import ProgressingComponent from '@components/progressingComponent';
import Sidebar from './Sidebar'


// ** Table Header
const CustomHeader = ({ selectedRow, toggleSidebar }) => {
  return (
    <div className='invoice-list-table-header w-100 mr-1 ml-50 mt-2 mb-75'>
      <Row>
        <Col xl='6' className='d-flex align-items-center p-0'>
        </Col>
        <Col
          xl='6'
          className='d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-lg-0 mt-1'
        >
          <Button.Ripple disabled={!selectedRow.length} color='primary'
          onClick = {() => toggleSidebar()}
          >
            Passer la commande
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
  const store = useSelector(state => state.agencies)

  // ** States
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(1000000000)
  const [agency, setAgency] = useState(null)
  const {id} = useParams()

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  const closeSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const [selectedRow, setSelected] = useState([])

  const hdlSelect = (row, index) => {
    let list = [...selectedRow]
    let exist = list.filter(l => l._id === row?._id).length;
    if(exist ===  0) {
      list.push(row);
      setSelected(list)
    }else  setSelected(list.filter(l => l._id !== row?._id));
  }


  // ** Get data on mount
  useEffect(() => {
    dispatch(getAllStockData({limit: rowsPerPage, page: currentPage, agenceId: id}))
  }, [currentPage, rowsPerPage])

  useEffect(() => {
    axios.get(`${base_url}agency/${id} `, config).then((response) => {
      setAgency(response.data)
    })
  }, [id])


  // ** Function in get data on page change
  const handlePagination = page => {
    setCurrentPage(page.selected + 1)
  }

  
  const columns = [
    {
      name: '',
      minWidth: '5%',
      sortable: true,
      cell: row => (
        <input type={'checkbox'} 
        onChange ={() => hdlSelect(row, row.index)}
        checked={selectedRow.filter(l => l._id === row?._id).length}
        />
      )
    },
    {
      name: 'Product ID',
      minWidth: '20%',
      selector: 'productId',
      sortable: true,
      cell: row => (
        <div className='d-flex justify-content-left align-items-center'>
          <span className={`font-weight-bold ${row.remaindCount <= row.inventoryThreshold ? 'text-danger': ''}`}>{row.productId?.productId}</span>
        </div>
      )
    },
    {
      name: 'Titre',
      selector: "quantity",
      minWidth: '55%',
      sortable: true,
      cell: row => (
        <div className='d-flex flex-column'>
          <div
            className='user-name text-truncate mb-0 txt-ellipsis'
          >
            <span className={`font-weight-bold ${row.remaindCount <= row.inventoryThreshold ? 'text-danger': ''}`}>{row.productId?.title}</span>
          </div>
        </div>
      )
    },
    {
      name: 'Quantité',
      selector: "quantity",
      minWidth: '10%',
      sortable: true,
      cell: row => (
        <div className='d-flex flex-column'>
         <span className={`font-weight-bold ${row.remaindCount <= row.inventoryThreshold ? 'text-danger': ''}`}>{row.remaindCount - row.inventoryThreshold}</span>
        </div>
      )
    },
    {
      name: 'Seuil',
      selector: "quantity",
      minWidth: '10%',
      sortable: true,
      cell: row => (
        <span className='font-weight-bold'>{row.inventoryThreshold}</span>
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

    if (store.stockData.length > 0) {
      return store.stockData
    } else if (store.stockData.length === 0 && isFiltered) {
      return []
    } else {
      return store.stockAllData.slice(0, rowsPerPage)
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
                <Link to='/manage/show-rooms'> Show rooms </Link>  
                </BreadcrumbItem>
                
              <BreadcrumbItem>
                <span> Vérifivation de stock </span>
            </BreadcrumbItem>
          </Breadcrumb>
            </div>
          <h1 style={{fontWeight: 'bold', marginLeft: '1rem'}}>VERIFICATION DE STOCK <span>{agency  ? `(${agency?.name})`  :  ''}</span></h1>
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
    progressPending={store.stockLoading}
    subHeaderComponent={
      <CustomHeader
      toggleSidebar={toggleSidebar}
        selectedRow={selectedRow}
      />
    }
  />
      </Card>

      <Sidebar open={sidebarOpen}
      toggleSidebar={toggleSidebar}
      data = {selectedRow}
      agencyId={id}
      />
    </Fragment>
  )
}

export default memo(DataTableServerSide)
