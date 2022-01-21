/* eslint-disable */
import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { connect,useDispatch } from 'react-redux'
// material
import {
  Button,
  Alert,
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { addLogin } from '../../../store/actions/loginAction'

function doLogin(args,token) {
  const baseUrl = process.env.REACT_APP_GATEWAY_URL;
  const url = new URL(`${baseUrl}/api/v1/member/employee/login`);
  
  const request = fetch(url, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(args)
  }).then(res => res.json())
  .catch(err => console.log(err));
  return request;
}

function generateToken() {
  const accessKey = process.env.REACT_APP_ACCESS_KEY;
  const secretKey = process.env.REACT_APP_SECRET_KEY;
  const baseUrl = process.env.REACT_APP_GATEWAY_URL;
  const url = new URL(`${baseUrl}/api/v1/auth/credential/generate-token`);
  const token = Buffer.from(`${accessKey}:${secretKey}`).toString('base64');
  const request = fetch(url, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
    }
  }).then(res => res.json())
  .catch(err => console.log(err));
  return request;
}

// ----------------------------------------------------------------------

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [message, setMessage] = useState('');
  const [loginLabel, setLoginLabel] = useState('Login');

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const actionLogin = () => {
   
    const payloads = {
      Email: email,
      Password: password,
    };
    const login = generateToken().then((auth) => {
      if (auth.Status !== 200) {
        const newErrorMessage = "invalid credentials";
        setMessage(newErrorMessage);
        throw new Error(newErrorMessage);
      }
      return auth;
    }).then((auth) => {
      doLogin(payloads,auth.Data.Token).then((data) => {
        if (data.Status === 200) {
          console.log(data);
          dispatch(addLogin(data.Data));
          setMessage("");
          navigate('/dashboard', { replace: true });
        }else{
          setMessage(data.Message);
        }
      });
    }).catch((e) => {
      console.log(e);
    });
    
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      navigate('/dashboard', { replace: true });
    }
  });

  const { errors, touched, values, isSubmitting, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoginLabel("Logging in");
    setIsButtonDisabled(true);
    actionLogin();
    setLoginLabel("Login");
    setIsButtonDisabled(false);
  }

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate={false} onSubmit={handleSubmit}>
        {message !== "" && (<Alert severity="error">{message}</Alert>)}
        <br />
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            value={email}
            onChange={(event) => {
              setEmail(event.target.value)
            }}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            value={password}
            onChange={(event) => {
              setPassword(event.target.value)
            }}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label="Remember me"
          />

          <Link component={RouterLink} variant="subtitle2" to="#">
            Forgot password?
          </Link>
        </Stack>

        <Button
          disabled={isButtonDisabled}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          {loginLabel}
        </Button>
      </Form>
    </FormikProvider>
  );
}
