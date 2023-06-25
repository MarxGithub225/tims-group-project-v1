import React, { useState } from "react";

function ColorFilter({loading}: any) {
  const [selected, setSelected] = useState('')
  const _colors = [
    '#006FBB',
    '#50B83C',
    '#9C6ADE',
    '#47C1BF',
    '#5C6AC4',
    '#EEC200',
    '#F49342'
  ]
  return <div className="popular-filter p-4">
  <div className="label">Product Color</div>

  <div className="w-full flex flex-wrap items-center mt-2">
      {_colors.map((c: string, index: number) => {
        return <div className="w-10 h-10 rounded-full flex items-center justify-center mr-3" key={index}
        onClick = {() => setSelected(c)}
        style={selected === c ? {border: `1px solid ${c}`}: {}}
        >
                <div className="w-8 h-8 rounded-full"
                style={{background: c}}
                />
        </div>
      })}
  </div>
</div>;
}

export default ColorFilter;
