import { useEffect, useState } from "react";
import FullButton from "../../components/Buttons/FullButton";
import BlogCard from "../../components/BlogCard";
import axios from 'axios'
import { base_url } from "../../utils/baseUrl"
import ProductLoader from "../../components/Loaders/ProductLoader";

function BlogLists() {

  const [_blogs, setBlog] = useState<Array<any>>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    ;(async () => {
      try {
        const [sliders] = await Promise.all([
          await axios.get(`${base_url}blog/published`)
        ])
        setBlog(sliders.data.data)
      } catch (error) {
        console.error(error)
      }

      setLoading(false)

    })()
  }, [])
  return <div className="blog-list">
     <div className="w-max-width w-full">
        <div className="header">
          <div className="title">
            <p>Lisez notre blog</p>
            <span>Consultez nos derniers articles pour obtenir un contenu complet ou des conseils pour faire du shopping.</span>
          </div>
          {_blogs?.length > 3 ?<div className="view-all">
          <FullButton
          background="#E73A5D"
          label={`Decouvrir plus`}
          color="#E73A5D"
          func={() => {}}
          radius = {4}
          outline = {true}
          size = {16}
          weight = {500}
          />
          </div>: <></>}
        </div>
        {loading ? 
      <>
      <div className="blog-list-items mt-16 grid grid-cols-3 space-x-5">
      {[0, 1, 2].map((p: any, index: number) => {
        return <ProductLoader
          width={350}
          height={411}
        />
      })}
      </div>
      </> :
        <div className="blog-list-items mt-16 grid grid-cols-3 space-x-5">
          {_blogs.map((b: any, index: number) => {
            return <BlogCard key={index} {...b} />
          })}
        </div>}
     </div>
  </div>;
}

export default BlogLists;
