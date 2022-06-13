import { useContext } from "react"
import { AuthContext } from "../../authContext"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import authServices from "../../services/authService";


const Login = () => {
  const auth = useContext(AuthContext)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Required")
        .email(),
      password: Yup.string()
        .required("Required")
    }),
    onSubmit: async values => {
      await authServices.login({ ...values }, (credentials, data) => {
        localStorage.setItem("email", credentials.email)
        localStorage.setItem("token", data.token)
        localStorage.setItem("id", data.id)
        
        console.log(localStorage.getItem("email"))
        console.log(localStorage.getItem("token"))
        console.log(localStorage.getItem("id"))

        auth.login(credentials.email, () => {})
      })
    },
  })

  return(
    <div>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="email">Email</label>
        <input 
          id="email"
          name="email"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <div>{formik.errors.email}</div>
        ) : null}

        <label htmlFor="password">Password</label>
        <input 
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.passwrod}
        />
        {formik.touched.password && formik.errors.password ? (
          <div>{formik.errors.password}</div>
        ) : null}

        <button type="submit">Submit</button>
      </form>
 
    </div>     

  )
}

export default Login