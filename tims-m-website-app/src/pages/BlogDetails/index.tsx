import React, { useEffect, useState } from "react";
import axios from 'axios'
import { base_url, file_url } from "../../utils/baseUrl"
import { useNavigate, useParams } from "react-router-dom";
import OnlineLoader from "../../components/Loaders/OnlineLoader";
import FullDescription from "../../components/Details/FullDescription";
import { BookOpen, Eye, Heart, MessageCircle, Share, ThumbsUp, Video } from "react-feather";
import { formatDuration } from "../../utils/formatTextWithoutHTMLTag";
import {ReactComponent as HeartIcon} from '../../assets/icons/HeartIcon.svg'
import ReactPlayer from "react-player";
import { isUserLoggedIn, getUserData } from "../../utils/Utils";
import { config } from "../../utils/axiosconfig";
import { toast, Slide } from "react-toastify";
import { updateData } from "../../redux/features/authSlice";
import { useAppDispatch } from "../../redux/hooks";
import ReviewComponent from "../../components/BlogDetails/ReviewsSide";
function Details() {
  const dispatch = useAppDispatch()
  let navigate = useNavigate()
  let {blogId} = useParams()
  let [blog, setBlog] = useState<any>(null)
  let [loading, setLoading] = useState<boolean>(true)
  const [liked, setLiked] = useState<boolean>(false)
  const [views, setViews] = useState<number>(0)
  const [comments, setComments] = useState<number>(0)
  const [likes, setLikes] = useState<number>(0)
  useEffect(() => {
    
    ;(async () => {
      if(blogId) {
        try {
          const [this_blog, update] = await Promise.all(
            [
              await axios.get(`${base_url}blog/id/${blogId}`),
              await axios.put(`${base_url}blog/update-view/${blogId}`)
            ]
          )
            
          if(isUserLoggedIn()) {
            const isLiked: boolean =  getUserData()?.blogList?.filter((w: any) => w?._id === blogId).length ?? false
            setLiked(isLiked)
          }
          setBlog(this_blog.data)
          setViews(this_blog.data?.viewsCount)
          setLikes(this_blog.data?.likes?.length)
          setComments(this_blog.data?.comments?.length)
        } catch (error) {
          // navigate('/')
        }
  
        setLoading(false)
      }
    })()
   
  }, [blogId])


  const onSubmit = async () => {
    if(isUserLoggedIn()) {
    await axios.put(`${base_url}blog/like`, {blogId}, config)
    .then((response): any => {
      dispatch(updateData({data: response.data}))
      if(liked)
      setLikes(likes - 1)
      else {setLikes(likes + 1)}
      setLiked(!liked)
    })

    .catch((error) => {
      let errMessage = "Une erreur s'est produite, merci de réessayer plustard.";
      console.log('Error', error)
      toast.error(
        errMessage,
          { transition: Slide, hideProgressBar: true, autoClose: 2000 }
        )
    })}
    else toast.error(
      'Veuillez vous connecter',
        { transition: Slide, hideProgressBar: true, autoClose: 2000 }
      )
  }
  return <div className="details-page">
    <div className="w-max-width w-full">
      <div className="py-4">
      <p className="details-title"> {blog?.title} </p>

        {loading?<OnlineLoader width={"100%"} height={"384px"} /> :
        <>
        {blog?.isVideo? <div className="w-full shadow-xl rounded-lg h-96">
        <ReactPlayer
              controls
              url={blog?.videoUrl}
              width="100%"
              height="100%"
          />

        </div>:
        <div className="w-full shadow-xl rounded-lg h-96 bg-cover bg-center bg-no-repeat"
        style={{backgroundImage: `url(${file_url}/blogs/${blog?.backgroundImage})`}}
        />
        }
        </>
        }
        <div className="mb-6 mt-3 flex justify-between w-full">
          <div className="flex items-center space-x-3" style={{fontSize: 12, color: "#e73a5e"}}>
            <div className="flex items-center space-x-1" >
              <Eye size={12} />
              <span>{views}</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-yellowColor" />
            <div className="flex items-center space-x-1" >
              <MessageCircle size={12} />
              <span>{comments}</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-yellowColor" />
            <div className="flex items-center space-x-1" >
              <ThumbsUp size={12} />
              <span>{likes}</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-yellowColor" />
            <div className="flex items-center space-x-1" >
            {blog?.isVideo? <Video className="mr-1" size={12} />: <BookOpen className="mr-1" size={12}/>} {blog?.isVideo ? 
            <>{formatDuration(Number(blog?.videoDuration) + Number(blog?.readDuration)*60)}</>: <>{Number(blog?.readDuration)} min</>}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="cursor-pointer" onClick={() => onSubmit()}>
              {liked ? <HeartIcon/>: <Heart color="#e73a5d" size={17} />}
            </div>

            <div className="cursor-pointer" onClick={() => onSubmit()}>
              <Share size={17} color="#e73a5d"/>
            </div>
          </div>
        </div>
        <div className="tab-description">
          <FullDescription loading={loading} description={blog?.description}/>
        </div>

        <hr />

        <ReviewComponent blog={blog} setBlog={(data: any) => setBlog(data)} loading={loading}/>
      </div>
     
    </div>
  </div>;
}

export default Details;
