import type {Metadata} from "next";import AdminClient from "./admin-client";
export const metadata:Metadata={title:"Admin Studio",robots:{index:false,follow:false}};
export default function Admin(){return <AdminClient/>}
