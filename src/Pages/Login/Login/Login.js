import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext/AuthContext';
import { GoogleAuthProvider } from 'firebase/auth';
import useToken from '../../../hooks/userToken';



const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { signIn, googleProviderLogin } = useContext(AuthContext);
    const [loginError, setLoginError] = useState('');
    const [loginUserEmail, setLoginUserEmail] = useState('');
    const [loading, setLoading] = useState(true);


    const googleProvider = new GoogleAuthProvider()
    const [token] = useToken(loginUserEmail);
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/';

    if (token) {
        navigate(from, { replace: true });
    }


    const handleLogin = data => {
        console.log(data);
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                setLoginUserEmail(data.email)
                toast('User Login Successfully.')
            })
            .catch(error => {
                console.log(error.message)
                setLoginError(error.message);
            });

    }

    const handleGoogleSignIn = () => {
        setLoginError("");
        googleProviderLogin(googleProvider)
            .then((result) => {
                const user = result.user;
                setLoginUserEmail(user.email)
                savedUser(user.displayName, user.email, 'Buyer')
                toast.success("Login Success");
                setLoading(false);

            })
            .catch(error => {
                setLoginError(error.message);
                setLoading(false);
            });
    };

    const savedUser = (name, email, role) => {
        const user = { name, email, role };
        fetch('http://localhost:5000/users', {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(user),
        })
            .then((res) => res.json())
            .then((data) => {
                setLoginUserEmail(email);
            });
    };

    return (
        <div className='h-[800px] flex justify-center items-center'>
            <div className='w-96 p-7 bg-gray-800 shadow-2xl'>
                <h2 className='text-xl text-center'>Login</h2>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Email</span></label>
                        <input type="text"
                            {...register("email", {
                                required: "Email Address is required"
                            })}
                            className="input input-bordered w-full max-w-xs" />
                        {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Password</span></label>
                        <input type="password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: { value: 6, message: 'Password must be 6 characters or longer' }
                            })}
                            className="input input-bordered w-full max-w-xs" />
                        <label className="label"> <span className="label-text">Forget Password?</span></label>
                        {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                    </div>
                    <input className='btn btn-active btn-ghost w-full' value="Login" type="submit" />
                    {loginError && <p className='text-red-600'>{loginError}</p>}
                </form>
                <p>New to phone swap <Link className='text-secondary' to="/signup">Create new Account</Link></p>
                <div className="divider">OR</div>
                <button onClick={handleGoogleSignIn} className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default Login;