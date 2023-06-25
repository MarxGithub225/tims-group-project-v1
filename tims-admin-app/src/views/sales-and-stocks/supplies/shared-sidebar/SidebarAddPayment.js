// ** React Imports
import { useEffect, useState } from 'react'

// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import { Form, FormGroup, Input, Label, Button } from 'reactstrap'

// ** Custom Components
import Sidebar from '@components/sidebar'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/base/pages/app-invoice.scss'
import { Check, MinusCircle, PlusCircle } from 'react-feather'

const SidebarAddPayment = ({ open, toggleSidebar, details, data, setData, setDetails }) => {
  // ** States
  const [selected, setSelected] = useState([])

  const removeVariable =  (serial) => {
    const varItem = selected.indexOf(serial)
    const list = [...selected];
    list.splice(varItem, 1);

    setSelected (list);
  }

  useEffect(() => {
    if(details?.variableSelected) {
      setSelected(details?.variableSelected)
    }
  }, [details])
  return (
    <Sidebar
      size='lg'
      open={open}
      title='Selectionner les produits'
      headerClassName='mb-1'
      contentClassName='p-0'
      toggleSidebar={toggleSidebar}
    >
      <Form>
        <p>Nombre restant ({details ? (details.quantityOrdered - selected.length) : ''})</p>
          <table style={{width: '100%'}}> 
            <thead>
              <th style={{width: '40%'}}>Product ID</th>
              <th style={{width: '40%'}}>Numéro de série</th>
              <th style={{width: '10%'}}/>
            </thead>

            <tbody>

            {details &&
            details?.variables?.filter((item) => item.visible)[0]?.
            items?.filter((item) => !item.bougth)?.map((vari, index) => {
            return <tr key={index}
            >
            
            <td style={{padding: '10px 2px', position: 'relative', pointerEvents : 'none'}} >

              <Input
                
                name='productId'
                id='productId'
                placeholder=''
                value={vari.productId}
                onChange={(e) => handleInputChange(e, index)}
              />
            </td>
            <td style={{padding: '10px 2px', position: 'relative', pointerEvents : 'none'}} >
              <Input
                name='serial'
                id='serial'
                placeholder=''
                value={vari.serial}
              />
            </td>

            
            <td className='d-flex justify-content-center align-items-center' style={{
              height: 58
            }}>

            {!selected.includes(vari.serial) && (details && (selected.length <  details.quantityOrdered)) ? <PlusCircle  size={25}
              onClick={() => {
                setSelected([...selected, vari.serial])
              }}
              style = {{
                cursor: 'pointer'
              }}
              /> : !selected.includes(vari.serial) && (details && (selected.length ==  details.quantityOrdered)) ? <></> :  <MinusCircle  size={25}
              onClick={() => {
                removeVariable(vari.serial)
              }}
              style = {{
                cursor: 'pointer'
              }}
              />}
            {details && (selected.length <  details.quantityOrdered) ? <>
              
            </>: <></>}
            </td>
          </tr>
          })}
              
            </tbody>
          </table>
          <FormGroup className='d-flex flex-wrap mb-0'>
            <Button className='mr-1' color='primary' onClick={() => {
              data?.data?.products?.forEach((pdt) => {
                if(pdt?.id === details?._id)
                pdt.variableSelected = selected
              })
              setData(data)
              toggleSidebar()
              setDetails(null)
              setSelected([])

            }}>
              Valider
            </Button>
            <Button color='secondary' outline onClick={toggleSidebar}>
              Quitter
            </Button>
          </FormGroup>
      </Form>
    </Sidebar>
  )
}

export default SidebarAddPayment
