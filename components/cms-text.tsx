"use client";
import {useApp} from "@/components/providers";
import {cmsFields} from "@/lib/cms";
export function useCmsText(key:string){const {site,lang}=useApp();const item=cmsFields.find(x=>x.key===key);const custom=site.content?.[key]?.[lang];return custom||item?.[lang]||"";}
