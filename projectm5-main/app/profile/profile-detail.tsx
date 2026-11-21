"use client";
import {useEffect,useState} from 'react';import Link from 'next/link';
import {getDoc,doc} from 'firebase/firestore';import {Heart,ShieldCheck} from 'lucide-react';
import {requireDb,isConfigured} from '@/lib/firebase';
import type {PublicProfile} from '@/lib/types';
import MatchInquiryForm from '@/components/match-inquiry-form';
import {FirebaseNotice,FriendlyError} from '@/components/alerts';
export default function ProfileDetail(){const [id,setId]=useState(''),[profile,setProfile]=useState<PublicProfile|null>(null),[busy,setBusy]=useState(true),[error,setError]=useState('');
 useEffect(()=>{const uid=new URLSearchParams(window.location.search).get('uid')||'';setId(uid);if(!uid||uid.includes('/')||!isConfigured){setBusy(false);return;}getDoc(doc(requireDb(),'publicProfiles',uid)).then(s=>setProfile(s.exists()?s.data() as PublicProfile:null)).catch(e=>setError(e instanceof Error?e.message:'Profile unavailable')).finally(()=>setBusy(false));},[]);
 return <section className="section profile-detail-page"><div className="container"><div className="breadcrumbs"><Link href="/find-partner">Find Your Partner</Link><span>/</span><span>Approved Profile</span></div><FirebaseNotice/>{busy?<p>Loading…</p>:error?<FriendlyError message={error}/>:!profile?<div className="empty-state"><Heart size={35}/><h2>This profile is not publicly available.</h2><p>It may be pending, hidden, unpublished, or withdrawn by its owner.</p><Link href="/find-partner" className="btn btn-maroon">Browse profiles</Link></div>:<div className="public-detail"><div className="public-detail-photo"><img src={profile.photo} alt={`Approved photo of ${profile.name}`}/></div><div className="public-detail-copy"><span className="eyebrow">APPROVED PUBLIC PROFILE</span><h1>{profile.name}</h1><p><ShieldCheck size={19}/> Only this name and one approved photograph are public. Other details are never displayed here.</p><MatchInquiryForm targetUid={id} targetName={profile.name}/></div></div>}</div></section>;
}
