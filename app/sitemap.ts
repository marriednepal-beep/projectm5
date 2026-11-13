import type {MetadataRoute} from "next";import {siteUrl} from "@/lib/constants";
export default function sitemap():MetadataRoute.Sitemap{
  const pages=["/","/about","/how-it-works","/find-partner","/nepali-matrimonial","/contact","/register","/fees","/rules","/guides/matrimonial-profile-tips"];
  return pages.map(path=>({url:`${siteUrl}${path}`,changeFrequency:path==="/"?"weekly":"monthly",priority:path==="/"?1:path==="/nepali-matrimonial"?.8:.7}));
}
