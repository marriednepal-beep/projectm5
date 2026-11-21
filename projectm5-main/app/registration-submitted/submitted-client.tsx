"use client";
import {useEffect,useState} from "react";
import Link from "next/link";
import {CheckCircle2,MessageCircle,ShieldCheck,Clock3} from "lucide-react";
import {useApp} from "@/components/providers";
import {brand} from "@/lib/constants";
type Receipt={code:string;name:string;phone:string;consentWhatsapp:boolean;feeStatus:string};
export default function SubmittedClient(){
 const {site}=useApp();const [receipt,setReceipt]=useState<Receipt|null>(null);
 useEffect(()=>{try{const data=sessionStorage.getItem("mn-last-submission");if(data)setReceipt(JSON.parse(data) as Receipt);}catch{}},[]);
 const number=(site.whatsapp||brand.phone).replace(/\D/g,"");
 const message=receipt?.consentWhatsapp?`Namaste Married Nepal. I submitted application ${receipt.code}. Name: ${receipt.name}. Phone: ${receipt.phone}. Please review my registration.`:"Namaste Married Nepal. I have submitted a matrimonial registration. Please advise me on the next steps.";
 return <section className="section"><div className="container narrow"><div className="submission-card"><CheckCircle2 size={54} className="submission-check"/><span className="eyebrow">APPLICATION RECEIVED</span><h1>Your registration is awaiting review.</h1><p>Thank you. Your information was submitted privately to Married Nepal. The office will review your details, submitted photographs and any payment evidence. No public profile is created automatically.</p><div className="submission-detail"><span>Application reference</span><strong>{receipt?.code||"Check your saved confirmation"}</strong><span>Status</span><strong>Pending administrator review</strong><span>Payment evidence</span><strong>{receipt?.feeStatus==='submitted'?"Submitted for verification":"Not yet verified"}</strong></div><div className="notice"><Clock3 size={20}/><p>Saving a payment receipt does not mean payment has been verified. Wait for confirmation from the office.</p></div><a className="btn btn-gold" target="_blank" rel="noopener noreferrer" href={`https://wa.me/${number}?text=${encodeURIComponent(message)}`}><MessageCircle size={18}/> Continue on WhatsApp</a><p className="muted small-note">WhatsApp only opens a message draft. You decide whether to press Send.</p><Link href="/" className="btn btn-cream">Return to homepage</Link><div className="secure-note"><ShieldCheck size={16}/> Only your name and an approved photograph could later be published, subject to your consent.</div></div></div></section>;
}
