import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Link } from "react-router-dom"

import { signupSchema } from "@/utils"

import { Icon } from "@iconify/react/dist/iconify.js"

import { useFormik } from "formik"

import { useToast } from "@/components/ui/use-toast"
import { AxiosError } from "axios"
import { ResponseSuccess } from "@/interfaces/responseSuccess"
import { useRegister } from "@/hooks"
import { Register } from "@/services/AuthService"

const RegisterPage = () => {
  const { loading, register } = useRegister()
  const { toast } = useToast()

  const { handleSubmit, errors, touched, getFieldProps } = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: ""
    },
    validationSchema: signupSchema,
    onSubmit: (values) => {
      registerFunction(values)
    }
  })
  
  async function registerFunction(values: Register) {
    try {
      await register(values)
    } catch (error) {
      toast({
        title: (error as AxiosError<ResponseSuccess>).response?.data
          .statusMessage
      })
      throw error
    }
  }
  
  return (
    <div className="flex my-auto">
      <form
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="flex flex-col gap-5 items-center justify-center px-4 py-4 mx-auto">
          <a
            href="#"
            className="flex flex-row gap-1 items-center justify-center text-2xl font-semibold"
          >
            <img
              className="w-8 h-8"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
              alt="logo"
            />
            <p>TechLibrary</p>
          </a>

          <div className="w-full sm:w-96 bg-main/20 rounded-lg shadow p-6 sm:p-8 flex flex-col gap-3">
            <div className="flex flex-col gap-4 md:gap-6">
              <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create your account
              </h1>
              <div className="flex flex-col gap-4 md:gap-6">
                <div className="flex flex-col gap-2">
                  <Label>Username</Label>
                  <Input
                    type="text"
                    placeholder="Sani"
                    {...getFieldProps("username")}
                    // name="username"
                    // onChange={handleChange}
                    // onBlur={handleBlur}
                    // value={values.username}
                  />
                  {touched.username && errors.username && (
                    <small className="font-bold text-[#ff4444]">
                      {errors.username}
                    </small>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    placeholder="example@gmail.com"
                    {...getFieldProps("email")}
                    // onChange={handleChange}
                    // onBlur={handleBlur}
                    // value={values.email}
                  />
                  {touched.email && errors.email && (
                    <small className="font-bold text-[#ff4444]">
                      {errors.email}
                    </small>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <Label>Password</Label>
                  <Input
                    type="password"
                    placeholder="•••••••••••••••"
                    {...getFieldProps("password")}
                    // onChange={handleChange}
                    // onBlur={handleBlur}
                    // value={values.password}
                  />
                  {touched.password && errors.password && (
                    <small className="font-bold text-[#ff4444]">
                      {errors.password}
                    </small>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <Button
                    variant="authButton"
                    className="w-full rounded-lg"
                  >
                    Sign up
                  </Button>
                  <button className="px-5 py-2.5 border flex justify-center items-center gap-2 border-main/40 hover:bg-main/20 transition-colors duration-150 rounded-lg w-full ">
                    <Icon
                      className="h-6 w-6"
                      icon="logos:google-icon"
                    />
                    <span className="text-sm">Continue with Google</span>
                  </button>
                  <button className="px-5 py-2.5 border flex justify-center gap-2 border-main/40 hover:bg-main/20 transition-colors duration-150 rounded-lg w-full ">
                    <Icon
                      className="h-6 w-6"
                      icon="bi:github"
                    />
                    <span className="text-sm">Continue with Github</span>
                  </button>
                </div>

                <p className="text-sm font-light text-center">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-semibold text-main hover:underline"
                  >
                    Log in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default RegisterPage
