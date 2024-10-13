import { useState } from "react";
import { useUserLoginMutation } from "../../app/services/authApi";
import { useDispatch } from 'react-redux';
import { setCredentials } from "../../utils/authSlice";
import { useNavigate } from 'react-router-dom'; 

export default function Login() {
    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [
        userLogin,
        {
            isLoading: customerLoginLoading,
            isSuccess: customerLoginSuccess,
            isError: customerLoginError,
        },
    ] = useUserLoginMutation();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await userLogin(JSON.stringify({identifier:userData.email,password:userData.password})).unwrap();
            if (response) {
                const { jwt, user } = response;
                dispatch(setCredentials({ ...user, token: jwt }));
                localStorage.setItem('userId',user.id)

                localStorage.setItem("authToken", jwt);
                navigate('/Dashboard'); 
            } else {
                setError('Login failed');
            }
        } catch (error) {
            setError("An error occurred. Please try again.");
        }
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen p-4">
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                        Login
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && <p className="text-red-500">{error}</p>}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-6 text-white"
                            >
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    onChange={handleChange}
                                    autoComplete="email"
                                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium leading-6 text-white"
                                >
                                    Password
                                </label>
                                <div className="text-sm">
                                    <a
                                        href="#"
                                        className="font-semibold text-indigo-400 hover:text-indigo-300"
                                    >
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    onChange={handleChange}
                                    autoComplete="current-password"
                                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                            >
                                Login
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-400">
                        Don't have an account?{" "}
                        <a
                            href="/signup"
                            className="font-semibold leading-6 text-indigo-400 hover:text-indigo-300"
                        >
                            Sign up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
