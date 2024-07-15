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
import { useEffect, useState } from "react"

const RegisterPage = () => {
  const { loading, register } = useRegister()
  const { toast } = useToast()
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordMatchMessage, setPasswordMatchMessage] = useState("")

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  const { handleSubmit, errors, touched, getFieldProps, values } = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signupSchema,
    onSubmit: (values) => {
      registerFunction(values);
    },
  });

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

  function loginGoogle() {
    window.open(`${import.meta.env.VITE_API_URL}/login/google`, "_self")
  }
  
  function loginGithub() {
    window.open(
      `${import.meta.env.VITE_API_URL}/login/github`,
      "_self"
    )
  }

  useEffect(() => {
    let debounceTimer = setTimeout(() => {
      if (values.password && values.confirmPassword) {
        if (values.password === values.confirmPassword) {
          setPasswordMatchMessage("Passwords match");
          
          setTimeout(() => {
            setPasswordMatchMessage("");
          }, 3000);
        } else {
          setPasswordMatchMessage("Passwords must match");
        }
      } else {
        setPasswordMatchMessage("");
      }
    }, 500);
  
    return () => clearTimeout(debounceTimer);
  }, [values.password, values.confirmPassword]);

  // useEffect(() => {
  //   let debounceTimer = setTimeout(() => {
  //     if (values.password && values.confirmPassword) {
  //       if (values.password === values.confirmPassword) {
  //         setPasswordMatchMessage("Passwords match");
  //       } else {
  //         setPasswordMatchMessage("Passwords must match");
  //       }
  //     } else {
  //       setPasswordMatchMessage("");
  //     }
  //   }, 500);
  
  //   return () => clearTimeout(debounceTimer);
  // }, [values.password, values.confirmPassword]);

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
                    disabled={loading}
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
                    disabled={loading}
                  />

                  {touched.email && errors.email && (
                    <small className="font-bold text-[#ff4444]">
                      {errors.email}
                    </small>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <Label>Password</Label>
                  
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="•••••••••••••••"
                      {...getFieldProps("password")}
                      disabled={loading}
                    />

                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={togglePasswordVisibility}
                    >
                      <Icon
                        className={`h-5 w-5 text-main transition-opacity duration-200 ${showPassword ? 'opacity-100' : 'opacity-0'}`}
                        icon='ph:eye-bold'
                      />
                      <Icon
                        className={`h-5 w-5 text-main transition-opacity duration-200 absolute ${showPassword ? 'opacity-0' : 'opacity-100'}`}
                        icon='ph:eye-closed-bold'
                      />
                    </button>
                  </div>

                  {touched.password && errors.password && (
                    <small className="font-bold text-[#ff4444]">
                      {errors.password}
                    </small>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <Label>Confirm Password</Label>

                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="•••••••••••••••"
                      {...getFieldProps("confirmPassword")}
                      disabled={loading}
                    />
                    
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={toggleConfirmPasswordVisibility}
                    >
                      <Icon
                        className={`h-5 w-5 text-main transition-opacity duration-200 ${
                          showConfirmPassword ? "opacity-100" : "opacity-0"
                        }`}
                        icon="ph:eye-bold"
                      />
                      <Icon
                        className={`h-5 w-5 text-main transition-opacity duration-200 absolute ${
                          showConfirmPassword ? "opacity-0" : "opacity-100"
                        }`}
                        icon="ph:eye-closed-bold"
                      />
                    </button>
                  </div>

                  {touched.confirmPassword && errors.confirmPassword && (
                    <small className="font-bold text-[#ff4444]">
                      {errors.confirmPassword}
                    </small>
                  )}     
                  
                  {passwordMatchMessage && (
                    <small className={`font-bold ${passwordMatchMessage === "Passwords match" ? "text-[#40944A]" : "text-[#ff4444]"}`}>
                      {passwordMatchMessage}
                    </small>
                  )}
                </div>

                <div className="flex flex-col gap-5">
                  <Button
                    variant="authButton"
                    className="w-full rounded-lg"
                    disabled={loading}
                  >
                    Sign up
                  </Button>

                  <div
                    className="flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-main after:mt-0.5 after:flex-1 after:border-t after:border-main dark:before:border-light dark:after:border-light">
                    <p className="mx-4 mb-0 text-center dark:text-white">or</p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button
                      className="px-5 py-2.5 border flex justify-center items-center gap-2 border-main/40 hover:bg-main/20 transition-colors duration-150 rounded-lg w-full "
                      type="button"
                      onClick={loginGoogle}
                    >
                      <Icon
                        className="h-6 w-6"
                        icon="logos:google-icon"
                      />
                      <span className="text-sm">Continue with Google</span>
                    </button>

                    <button
                      className="px-5 py-2.5 border flex justify-center gap-2 border-main/40 hover:bg-main/20 transition-colors duration-150 rounded-lg w-full "
                      type="button"
                      onClick={loginGithub}
                    >
                      <Icon
                        className="h-6 w-6"
                        icon="bi:github"
                      />
                      <span className="text-sm">Continue with Github</span>
                    </button>
                  </div>
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
