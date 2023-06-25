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
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import {  Card, Col, Row, Spinner, Label, CustomInput, Input, Breadcrumb, BreadcrumbItem, CardBody, Button } from 'reactstrap'
import { Link, useHistory } from 'react-router-dom'


import axios from 'axios'
import { base_url } from "@src/utility/baseUrl"

import NoData from '@components/noDataComponent';
import ProgressingComponent from '@components/progressingComponent';
const CustomHeader = ({ handlePerPage, rowsPerPage, handleFilter, searchTerm, setAgency, agency, setAsk, selectedRow, toggleSidebar, makeAsk }) => {
  const history = useHistory()
  let timer = useRef()
  // ** Configure SDK Client

  const getSelectData = (data) => {
    const tab = []
    for (let i = 0; i < data.length; i++) {
      tab.push({
        value: data[i]._id,
        label: data[i].name
      })
    }
    return tab
  }
  const loadAsyncOptions = (inputValue, callback) => {
      if (inputValue?.length >= 2) {
        if (timer.current) clearTimeout(timer.current)

        timer.current = setTimeout(async () => {
          const queryString = new URLSearchParams({offset: 0, limit: 20, name: inputValue}).toString();
          await axios.get(`${base_url}agency?${queryString}`).then((response) => {
            callback(getSelectData(response.data.data))
          }).catch((e) => {
            callback(getSelectData([]))
          })
        }, 1000)
      }
    }

    const styles = {
      container: provided => ({
        ...provided,
        width: 300
      }),
      multiValue: (base, state) => {
        return { ...base, backgroundColor: "#546e7a" }
      },
      multiValueLabel: (base, state) => {
        return { ...base, backgroundColor: "#546e7a" }
      }
    };
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

          {!selectedRow.length ?
            <Button.Ripple color='secondary'
            onClick = {() => setAsk(!makeAsk)}
            >
              {makeAsk ? 'Annuler': 'Demande d\'app'}
            </Button.Ripple>:
            <Button.Ripple disabled={!selectedRow.length} color='primary'
            onClick = {() => toggleSidebar()}
            >
              Passer la commande
            </Button.Ripple>
          }
        </Col>
        <Col
          xl='4'
          className='d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-lg-0 mt-1'
        >
          <div className='d-flex align-items-center mb-sm-0 mb-1 mr-1'>
            <Label className='mb-0' for='search-invoice'>
              Agence:
            </Label>
            <AsyncSelect
                isMulti={false}
                name="provider"
                className='react-select ml-50' 
                classNamePrefix='select'
                styles={styles}
                loadOptions={loadAsyncOptions}
                defaultOptions={false}
                isClearable={true}
                onChange={(option) => setAgency(option)}
                value={agency}
            />
          </div>
        </Col>

        <Col
          xl='4'
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
    </>
  )
}

const DataTableServerSide = () => {
  const userData = JSON.parse(localStorage.getItem('timsAdminuserData'))
  const history = useHistory()
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.level)

  // ** States
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(1000000000)
  const [agency, setAgency] = useState(null);
  const [makeAsk, setAsk] = useState(false);
  const [selectedRow, setSelected] = useState([])

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const toggleSidebar = (update) => {
    if(update) {
      setAsk(false)
      setSelected([])
    }
    setSidebarOpen(!sidebarOpen)
  }

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
    dispatch(getAllData({limit: rowsPerPage, page: currentPage}))
  }, [currentPage, rowsPerPage])

  useEffect(() => {
    if(agency)
    dispatch(getAllData({limit: rowsPerPage, page: currentPage, agenceId: agency?.value}))
  }, [agency])

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

  
  const columns = !makeAsk ? [
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
      minWidth: '45%',
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
      minWidth: '8%',
      sortable: true,
      cell: row => (
        <div className='d-flex flex-column'>
         <span className='font-weight-bold '>{row.count}</span>
        </div>
      )
    },
    {
      name: 'Achété',
      selector: "quantity",
      minWidth: '8%',
      sortable: true,
      cell: row => (
        <span className='font-weight-bold'>{row.boughtCount}</span>
      )
    },
    {
      name: 'Reste',
      selector: "quantity",
      minWidth: '8%',
      sortable: true,
      cell: row => (
        <span className={`font-weight-bold ${row.remaindCount <= row.inventoryThreshold ? 'text-danger': ''}`}>{row.remaindCount}</span>
      )
    },
    {
      name: 'Seuil',
      selector: "quantity",
      minWidth: '8%',
      sortable: true,
      cell: row => (
        <span className='font-weight-bold'>{row.inventoryThreshold}</span>
      )
    }
  ]: 
  [
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
      selector: "title",
      minWidth: '40%',
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
      minWidth: '8%',
      sortable: true,
      cell: row => (
        <div className='d-flex flex-column'>
         <span className='font-weight-bold '>{row.count}</span>
        </div>
      )
    },
    {
      name: 'Achété',
      selector: "quantity",
      minWidth: '8%',
      sortable: true,
      cell: row => (
        <span className='font-weight-bold'>{row.boughtCount}</span>
      )
    },
    {
      name: 'Reste',
      selector: "quantity",
      minWidth: '8%',
      sortable: true,
      cell: row => (
        <span className={`font-weight-bold ${row.remaindCount <= row.inventoryThreshold ? 'text-danger': ''}`}>{row.remaindCount}</span>
      )
    },
    {
      name: 'Seuil',
      selector: "quantity",
      minWidth: '8%',
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
                <span> Niveau de stock </span>
            </BreadcrumbItem>
          </Breadcrumb>
            </div>
          <h1 style={{fontWeight: 'bold', marginLeft: '1rem'}}>STOCK <span>{agency  ? `(${agency?.label})`  :  ''}</span> </h1>
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
        agency={agency}
        setAgency= {setAgency}
        handlePerPage={handlePerPage}
        rowsPerPage={rowsPerPage}
        searchTerm={searchTerm}
        handleFilter={handleFilter}
        setAsk={setAsk}
        makeAsk={makeAsk}
        selectedRow={selectedRow}
        toggleSidebar={toggleSidebar}
      />
    }
  />
      </Card>

      <Sidebar open={sidebarOpen}
      toggleSidebar={toggleSidebar}
      data = {selectedRow}
      agencyId={userData?.currentAgency}
      />
    </Fragment>
  )
}

export default memo(DataTableServerSide)
