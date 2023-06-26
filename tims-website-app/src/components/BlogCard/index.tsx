import React from "react";
import { file_url } from "../../utils/baseUrl";
import {formatDuration, removeUnnecessaryHTMLStuff} from '../../utils/formatTextWithoutHTMLTag'
import moment from "moment";
import { BookOpen, Video } from "react-feather";
import { useNavigate } from "react-router-dom";
interface BlogCardProps {
  title: string
  createdAt: string
  description: string
  backgroundImage: string
  videoDuration: number
  readDuration: number
  isVideo: boolean
  _id: string
}
function BlogCard({title, createdAt, description, backgroundImage, videoDuration, readDuration, isVideo, _id}: BlogCardProps) {
  const navigate = useNavigate()
  return <div className="blog-card cursor-pointer shadow-xl p-2" onClick={() => {navigate(`/blog/${_id}`)}} >
    <div className="relative blog-card-image bg-cover bg-center bg-no-repeat"  style={{backgroundImage: `url(${file_url}/blogs/${backgroundImage})`}}>
    <div className="absolute bottom-2 right-2 px-3 py-1 rounded-full text-white text-bold flex items-center" 
    style={{backgroundColor: 'rgba(244, 166, 9, .5)', fontSize: 13}} >
     {isVideo? <Video className="mr-1" size={12} />: <BookOpen className="mr-1" size={12}/>} {isVideo ? 
     <>{formatDuration(Number(videoDuration) + Number(readDuration)*60)}</>: <>{Number(readDuration)} min</>}
    </div>
    </div>
    <div className="blog-card-infos">
      <div className="date">
        {moment(createdAt).format("DD MMM YYYY")}
      </div>

      <div className="title tims-txt-2">
      {title}
      </div>

      <div className="description tims-txt-3">
      {removeUnnecessaryHTMLStuff(description)}
      </div>
    </div>
  </div>;
}

export default BlogCard;
