"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { type Lang, copy } from "@/lib/constants";
import type { SiteConfig } from "@/lib/types";

type State={user:User|null;loading:boolean;admin:boolean;lang:Lang;setLang:(l:Lang)=>void;site:SiteConfig};
const C=createContext<State>({user:null,loading:true,admin:false,lang:"en",setLang:()=>{},site:{}});
export const useApp=()=>useContext(C);
export const useCopy=()=>copy[useApp().lang];
export function Providers({children}:{children:React.ReactNode}){
  const [user,setUser]=useState<User|null>(null);const [loading,setLoading]=useState(true);const [admin,setAdmin]=useState(false);
  const [lang,setLangState]=useState<Lang>("en");const [settings,setSettings]=useState<SiteConfig>({});
  const [assets,setAssets]=useState<SiteConfig>({});const site:SiteConfig={...settings,...assets};
  useEffect(()=>{try{const l=window.localStorage.getItem("mn-language");if(l==="np")setLangState("np");}catch{}},[]);
  useEffect(()=>{document.documentElement.lang=lang==="np"?"ne":"en";},[lang]);
  const setLang=(l:Lang)=>{setLangState(l);try{window.localStorage.setItem("mn-language",l)}catch{}};
  useEffect(()=>{
    if(!auth){setLoading(false);return;}
    return onAuthStateChanged(auth,async u=>{
      setUser(u);setAdmin(false);
      if(u&&db){try{const snap=await getDoc(doc(db,"admins",u.uid));setAdmin(snap.exists());}catch{setAdmin(false);}}
      setLoading(false);
    });
  },[]);
  useEffect(()=>{
    const root=document.documentElement;
    const palette={original:{maroon:'#701e34',gold:'#c49a45',deep:'#501426',paper:'#fffdf9',nav:'#fffdf9'},classic:{maroon:'#64142f',gold:'#d4a94d',deep:'#3d0b20',paper:'#fffaf7',nav:'#fffaf7'},golden:{maroon:'#75542a',gold:'#b78e43',deep:'#422e17',paper:'#fffdfa',nav:'#fffdfa'},sage:{maroon:'#345e55',gold:'#b89d65',deep:'#1f443b',paper:'#f6f8f4',nav:'#f6f8f4'}} as const;
    const colors=palette[site.themePreset||'original'];
    root.style.setProperty('--maroon',/^#[0-9a-fA-F]{6}$/.test(site.maroon||'')?site.maroon!:colors.maroon);
    root.style.setProperty('--gold',/^#[0-9a-fA-F]{6}$/.test(site.accent||'')?site.accent!:colors.gold);
    root.style.setProperty('--maroon-deep',colors.deep);
    root.style.setProperty('--paper',colors.paper);
    root.style.setProperty('--header-paper',colors.nav);
    root.dataset.theme=site.themePreset||'original';
  },[site.maroon,site.accent,site.themePreset]);
  useEffect(()=>{if(!db)return;return onSnapshot(doc(db,"settings","appearance"),snap=>setSettings(snap.exists()?snap.data() as SiteConfig:{}),()=>{});},[]);
  useEffect(()=>{if(!db)return;const keys=["logoImage","faviconImage","heroImage","aboutImage","registrationImage","contactImage","paymentQrImage","esewaQrImage","khaltiQrImage","bankQrImage"] as const;
    const unsubs=keys.map(key=>onSnapshot(doc(db!,"siteAssets",key),snap=>{setAssets(prev=>({...prev,[key]:snap.exists()?snap.data().imageData:undefined}));},()=>{}));
    return ()=>unsubs.forEach(fn=>fn());},[]);
  useEffect(()=>{if(!site.faviconImage)return;let icon=document.querySelector<HTMLLinkElement>("link[rel='icon']");if(!icon){icon=document.createElement("link");icon.rel="icon";document.head.appendChild(icon);}icon.href=site.faviconImage;},[site.faviconImage]);
  useEffect(()=>{if(window.location.pathname!=="/")return;if(site.seoTitle)document.title=site.seoTitle;if(site.seoDescription){const meta=document.querySelector('meta[name="description"]');if(meta)meta.setAttribute("content",site.seoDescription);}},[site.seoTitle,site.seoDescription]);
  return <C.Provider value={{user,loading,admin,lang,setLang,site}}>{children}</C.Provider>;
}
