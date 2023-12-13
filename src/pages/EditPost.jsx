import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import appwriteService from "../appwrite/services"
import { Container, PostForm } from "../components"

function EditPost() {
    const navigate = useNavigate()
    const { slug } = useParams()
    const [post, setPost] = useState(null)

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPost(post)
                }
            })
        }else {
            navigate('/')
        }
    },[navigate , slug])

return post ? (
    <div className="py-8">
        <Container>
            <PostForm post={post} />
        </Container>
    </div> 
): null
}

export default EditPost