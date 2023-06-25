import React, { useEffect, useState } from "react";
import OnlineLoader from "../Loaders/OnlineLoader";

function OptionsSide({loading, colors, setColor, currentColorId,
  openOptions,
  setOpenOption
}: any) {
  const [currentVariables, setVariables] = useState<Array<any>>([])
  useEffect(() => {
    if(colors && currentColorId) {
      const thisVariables : any[] = colors?.filter((col: any) => col?._id === currentColorId)[0]?.variables

      setVariables(thisVariables)
    }
  }, [colors, currentColorId])
  return <div className={(loading || (currentVariables.length && currentVariables[0]?.label) || colors?.filter((col: any) => col.isActivated).length > 1) ? "product-details-options" :'' }>
    {colors?.filter((col: any) => col.isActivated).length > 1 ? <div className="w-full flex items-center space-x-4">
      <div className="colors">
      <div className="label">{loading? <OnlineLoader width="80px" height="12px" /> : <>{ colors?.filter((col: any) => col.isActivated).length > 1 ? 'Couleurs': ''}</>}</div>
        
        {loading? <div className="flex items-center">
        <OnlineLoader width="70px" height="32px" />
        <div className="mx-4"><OnlineLoader width="70px" height="32px" /></div>
        <OnlineLoader width="70px" height="32px" />
        </div> : 
        <>{colors?.filter((col: any) => col.isActivated).length > 1 ? <div className="colors-items">

          {colors?.filter((col: any) => col.isActivated).map((col: any, index: number) => {
            return <div className="color-item mr-1 cursor-pointer"
            onClick={() => setColor(col?._id)}
            style={{backgroundColor: col?.colorName, border: col?._id === currentColorId ? '2px solid #e73a5e': 'none'}}
            />
          })}
        </div> : <></>}</>
        }
      </div>
    </div> : <></>}

    {loading? <div className="flex items-center mt-3">
        <OnlineLoader width="70px" height="32px" />
        <div className="mx-4"><OnlineLoader width="70px" height="32px" /></div>
        <OnlineLoader width="70px" height="32px" />
        </div> : 
        <>{(currentVariables.length && currentVariables[0]?.label)?  <div className={`variables-items ${colors?.filter((col: any) => col.isActivated).length > 1 ? 'mt-3': ''} space-x-1`}>
          {
            currentVariables.map((vari: any, key: number) => {
              return <div className="color-item" key={key} 
              onClick={() => setOpenOption(!openOptions)}
              >
            {vari?.label}
          </div>
            })
          }

        </div>: <></>}</>
        }
  </div>;
}

export default OptionsSide;
