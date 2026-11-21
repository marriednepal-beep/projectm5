import type {Metadata} from "next";
import FeesClient from "./fees-client";
export const metadata:Metadata={title:"Services & Fees — Married Nepal",description:"See Married Nepal fees: Rs. 2,000 male registration, Rs. 1,500 female registration and a combined Rs. 5,000 post-marriage confirmation fee.",alternates:{canonical:"/fees"}};
export default function Fees(){return <FeesClient/>;}
