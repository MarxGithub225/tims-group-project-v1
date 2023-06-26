import React, { useEffect, useState } from "react";
import axios from 'axios'
import { base_url, file_url } from "../../utils/baseUrl"
import { Link } from "react-router-dom";
function PartnerLists() {

  const [_brands, setBrands] = useState<Array<any>>([])

  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    ;(async () => {
      try {
        const [sliders] = await Promise.all([
          await axios.get(`${base_url}brand?page=1&$limit=15`)
        ])
        setBrands(sliders.data.data.filter((bd: any) => !bd?.isBlocked && bd?.isPartner))
      } catch (error) {
        console.error(error)
      }

      setLoading(false)

    })()
  }, [])
  return <div className="partner-list">
    <div className="w-max-width w-full">
        <div className="partner-list-content w-full grid grid-cols-8 gap-x-6">
            {_brands.map((b: any, index: number) => {
              return <Link to={''} > <img key={index} src={`${file_url}/brands/${b?.image}`} alt={b?.name} /></Link>
            })}
        </div>
    </div>
  </div>;
}

export default PartnerLists;
