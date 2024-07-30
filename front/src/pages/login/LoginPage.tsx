import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "react-router-dom"
import { Icon } from "@iconify/react"
import { useFormik } from "formik"
import { loginSchema } from "@/utils"
import { Login } from "@/services/AuthService"
import useLogin from "@/hooks/useLogin"
import { useState } from "react"
import cofeeLogo from "../../assets/images/cofeeLogo2.svg"

const LoginPage = () => {
  const { loading, login } = useLogin()
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const { handleSubmit, errors, touched, getFieldProps } = useFormik({
    initialValues: {
      username: "",
      password: ""
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      loginFunction(values);
    },
  })

  async function loginFunction(values: Login) {
    try {
      await login(values);
    } catch (error: any) {
      setLoginError(error.message);
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

  return (
    <div className="flex my-auto">
      <form
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="flex flex-col gap-5 items-center justify-center px-4 py-4 mx-auto">
          <div
            className="flex flex-row gap-3 items-center justify-center text-2xl font-semibold"
          >
            <img
              className="w-12 h-12"
              src={cofeeLogo}
              alt="Techlibrary logo"
            />
            
            <p className="leading-none mt-2" translate="no">TechLibrary</p>
          </div>

          <div className="w-full sm:w-96 bg-main/20 rounded-lg shadow p-6 sm:p-8 flex flex-col gap-3">
            <div className="flex flex-col gap-4 md:gap-6">
              <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Ingrese a su cuenta
              </h1>

              <div className="flex flex-col gap-4 md:gap-6">
                
                <div className="flex flex-col gap-2">
                  <Label>Nombre de usuario</Label>
                  
                  <Input
                    className="bg-light"
                    type="Username"
                    placeholder="randomuser"
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
                  <Label>Contraseña</Label>

                  <div className="relative">
                    <Input
                      className="bg-light"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="•••••••••••••"
                      {...getFieldProps('password')}
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

                {loginError && (
                  <small className="font-bold text-center text-[#ff4444]">{loginError}</small>
                )}

                <div className="flex flex-col gap-5">
                  <Button
                    variant="authButton"
                    className="w-full rounded-lg"
                    type="submit"
                    id="login"
                    aria-label="login"
                    role="button"
                    disabled={loading}
                  >
                    {loading ? "Cargando..." : "Iniciar sesión"}
                  </Button>

                  <div
                    className="flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-main after:mt-0.5 after:flex-1 after:border-t after:border-main dark:before:border-light dark:after:border-light">
                    <p className="mx-4 mb-0 text-center dark:text-white">o</p>
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
                      <span className="text-sm">Continuar con Google</span>
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
                      <span className="text-sm">Continuar con Github</span>
                    </button>
                  </div>
                </div>

                <p className="text-sm font-light text-center">
                  ¿No tienes una cuenta?{" "}
                  <Link
                    to="/signup"
                    className="font-semibold text-main hover:underline"
                  >
                    Registrarse
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
