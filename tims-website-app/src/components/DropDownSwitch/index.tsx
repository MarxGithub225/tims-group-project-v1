import React, {useEffect, useRef, useState} from 'react'
import {ReactComponent as ArrowIcon} from '../../assets/icons/ArrowIcon.svg'

import useOnClickOutSide from '../../utils/onClickOutSide'


interface DropDownSwitchInterface {
  selected: any
  onChange: Function
  defaultData: Array<any>
}

interface IconInterface {
  opened: boolean
}


function DropDownSwitch({defaultData, selected, onChange}: DropDownSwitchInterface) {

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
      <div className={`${!opened ? 'transition-all ease-in-out duration-300' : 'shadow transition-all ease-in-out duration-700'} w-full overflow-hidden cursor-pointer transition ease-in-out delay-150`}
           style={{
             position: !opened ? 'relative': 'absolute',
             background: !opened ? 'transparent': '#fff',
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
                {(key === 0 && !opened)&& <div className={``}>
                  <div style={{transform : 'rotate(180deg)'}}>
                    <ArrowIcon/>
                  </div>
                  <ArrowIcon/>
                </div>}
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default DropDownSwitch
