import type {MetadataRoute} from "next";import {siteUrl} from "@/lib/constants";
export default function robots():MetadataRoute.Robots{return {rules:[{userAgent:"*",allow:"/",disallow:["/admin","/dashboard","/login","/profile","/registration-submitted"]}],sitemap:`${siteUrl}/sitemap.xml`,host:siteUrl};}
