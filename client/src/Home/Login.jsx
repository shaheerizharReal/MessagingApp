import React from 'react';
import Button from '@material-ui/core/Button';
import { Formik } from 'formik';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import * as Yup from 'yup';

import history from '../Utilities/history';
import { useLogin } from '../Services/authenticationService';

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
    signup: {
        color: 'HotPink',
    },
    textField: {
        width: '100%',
        height: '10px',
        padding: '22px 20px',
        border: '2px solid #ccc',
    }
}));

const Login = props => {
    const login = useLogin();
    const classes = useStyles();

    return (
        <div className={classes.paper}>
            <Grid container>
                <Grid item>
                    <Typography component="h1" variant="h5" align="center">
                        Use Your Credentials
                    </Typography>
                    <Formik
                        initialValues={{
                            username: '',
                            password: '',
                        }}
                        validationSchema={Yup.object().shape({
                            username: Yup.string()
                                .required('Username is required')
                                .max(40, 'Username is too long'),
                            password: Yup.string()
                                .required('Password is required')
                                .max(100, 'Password is too long')
                                .min(6, 'Password must be minimum 6 characters'),
                        })}
                        onSubmit={(
                            { username, password },
                            { setStatus, setSubmitting }
                        ) => {
                            setStatus();
                            login(username, password).then(
                                () => {
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
                    >
                        {({
                            handleSubmit,
                            handleChange,
                            values,
                            touched,
                            errors,
                        }) => (
                            <form
                                onSubmit={handleSubmit}
                                className={classes.form}
                            >
                                <input type="text"
                                    id="username"
                                    className={classes.textField}
                                    name="username"
                                    label="Username"
                                    
                                    variant="outlined"
                                    margin="normal"
                                    required={true}
                                    placeholder="USERNAME"
                                    value={values.username}
                                    onChange={handleChange}
                                />
                                <input type="password"
                                    id="password"
                                    className={classes.textField}
                                    name="password"
                                    label="Password"
                                    placeholder="PASSWORD"
                                    variant="outlined"
                                    margin="normal"
                                    required={true}
                                    value={values.password}
                                    onChange={handleChange} 
                                />
                                <Button
                                    type="submit"
                                    fullWidth={true}
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Login
                                </Button><span><Link  
                            href="/register"
                            className={classes.signup}
                        >
                            Don't have an account?
                        </Link></span>
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

export default Login;

