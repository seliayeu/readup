import { useFormik } from 'formik';
import * as Yup from 'yup';
import authServices from "../../services/authService";

const Register = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      displayName: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Required")
        .email("Email must be valid"),
      displayName: Yup.string(),
      password: Yup.string()
        .required("Required")
    }),
    onSubmit: async values => {
      await authServices.register({ ...values }, () => {})
    }
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
        ) : null }

        <label htmlFor="displayName">Display Name</label>
        <input
          id="displayName"
          name="displayName"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.displayName}
        />
        {formik.touched.displayName && formik.errors.displayName ? (
          <div>{formik.errors.displayName}</div>
        ) : null }

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password&& formik.errors.password ? (
          <div>{formik.errors.password}</div>
        ) : null }

        <button type="submit">Submit</button>
      </form>
    </div>     
  )
}

export default Register 