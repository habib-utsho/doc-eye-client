"use client";
import React, { useState } from "react";
import signinBG from "@/src/assets/img/Sign/signinBG.jpg";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DEForm from "@/src/components/form/DEForm";
import { GithubIcon, Logo } from "@/src/components/icons";
import MyInp from "@/src/components/form/MyInp";
import { Button } from "@nextui-org/button";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authValidationSchema } from "@/src/schemas/auth.schema";

// Need to change password
const SigninPage = () => {
  const [showPass, setShowPass] = useState(false);
  // const { user, authLoading, setAuthLoading, profileControl, setProfileControl } = useAuth()
  const router = useRouter();
  // const axiosInstance = useAxiosInstance()
  // const cookies = useCookies()

  // if (authLoading) {
  //     return <div className='my-h-screen flex items-center justify-center bg-slate-100'><MyLoading /></div>
  // } else if (user) {
  //     router.push('/')
  // }

  // const onSubmit = form => {
  //     // Using email or phone as username to signin
  //     const { username, password } = form
  //     axiosInstance.post('/signin', { username, password }).then(res => {
  //         setAuthLoading(false)

  //         cookies.remove('docEyeAccessToken')
  //         cookies.set('docEyeAccessToken', res?.data?.token);

  //         toast.success('User signin successfully!', {
  //             position: "bottom-right",
  //             autoClose: 3000,
  //             hideProgressBar: false,
  //             closeOnClick: true,
  //             pauseOnHover: true,
  //             draggable: true,
  //             progress: undefined,
  //             theme: "light",
  //         });

  //         setProfileControl(!profileControl)
  //         router.push('/')
  //         reset()

  //     }).catch(e => {
  //         setAuthLoading(false)

  //         console.log(e?.response?.data?.errors);

  //         if (e?.response?.data?.errors?.common?.msg) {
  //             toast.error(e?.response?.data?.errors?.common?.msg, {
  //                 position: "bottom-right",
  //                 autoClose: 3000,
  //                 hideProgressBar: false,
  //                 closeOnClick: true,
  //                 pauseOnHover: true,
  //                 draggable: true,
  //                 progress: undefined,
  //                 theme: "light",
  //             });
  //         }
  //     })
  // };
  const onSubmit: SubmitHandler<FieldValues> = (form: any) => {
    console.log(form, "form");
  };

  return (
    <div
      className="min-h-screen  flex items-center justify-center bg-cover bg-center bg-slate-800 bg-blend-overlay my-28 md:my-0"
      style={{ backgroundImage: `url(${signinBG.src})` }}
    >
      <DEForm
        onSubmit={onSubmit}
        resolver={zodResolver(authValidationSchema.signinValidationSchema)}
      >
        <div className="shadow w-5/6 md:w-8/12 xl:w-7/12 mx-auto block xl:flex flex-row my-5 md:my-32">
          {/* signin form left */}
          <div className="w-full xl:w-3/6 bg-slate-50 px-8 py-14 rounded-l">
            <div className="mb-8 space-y-1">
              <h2 className="text-primary font-semibold">Hello and welcome </h2>
              <p className="text-gray-700 text-sm">
                Access Your Personalized Healthcare Services
              </p>
            </div>

            <div className="space-y-4">
              <MyInp type="email" name="email" label="Email" />
              <MyInp type="password" name="password" label="Password" />
              <div></div>

              <Button type="submit" color="primary" className="text-white">
                Signin
              </Button>

              <p className="text-slate-700">
                New here?{" "}
                <Link href={"/signup"}>
                  <button className="text-primary cursor-pointer font-bold">
                    Signup
                  </button>
                </Link>
              </p>
              <div className="flex gap-3 items-center">
                <hr className="h-px w-full bg-slate-500" />
                <span className="text-slate-500">or</span>
                <hr className="h-px w-full bg-slate-500" />
              </div>
              <div>
                <p className="text-slate-700 flex items-center gap-2">
                  Continue with?{" "}
                  <span className="text-xl cursor-pointer hover:scale-110 transition text-primary hover:text-secondary">
                    <GithubIcon></GithubIcon>
                  </span>{" "}
                  <span className="text-xl cursor-pointer hover:scale-110 transition text-primary hover:text-secondary">
                    <GithubIcon></GithubIcon>
                  </span>{" "}
                </p>
              </div>
            </div>
          </div>

          {/* signin right */}
          <div className="bg-slate-800 bg-opacity-60 hidden xl:flex items-center justify-center text-white rounded-r flex-1 p-5">
            <div className="space-y-4">
              <h2 className="my-subtitle">
                Welcome to <span className="text-secondary">DocEye</span>
              </h2>
              <p className="text-slate-400">Login to access your account</p>
            </div>
          </div>
        </div>
      </DEForm>
    </div>
  );
};

export default SigninPage;
