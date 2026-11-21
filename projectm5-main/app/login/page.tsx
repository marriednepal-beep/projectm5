import type {Metadata} from "next";import LoginClient from "./login-client";
export const metadata:Metadata={title:"Administrator Login",robots:{index:false,follow:false},alternates:{canonical:"/login"}};
export default function Login(){return <LoginClient/>}
