import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Link } from "react-router-dom"

import { signupSchema } from "@/utils"

import { Icon } from "@iconify/react/dist/iconify.js"

import { useFormik } from "formik"

import { AxiosError } from "axios"
import { ResponseSuccess } from "@/interfaces/responseSuccess"
import { useRegister } from "@/hooks"
import { Register } from "@/services/AuthService"
import { useEffect, useMemo, useState } from "react"
import axiosInstance from "@/api/axiosInstance"

const RegisterPage = () => {
  const { loading, register } = useRegister()
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordMatchMessage, setPasswordMatchMessage] = useState("")
  const [usernameError, setUsernameError] = useState("")
  const [emailError, setEmailError] = useState("")

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  const { handleSubmit, errors, touched, getFieldProps, values, handleChange, handleBlur } = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      const usernameExists = await checkUsername(values.username);
      const emailExists = await checkEmail(values.email);

      if (usernameExists || emailExists) {
        if (usernameExists) setUsernameError("Username already exists");
        if (emailExists) setEmailError("Email already exists");
      } else {
        setUsernameError("");
        setEmailError("");
        await registerFunction(values);
      }
    },
  });

  async function checkUsername(username: string) {
    try {
      const response = await axiosInstance.get(`/user/checkuser/${username}`)
      return response.data.data
    } catch (error) {
      return false
    }
  }

  async function checkEmail(email: string) {
    try {
      const response = await axiosInstance.get(`/user/checkemail/${email}`)
      return response.data.data
    } catch (error) {
      return false
    }
  }

  async function registerFunction(values: Register) {
    try {
      await register(values)
    } catch (error) {
      console.error("Registration failed:", (error as AxiosError<ResponseSuccess>).response?.data.statusMessage);
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
    const debounceTimer = setTimeout(() => {
      if (values.password && values.confirmPassword) {
        setPasswordMatchMessage(
          values.password === values.confirmPassword ? "Passwords match" : "Passwords must match"
        );
      } else {
        setPasswordMatchMessage("");
      }
    }, 250);

    return () => clearTimeout(debounceTimer);
  }, [values.password, values.confirmPassword]);

  const passwordMatchClass = useMemo(() => 
    passwordMatchMessage === "Passwords match" ? "text-[#40944A]" : "text-[#ff4444]"
  , [passwordMatchMessage]);

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
                  <div className="flex flex-row gap-2 items-end">
                    <Label>Username</Label>
                    {usernameError && (
                      <div className="flex flex-row gap-2 items-end">
                        <span className="leading-none">|</span>
                        <small className="font-bold text-[#ff4444] leading-none">
                          {usernameError}
                        </small>
                      </div>
                    )}
                  </div>

                  <Input
                    type="text"
                    name="username"
                    placeholder="Sani"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.username}
                    disabled={loading}
                  />

                  {touched.username && errors.username && (
                    <small className="font-bold text-[#ff4444]">
                      {errors.username}
                    </small>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex flex-row gap-2 items-end">
                    <Label>Email</Label>
                    {emailError && (
                      <div className="flex flex-row gap-2 items-end">
                        <span className="leading-none">|</span>
                        <small className="font-bold text-[#ff4444] leading-none">
                          {emailError}
                        </small>
                      </div>
                    )}
                  </div>

                  <Input
                    type="email"
                    name="email"
                    placeholder="example@gmail.com"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
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
                    <small className={`font-bold ${passwordMatchClass}`}>
                      {passwordMatchMessage}
                    </small>
                  )}
                </div>

                <div className="flex flex-col gap-5">
                  <Button
                    variant="authButton"
                    className="w-full rounded-lg"
                    type="submit"
                    id="register"
                    aria-label="Register"
                    role="button"
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