import { useContext } from "react"
import { AuthContext } from "../../authContext"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Stack, TextField } from "@mui/material";
import authServices from "../../services/authService";
import { Box } from "@mui/system";


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
    <form onSubmit={formik.handleSubmit}>
      <Box sx={{ width: '100%', justifyContent: "center" }}>
        <Stack sx={{ width: "400px", margin: "auto", marginTop: "5%" }} spacing={2}>
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
          <Button variant="contained" type="submit" sx={{height: "50px", marginTop: "0", textTransform: "none", fontWeight: "bold"}}>Login</Button>
        </Stack>
      </Box>     
    </form>
  )
}

export default Login