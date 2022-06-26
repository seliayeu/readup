import { useContext } from "react"
import { AuthContext } from "../../authContext"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, TextField } from "@mui/material";
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
        <TextField
          label="Email"
          id="outlined-basic"
          name="email"
          type="text"
          error={formik.touched.email ? formik.errors.email !== undefined : false}
          helperText={formik.touched.email ? formik.errors.email : ""}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        <TextField
          label="Password"
          id="outlined-adornment-password"
          name="password"
          type="password"
          error={formik.touched.password ? formik.errors.password !== undefined : false}
          helperText={formik.touched.password ? formik.errors.password : ""}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.passwrod}
        />
        <Button variant="contained" type="submit">Submit</Button>
      </form>
 
    </div>     

  )
}

export default Login