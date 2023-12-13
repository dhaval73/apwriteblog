import { useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import { Input, RTE, Button, Select } from "../index"
import { useNavigate } from "react-router-dom"
import { useCallback, useEffect } from "react"
import appwriteService from '../../appwrite/services.js'
function PostForm({ post }) {
  const navigate = useNavigate()
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      status: post?.status || 'active',
    }
  })
  const userData = useSelector(state => state.auth.userData)

  const submit = async (data) => {
    if (post) {
      const file = await data.image[0] ? appwriteService.uploadFile(data.image[0]) : null
      if (file) {
        appwriteService.deleteFile(post.fetureImage)
      }
      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        fetureImage: file ? file.$id : undefined,
        userID: userData.$id
      })
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`)
      }
    } else {
      // console.log(userData.$id);
      // console.log(data.image[0]);
      const file = await appwriteService.uploadFile(data.image[0]) 
      console.log(file);
      console.log(file.$id);
      const dbPost = await appwriteService.createPost({
        ...data,
        fetureImage: file != null ? file.$id : undefined,
        userID: userData.$id
      })
      
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`)
      }

    }


  }

  const slugTransform = useCallback((value) => {
    console.log(value , typeof value);
    if (value  && typeof value == "string") {
      return  value.trim()
      .toLowerCase()
      .replace(/[^a-zA-Z\d]+/g, "-")
      .replace(/\s/g, "-");

    }else{
      return ""
    }
  }, [])

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name == "title") {
        console.log(slugTransform(value.title));
        setValue('slug', slugTransform(value.title), { shouldValidate: true })
      }
    })
    return () => {
      subscription.unsubscribe()
    }
  }, [watch, setValue, slugTransform])

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")} />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.fetureImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  )
}

export default PostForm