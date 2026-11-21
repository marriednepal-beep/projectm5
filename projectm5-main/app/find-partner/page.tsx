import type {Metadata} from "next";import SearchClient from "./search-client";
export const metadata:Metadata={title:"Find a Nepali Marriage Partner",description:"Discover consented, administrator-approved public matrimonial profile names and photographs. Send a private match inquiry to the Married Nepal team.",alternates:{canonical:"/find-partner"}};
export default function Find(){return <SearchClient/>}
