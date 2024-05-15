import { useForm } from "react-hook-form";
import { LoginFormDataType } from "../types";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";

import * as apiClient from '../api-client';
import { useAppContext } from "../contexts/AppContext";

export default function Login() {
  const queryClient = useQueryClient();

  const {showToast} = useAppContext();

  const navigate = useNavigate();

  const { register, formState: {errors}, handleSubmit } = useForm<LoginFormDataType>();

  const mutation = useMutation(apiClient.login, {
    onSuccess: async () => {
      // invalidate validateToken query
      await queryClient.invalidateQueries('validateToken');
      // 1. show the toast
      showToast({message: "Sign in successfull", type: "SUCCESS"});
      // 2. navigate to home page
      navigate("/");
    },
    onError: (error: Error) => {
      console.log(error)
      // show toast
      showToast({message: "Sign in failed", type: "ERROR"});
    }
  })

  const onSubmit = handleSubmit(data=>{
    console.log(data)
    mutation.mutate(data);
  })

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Welcome back</h2>
      <label className="text-gray-700 text-sm font-bold flex-1">Email</label>
      <input
        type="email"
        className="border rounded w-full py-1 px-2 font-normal"
        {...register("email", { required: "Email is required." })}
      />
      {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      <label className="text-gray-700 text-sm font-bold flex-1">Password</label>
      <input
        type="password"
        className="border rounded w-full py-1 px-2 font-normal"
        {...register("password", {
          required: "Password is required.",
          minLength: {
            value: 8,
            message: "Password must be at least 8 characters long.",
          },
        })}
      />
      {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      <span className="flex items-center justify-between">
        <span className="text-sm">Not Registered yet? <Link to="/register" className="text-blue-600 underline font-bold">Register here</Link></span>
        <span className="text-sm">Forgot password? <Link to="/" className="text-blue-600 underline font-bold">Click here</Link></span>
        <button
          type="submit"
          className="bg-blue-600 text-white font-bold p-2 hover:bg-blue-500 text-xl rounded"
        >
          Sign in
        </button>
      </span>
    </form>
  );
}
