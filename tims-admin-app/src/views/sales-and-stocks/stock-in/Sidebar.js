// ** React Import
import { Fragment, useEffect, useState } from 'react'

import Avatar from '@components/avatar'
// ** Custom Components
import Sidebar from '@components/sidebar'
// ** Utils

// ** Third Party Components
import classnames from 'classnames'
import { useForm } from 'react-hook-form'

// ** Store & Actions
import {Check, ChevronUp} from 'react-feather'

import { Slide, toast } from 'react-toastify'

import axios from 'axios'
import { base_url } from "@src/utility/baseUrl"
import ReactPaginate from 'react-paginate'
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import {  Card, Col, Button, Row, Breadcrumb, BreadcrumbItem, FormGroup, Form, Input, Spinner  } from 'reactstrap'
import { Link, useHistory, useParams } from 'react-router-dom'
import NoData from '@components/noDataComponent';
import ProgressingComponent from '@components/progressingComponent';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useDispatch } from 'react-redux'
import { getAllData } from './store/actions'

const MySwal = withReactContent(Swal)

const SidebarBrand = ({ open, 
  toggleSidebar, 
  currentStock,
  editMode= false,
}) => {

  // ** States
  const [loading, setLoading] = useState(false)
  const [dataLoading, setDataLoading] = useState(true)
  const [declineLoading, setDeclineLoading] = useState(false)
  const [transferLoading, setTransferLoading] = useState(false)
  const [allPieces, setAllPieces] = useState([])
  const [pieces, setPieces] = useState([])
  // ** Store Vars
  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(50)
  const dispatch = useDispatch()
  // ** Vars
  const { handleSubmit } = useForm()

  // ** Function to handle form submit
 

  const close = async () => {
    toggleSidebar()
  }

  const [selectedRow, setSelected] = useState([])

  const hdlSelect = (row, index) => {
    let list = [...selectedRow]
    let exist = list.filter(l => l._id === row?._id).length;
    if(exist ===  0) {
      list.push({...row});
      setSelected(list)
    }else  setSelected(list.filter(l => l._id !== row?._id));
  }

  useEffect(() => {
    if(currentStock) {
      setAllPieces
    }
    
  }, [currentStock])

  useEffect(() => {
    if(currentStock) {
    ;(async () => {
      try {
        setAllPieces(currentStock.products)
        setPieces(currentStock.products)
        setTotal(currentStock.products?.length)
        
      } catch (error) {
        console.error(error)
      }
      setDataLoading(false)
    })()}
  }, [currentStock])
 
  
  const handlePagination = page => {
    setCurrentPage(page.selected + 1)
  }

  const columns = [
    {
      name: 'Numéro de série',
      minWidth: '80%',
      selector: 'serialNumber',
      sortable: true,
      cell: row => (
        <div className='d-flex justify-content-left align-items-center'>
          <span className={`font-weight-bold`}>{row.serialNumber}</span>
        </div>
      )
    },
    {
      name: 'Actions',
      minWidth: '20%',
      selector: 'serialNumber',
      sortable: true,
      cell: row => (
        <Button
        onClick={() => validate(row)}
        >
          Valider
        </Button>
      )
    },
    
  ]

  const validate = async (data) => {
    try {
      await axios.put(`${base_url}stock-level/update/${data?._id}`, {trasnferPending: false, agenceId: currentStock?.agenceToId?._id, historicals: [
        ...data.historicals,
                    {
                      action: 'Transfert',
                      from: currentStock?.agenceFromId?._id,
                      to: currentStock?.agenceToId?._id,
                      date: new Date()
                     }
      ]} ).then(() => {
        const newData = pieces.filter((pc) => pc._id !== data?._id);
        setPieces(newData);
        toast.success(
          <Fragment>
            <div className='toastify-header'>
              <div className='title-wrapper'>
                <Avatar size='sm' color='success' icon={<Check size={12} />} />
                <h6 className='toast-title font-weight-bold'>Produit dans le stock!</h6>
              </div>
            </div>
          </Fragment>,
          { transition: Slide, hideProgressBar: true, autoClose: 2000 }
        )
      })
    } catch (error) {
      console.log(error)
    }
  }

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Number(Math.ceil(total / rowsPerPage))
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
    

    if (pieces.length > 0) {
      return pieces
    }  else {
      return allPieces.slice(0, rowsPerPage)
    }
  }



  return (
    <Sidebar
      size='lg'
      open={open}
      title={`Entrée de stock : ${currentStock?.productId?.title} ${currentStock?.productId?.productId}`}
      headerClassName='mb-1'
      contentClassName='pt-0'
      className="width-800"
      toggleSidebar={close}
    >
      <Form  autoComplete="off" role="presentation">
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
        progressPending={dataLoading}
        
      />
       
        <Button type='reset' color='secondary' outline onClick={close}>
          {'Fermer'}
        </Button>
      </Form>
    </Sidebar>
  )
}

export default SidebarBrand
