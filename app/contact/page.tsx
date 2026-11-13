import type {Metadata} from "next";
import ContactClient from "./contact-client";
export const metadata:Metadata={title:"Contact & Office — Married Nepal Pvt. Ltd.",description:"Contact Married Nepal's matrimonial service office, send an enquiry by WhatsApp, find registration support, address and hours.",alternates:{canonical:"/contact"}};
export default function Contact(){return <ContactClient/>;}
