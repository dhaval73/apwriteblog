import { Link } from "react-router-dom";
import appwriteService from "../appwrite/services.js"
function PostCard({ $id, title, fetureImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full text-black bg-gray-100 rounded-xl p-4">
        <div className="w-full text-black justify-center mb-4">
          <img src={appwriteService.getFilePreview(fetureImage)} alt={fetureImage} className='rounded-xl' />
        </div>
        <h2
          className=' text-xl font-bold text-black'>
          {title}
        </h2>
      </div>
    </Link>
  )
}

export default PostCard