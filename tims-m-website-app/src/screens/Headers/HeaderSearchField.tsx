import React, { useEffect, useState } from "react";
import DropDownSwitch from "../../components/DropDownSwitch";

import axios from 'axios'
import { base_url } from "../../utils/baseUrl"
import OnlineLoader from "../../components/Loaders/OnlineLoader";
const CategorieList = ({sort,setSort }: any) => {
  

  const [_categories, setCategories] = useState<Array<any>>([
    {label: 'Toutes les catégories', value: 'all'}
  ])

  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    ;(async () => {
      try {
        const [categories] = await Promise.all([
          await axios.get(`${base_url}category?page=1&$limit=50`)
        ])
        const newCategories = [..._categories];
        await Promise.all(
          categories.data.data.map((cat: any) => {
            newCategories.push({label: cat?.name, value: cat?._id})
          })
        )
        setCategories(newCategories)
      } catch (error) {
        console.error(error)
      }

      setLoading(false)

    })()
  }, [])
  return <div className="hidden laptop:flex items-center justify-between pl-2">

    {loading ? <OnlineLoader width={200} height={15} />
    :
    <>
    <div className="list">
        <DropDownSwitch
        defaultData={_categories}
        selected={sort}
        onChange={setSort}/>
    </div>
    <div className="arrow"/>
    </>
    }
    
  </div>
}
function HeaderSearchField({
  setSearch,
setCategoryId,
categoryId,
onKeyEnter=() =>{},
q
}: any) {

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      onKeyEnter()
    }
  }

  return <div className="header-search-field">
    <input placeholder="Rechercher quelque chose ici…" type="text" 
    onChange={(e: any) => setSearch(e.target.value)}
    value={q}
    onKeyDown={handleKeyDown}
    />
    <CategorieList
    sort={categoryId}
    setSort={(value: string) => {if(value!=='all')setCategoryId(value)}}
    />
  </div>;
}

export default HeaderSearchField;
