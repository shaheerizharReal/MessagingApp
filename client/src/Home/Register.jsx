import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import { Formik } from 'formik';
import * as Yup from 'yup';

import history from '../Utilities/history';
import { useRegister } from '../Services/authenticationService';

const useStyles = makeStyles(theme => ({
    paper: {
        margin: theme.spacing(15,90),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: 'HotPink',
        width:'20px',
        marginLeft:'170px'

    },
    signin: {
        color: 'HotPink'
    },
    textField: {
        width: '100%',
        height: '5px',
        paddingTop: '5px',
        padding: '22px 20px',
        border: '2px solid #ccc',
    }
}));

const Register = props => {
    const register = useRegister();

    const classes = useStyles();

    return (
        <div className={classes.paper}>
            <Grid container>
                <Grid item>
                    <Typography component="h1" variant="h5" align="center">
                        Sign Up
                    </Typography>
                    <Formik
                        initialValues={{
                            name: '',
                            username: '',
                            password: '',
                            password2: '',
                        }}
                        validationSchema={Yup.object().shape({
                            name: Yup.string()
                                .required('Name is required')
                                .max(40, 'Too Long!'),
                            username: Yup.string()
                                .required('Username is required')
                                .max(40, 'Username address too long'),
                            password: Yup.string()
                                .required('Password is Required')
                                .max(100, 'Password too long')
                                .min(
                                    6,
                                    'Password should be at least 6 characters long'
                                ),
                            password2: Yup.string().oneOf(
                                [Yup.ref('password'), null],
                                'Passwords do not match'
                            ),
                        })}
                        onSubmit={(
                            { name, username, password, password2 },
                            { setStatus, setSubmitting }
                        ) => {
                            setStatus();
                            register(name, username, password, password2).then(
                                user => {
                                    const { from } = history.location.state || {
                                        from: { pathname: '/chat' },
                                    };
                                    history.push(from);
                                },
                                error => {
                                    setSubmitting(false);
                                    setStatus(error);
                                }
                            );
                        }}
                        validateOnChange={false}
                        validateOnBlur={false}
                    >
                        {({
                            handleSubmit,
                            handleChange,
                            values,
                            touched,
                            isValid,
                            errors,
                        }) => (
                            <form
                                onSubmit={handleSubmit}
                                className={classes.form}
                            >
                                <input type="text"
                                    id="name"
                                    className={classes.textField}
                                    placeholder="Enter Name"
                                    name="name"
                                    label="Name"
                                    fullWidth={true}
                                    variant="outlined"
                                    margin="normal"
                                    required={true}
                                    helperText={touched.name ? errors.name : ''}
                                    error={touched.name && Boolean(errors.name)}
                                    value={values.name}
                                    onChange={handleChange}
                                />

                                <input type="text"
                                    id="username"
                                    className={classes.textField}
                                    placeholder="Enter Username"
                                    name="username"
                                    label="Username"
                                    fullWidth={true}
                                    variant="outlined"
                                    margin="normal"
                                    required={true}
                                    helperText={
                                        touched.username ? errors.username : ''
                                    }
                                    error={
                                        touched.username &&
                                        Boolean(errors.username)
                                    }
                                    value={values.username}
                                    onChange={handleChange}
                                />

                                <input type="password"
                                    id="password"
                                    className={classes.textField}
                                    placeholder="Enter Password"
                                    name="password"
                                    label="Password"
                                    fullWidth={true}
                                    variant="outlined"
                                    margin="normal"
                                    required={true}
                                    helperText={
                                        touched.password ? errors.password : ''
                                    }
                                    error={
                                        touched.password &&
                                        Boolean(errors.password)
                                    }
                                    value={values.password}
                                    onChange={handleChange}
                                />

                                <input type="password"
                                    id="password2"
                                    className={classes.textField}
                                    placeholder="Enter Confirm Password"
                                    name="password2"
                                    label="Confirm Password"
                                    fullWidth={true}
                                    variant="outlined"
                                    margin="normal"
                                    required={true}
                                    helperText={
                                        touched.password2
                                            ? errors.password2
                                            : ''
                                    }
                                    error={
                                        touched.password2 &&
                                        Boolean(errors.password2)
                                    }
                                    value={values.password2}
                                    onChange={handleChange}
                                />

                                <Button
                                    type="submit"
                                    fullWidth={true}
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Register
                                </Button>
                                <span>
                                <Link
                            href="/login"
                            class={classes.signin}
                        >
                            Already have an account?
                        </Link>
                                </span>
                            </form>
                        )}
                    </Formik>
                </Grid>
                <Grid item xs={9}>
                    <Typography>
                        
                    </Typography>
                </Grid>
            </Grid>
        </div>
    );
};

export default Register;
