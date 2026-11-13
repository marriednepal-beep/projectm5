"use client";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {Menu,X,ArrowUpRight,Youtube,Facebook,Phone,MessageCircle,Mail,Clock3} from "lucide-react";
import {useState} from "react";
import {useApp} from "@/components/providers";
import {brand} from "@/lib/constants";
import {defaultOffice} from "@/lib/cms";

function Logo({light=false}:{light?:boolean}){
 const {site}=useApp();
 return <span className={`identity elegant-identity ${light?"identity-light":""}`}>
  <img className="brand-crest" src={site.logoImage||"/images/married-nepal-outline.svg"} alt="Married Nepal emblem" />
  <span className="brand-words"><strong>Married <span>Nepal</span></strong><small>PRIVATE LIMITED <i>✦</i> EST. IN NEPAL</small></span>
 </span>;
}
export function Header(){
 const {lang,setLang,user,admin,site}=useApp();
 const [open,setOpen]=useState(false);
 const path=usePathname();
 const nav=[{href:"/",en:"Home",np:"गृहपृष्ठ"},{href:"/find-partner",en:"Find a partner",np:"जीवनसाथी खोज्नुहोस्"},{href:"/about",en:"Our story",np:"हाम्रो बारेमा"},{href:"/contact",en:"Contact",np:"सम्पर्क"}];
 return <>
  <div className="topbar elegant-topbar"><div className="container topbar-inner"><span className="mini-caps">MARRIED NEPAL PRIVATE LIMITED</span><div className="topbar-right"><span>{site.content?.['header.tagline']?.[lang]||(lang==='np'?'अर्थपूर्ण परिचय, दीर्घकालीन सम्बन्ध।':'Thoughtful connections. Lasting beginnings.')}</span><a href={`https://wa.me/${(site.whatsapp||brand.phone).replace(/\D/g,"")}`} target="_blank" rel="noopener noreferrer"><MessageCircle size={12}/>{site.whatsapp||brand.phone}</a></div></div></div>
  <header className="site-header elegant-header"><div className="container nav-row">
   <Link className="brand" href="/" onClick={()=>setOpen(false)}><Logo/></Link>
   <nav className={`nav-links ${open?"mobile-open":""}`} aria-label="Main navigation">{nav.map(n=><Link key={n.href} href={n.href} onClick={()=>setOpen(false)} className={path===n.href?"active":""}>{lang==="np"?n.np:n.en}</Link>)}<div className="mobile-account"><Link onClick={()=>setOpen(false)} href="/fees">{lang==="np"?"सेवा र शुल्क":"Services & fees"}</Link><Link onClick={()=>setOpen(false)} href="/rules">{lang==="np"?"नियमहरू":"Rules & guidelines"}</Link>{admin&&<Link onClick={()=>setOpen(false)} href="/admin">Admin studio</Link>}</div></nav>
   <div className="nav-actions"><div className="language" role="group" aria-label="Language"><button className={lang==="en"?"selected":""} onClick={()=>setLang("en")}>EN</button><button className={lang==="np"?"selected":""} onClick={()=>setLang("np")}>ने</button></div>{admin&&<Link className="nav-login" href="/admin">Admin studio</Link>}<Link className="nav-register" href="/register">{site.content?.['header.createProfile']?.[lang]||(lang==='np'?'प्रोफाइल बनाउनुहोस्':'Create profile')}<ArrowUpRight size={15}/></Link></div>
   <button className="mobile-toggle" type="button" aria-label={open?"Close navigation":"Open navigation"} aria-expanded={open} onClick={()=>setOpen(!open)}>{open?<X size={22}/>:<Menu size={22}/>}</button>
  </div></header>
 </>;
}
export function Footer(){const {site,lang}=useApp(),office=site.office||defaultOffice;return <footer className="footer"><div className="container footer-grid"><div><Link href="/" className="brand footer-brand"><Logo light/></Link><p>{lang==="np"?"विश्वास, गोपनीयता र सम्मानमा आधारित नेपाली वैवाहिक परिचय सेवा।":"Thoughtful introductions, genuine intentions and personal choice — with your privacy respected."}</p><div className="socials"><a aria-label="Facebook" href={site.facebook||brand.facebook} target="_blank" rel="noopener noreferrer"><Facebook size={18}/></a><a aria-label="TikTok" href={site.tiktok||brand.tiktok} target="_blank" rel="noopener noreferrer">♪</a><a aria-label="YouTube" href={site.youtube||brand.youtube} target="_blank" rel="noopener noreferrer"><Youtube size={18}/></a></div></div><div><h4>Explore</h4><Link href="/about">Our story</Link><Link href="/fees">Services & fees</Link><Link href="/how-it-works">How it works</Link><Link href="/contact">Contact us</Link></div><div><h4>Useful links</h4><Link href="/register">Registration form</Link><Link href="/find-partner">Find a partner</Link><Link href="/rules">Rules & guidelines</Link><Link href="/privacy">Privacy policy</Link><Link href="/terms">Terms</Link></div><div><h4>Get in touch</h4><p>{lang==="np"?office.addressNp:office.addressEn}</p><a className="footer-contact" href={`https://wa.me/${(site.whatsapp||brand.phone).replace(/\D/g,"")}`} target="_blank" rel="noopener noreferrer"><MessageCircle size={18}/>{site.whatsapp||brand.phone}<ArrowUpRight size={14}/></a><a href={`mailto:${office.email}`} className="footer-contact"><Mail size={16}/>{office.email}</a></div></div><div className="container bottomline"><span>© {new Date().getFullYear()} Married Nepal Pvt. Ltd. All rights reserved.</span><span>Private registration · Admin-reviewed profiles · Your consent matters <Link href="/login" className="footer-staff">Staff access</Link></span></div></footer>}
export function Whatsapp(){const {site}=useApp();return <a className="whatsapp-float" href={`https://wa.me/${(site.whatsapp||brand.phone).replace(/\D/g,"")}?text=${encodeURIComponent("Namaste, I would like information about Married Nepal's matrimonial services.")}`} target="_blank" rel="noopener noreferrer" aria-label="Contact Married Nepal on WhatsApp"><MessageCircle size={22} strokeWidth={2}/><span>WhatsApp</span></a>}
