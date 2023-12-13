import { useState } from "react"
import { login as authLogin } from "../store/authSlice"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { Button, Logo, Input } from "./index"
import authService from "../appwrite/auth"

function Signup() {
  const [error, setError] = useState("")
  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const create = async (data) => {
    setError("")
    try {
      const userData = await authService.CreateAcount(data)
      if (userData) {
        const session = authService.GetCurrentUser()
        if (session) dispatch(authLogin(userData))
        navigate('/')
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex items-center justify-center w-full">
      <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-lg p-10 border border-black/10">
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sing in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to={'/login'}
            className=" font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && (<p className=" text-red-600 text-center mt-8">{error}</p>)}
        <form onSubmit={handleSubmit(create)} className="mt-8">
          <div className="space-y-5">
            <Input
              lable="Full Name"
              placeholder="Enter Your Full Email"
              type="name"
              {...register("name", {
                required: true,
              })}
            />
            <Input
              lable="Email"
              placeholder="Enter Your Email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchParten: (value) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) || "Email must be valid Email address"
                }
              })}
            />
            <Input
              lable="Password"
              placeholder="password"
              type="password"
              {...register("password", {
                required: true,
              })}
            />
            <Button
              type="submit"
              className=" w-full"
            >Sign In</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup