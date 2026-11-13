import type {Metadata} from "next";
import SubmittedClient from "./submitted-client";
export const metadata:Metadata={title:"Application Submitted",robots:{index:false,follow:false}};
export default function Page(){return <SubmittedClient/>;}
