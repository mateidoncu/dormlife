'use client';

import Link from "next/link";
import { signUp } from "next-auth-sanity/client";
import { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";

const defaultFormData = {
    email: "",
    name: "",
    password: "",
    faculty: "",
    yearOfStudy: "",
}

const Auth = () => {

    const [formData, setFormData] = useState(defaultFormData);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const user = await signUp(formData);
            if (user) {
                toast.success("Success. Please login");
            }
        } catch (error) {
            toast.error("Sign-up failed");
        } finally {
            setFormData(defaultFormData);
        }
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <Link href="/">
            <img
                className="mx-auto h-10 w-auto"
                src="/logo-dark.svg"
                alt="DormLife"
            />
            </Link>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Create your account
            </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                        Email address
                    </label>
                    <div className="mt-2">
                        <input
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary_dark sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                        Password
                        </label>
                    </div>
                    <div className="mt-2">
                        <input
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        value={formData.password}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary_dark sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                        Name
                        </label>
                    </div>
                    <div className="mt-2">
                        <input
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary_dark sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="faculty" className="block text-sm font-medium leading-6 text-gray-900">
                        Faculty
                        </label>
                    </div>
                    <div className="mt-2">
                        <input
                        name="faculty"
                        type="text"
                        autoComplete="faculty"
                        value={formData.faculty}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary_dark sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="yearOfStudy" className="block text-sm font-medium leading-6 text-gray-900">
                        Year of study
                        </label>
                    </div>
                    <div className="mt-2">
                        <input
                        name="yearOfStudy"
                        type="number"
                        autoComplete="yearOfStudy"
                        value={formData.yearOfStudy}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary_dark sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div>
                <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-primary_dark px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                    Sign up
                </button>
                </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
                Already an user?{' '}
                <a href="/login" className="font-semibold leading-6 text-primary_dark hover:text-primary">
                Login
                </a>
            </p>
            <p className="mt-1 text-center text-gray-500 text-xs">
                &copy;2024 Matei Doncu. All rights reserved.
            </p>
            </div>
        </div>  
    );
};

export default Auth