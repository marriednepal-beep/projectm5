import type {Metadata} from "next";
import RulesClient from "./rules-client";
export const metadata:Metadata={title:"Rules & Guidelines for Matrimonial Registration",description:"Read Married Nepal matrimonial registration eligibility, personal information, confidentiality, payment conditions and respectful communication rules.",alternates:{canonical:"/rules"}};
export default function Rules(){return <RulesClient/>;}
