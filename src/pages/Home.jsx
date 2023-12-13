import { useEffect ,useState} from "react"
import { Container, PostCard  } from "../components"
import appwriteService from "../appwrite/services"
import {useSelector , useDispatch} from "react-redux"
import {setPosts} from "../store/postsSlice"

function Home() {
  const posts = useSelector(state => state.postsSlice.posts)
  const disptach = useDispatch()
  useEffect(()=>{
    if (posts && posts.length === 0 ) {
      console.log("nulllsdlsf");
      appwriteService.getPosts([])
      .then((posts)=>{
        if (posts) {
          disptach(setPosts(posts.documents))
        }
      })
    }
  })

  if (posts.length === 0) return <div className="py-8">No Posts Avelable</div>
    return (
      <div className="w-full py-8">
        <Container>
        <div className="flex flex-wrap">
          {posts.map((post)=>(
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
        </Container>
      </div>
    )
   
 
 
}

export default Home