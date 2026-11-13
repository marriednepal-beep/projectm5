import type {Metadata} from "next";
import AboutClient from "./about-client";
export const metadata:Metadata={title:"About Us — Married Nepal Private Limited",description:"Learn about the mission, values and respectful privacy-focused matchmaking approach of Married Nepal Pvt. Ltd.",alternates:{canonical:"/about"}};
export default function About(){return <AboutClient/>;}
