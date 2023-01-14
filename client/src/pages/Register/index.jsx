import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Stack, TextField } from "@mui/material";
import authServices from "../../services/authService";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Required")
        .email("Email must be valid"),
      password: Yup.string()
        .required("Required")
    }),
    onSubmit: async values => {
      const res = await authServices.register({ ...values }, () => {});
      console.log(res)
      navigate("/login");
    }
  })

  return(
    <form onSubmit={formik.handleSubmit}>
      <Box sx={{ justifyContent: "center", display: "flex", alignItems: "center" }}>
        <Stack sx={{ maxWidth: "400px", width: "90%", margin: "auto", marginTop: "5%" }} spacing={2}>
          <div style={{ display: "flex", alignItems: "row"}}>
            <h1 style={{ cursor: "pointer", marginRight: "5%",  }} onClick={() => {navigate("/login");}}>Login</h1>
            <h1 style={{ color: "#1565c0" }}>Register</h1>
          </div>
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
            value={formik.values.password}
          />
          <Button variant="contained" type="submit" sx={{height: "50px", marginTop: "0", textTransform: "none", fontWeight: "bold"}}>Login</Button>
        </Stack>
      </Box>     
    </form>
  )
}

export default Register 