import React, {useEffect, useRef, useState} from 'react'
import { ChevronDown, ChevronUp } from 'react-feather'
import useOnClickOutSide from '../../utils/onClickOutSide'


interface CustomSelectInterface {
  selected: any
  onChange: Function
  defaultData: Array<any>
}

interface IconInterface {
  opened: boolean
}

const UpAndDownIcon = ({opened}: IconInterface) => opened ? <ChevronUp/> : <ChevronDown/>

function CustomSelect({defaultData, selected, onChange}: CustomSelectInterface) {

  const [opened, setOpened] = useState<boolean>(false);
  const [data, setData] = useState<Array<any>>([defaultData[0]]);

  const ref = useRef(null)

  useEffect(() => {
    if (!opened) {
      setData(defaultData.filter((item: any) => item.value === selected))
    } else {
      setData(defaultData)
    }
  }, [opened])

  useOnClickOutSide(ref, () => setOpened(false))

  return (
    <div className="relative"
         ref={ref}
         style={{
          width: 200,
        }}
    >
      <div className={`${!opened ? 'transition-all ease-in-out duration-300' : 'shadow transition-all ease-in-out duration-700'} w-full rounded-lg overflow-hidden cursor-pointer transition ease-in-out delay-150`}
           style={{
             position: !opened ? 'relative': 'absolute',
             background: 'transparent',
             zIndex: 1000
           }}
      >
        {
          data.map((item: any, key: number) => {
            return (
              <div className="flex w-full px-1 items-center"
                   style={{
                     color: '#161D25', 
                     fontSize: 16,
                     padding: opened ?'5px 0' : 0,
                     borderBottom: key !== data.length - 1 ? '0.5px solid #637381' : '',
                     background: opened ? '#FFFFFF': 'transparent'
                   }}
                   key={key}
                   onClick={() => {
                     if (opened) {
                       onChange(item.value);
                       setOpened(false)
                     } else {
                       setOpened(true)
                     }
                   }}
              >
                <span className="w-full flex items-center">{item.label}</span>
                <span className={`flex justify-end items-center`}>
                  {key === 0 && <UpAndDownIcon opened={opened}/>}
                </span>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default CustomSelect
