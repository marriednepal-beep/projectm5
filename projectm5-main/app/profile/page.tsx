import type {Metadata} from "next";import ProfileDetail from "./profile-detail";
export const metadata:Metadata={title:"Matrimonial Profile",robots:{index:false,follow:false}};
export default function ProfilePage(){return <ProfileDetail/>}
