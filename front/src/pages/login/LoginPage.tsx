import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "react-router-dom"
import { Icon } from "@iconify/react"
import { useFormik } from "formik"
import { loginSchema } from "@/utils"
import { Login } from "@/services/AuthService"
import { useToast } from "@/components/ui/use-toast"
// import { useTokenStore } from "@/stores/user.store"
import useLogin from "@/hooks/useLogin"

const LoginPage = () => {
  // const setToken = useTokenStore((state) => state.setToken)
  const { loading, login } = useLogin()
  const { toast } = useToast()
  // const { values, handleBlur, handleChange, handleSubmit, errors, touched } = useFormik({
  const { handleSubmit, errors, touched, getFieldProps } = useFormik({
    initialValues: {
      username: "",
      password: ""
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {      
      loginFunction(values)
    }
  })
  
  async function loginFunction(values: Login) {
    try {
      await login(values)
    } catch (error) {
      toast({
        title: "Any of the fields are incorrect"
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
                Login to your account
              </h1>
              <div className="flex flex-col gap-4 md:gap-6">
                <div className="flex flex-col gap-2">
                  <Label>username</Label>
                  <Input
                    type="Username"
                    placeholder="username"
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
                  <Label>Password</Label>
                  <Input
                    type="password"
                    placeholder="•••••••••••••••"
                    {...getFieldProps("password")}
                    // name="password"
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
                    type="submit"
                  >
                    Login
                  </Button>
                  <button
                    className="px-5 py-2.5 border flex justify-center items-center gap-2 border-main/40 hover:bg-main/20 transition-colors duration-150 rounded-lg w-full "
                    type="button"
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
                  >
                    <Icon
                      className="h-6 w-6"
                      icon="bi:github"
                    />
                    <span className="text-sm">Continue with Github</span>
                  </button>
                </div>

                <p className="text-sm font-light text-center">
                  Don’t have an account yet?{" "}
                  <Link
                    to="/signup"
                    className="font-semibold text-main hover:underline"
                  >
                    Sign up
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

export default LoginPage
