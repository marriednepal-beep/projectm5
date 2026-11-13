import type {Metadata} from "next";import RegisterForm from "./register-form";
export const metadata:Metadata={title:"Create Your Matrimonial Profile",description:"Create your confidential Married Nepal account and register a matrimonial profile for administrator review.",robots:{index:true,follow:true},alternates:{canonical:"/register"}};
export default function Register(){return <RegisterForm/>}
