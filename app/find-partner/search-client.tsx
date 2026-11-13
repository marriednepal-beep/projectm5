"use client";
import {useEffect,useMemo,useState} from 'react';
import {Search,ShieldCheck,Heart} from 'lucide-react';
import type {PublicProfile} from '@/lib/types';
import {listApprovedProfiles} from '@/lib/actions';
import {ProfileCard} from '@/components/profile-card';
import MatchInquiryForm from '@/components/match-inquiry-form';
import {FirebaseNotice,FriendlyError} from '@/components/alerts';
import {useApp} from '@/components/providers';
export default function SearchClient(){
 const {lang}=useApp();const [profiles,setProfiles]=useState<(PublicProfile&{id:string})[]>([]),[term,setTerm]=useState(''),[busy,setBusy]=useState(true),[error,setError]=useState('');
 useEffect(()=>{const queryName=new URLSearchParams(window.location.search).get('name');if(queryName)setTerm(queryName);listApprovedProfiles().then(setProfiles).catch(e=>setError(e instanceof Error?e.message:'Unable to load profiles')).finally(()=>setBusy(false));},[]);
 const visible=useMemo(()=>profiles.filter(p=>p.name.toLocaleLowerCase().includes(term.toLocaleLowerCase().trim())),[profiles,term]);
 return <><section className="pagehero search-hero"><div className="container"><span className="eyebrow">MARRIED NEPAL · FIND YOUR PARTNER</span><h1>{lang==='np'?'जीवनसाथी खोज्नुहोस्':'Discover meaningful introductions'}</h1><p>{lang==='np'?'सहमति सहित सार्वजनिक भएका नाम र स्वीकृत फोटो मात्र देखिन्छन्।':'Approved profiles display only a name and one approved photo, with consent. Everything else is private.'}</p></div></section><section className="section search-page"><div className="container"><FirebaseNotice/><div className="public-search-bar"><Search size={21}/><input value={term} onChange={e=>setTerm(e.target.value)} aria-label="Search by name" placeholder={lang==='np'?'नामबाट खोज्नुहोस्':'Search approved names'}/><span>{busy?'Loading…':`${visible.length} profiles`}</span></div>{error&&<FriendlyError message={error}/>}<div className="profile-grid">{visible.map(p=><ProfileCard key={p.id} id={p.id} p={p}/>)}</div>{!busy&&!error&&visible.length===0&&<div className="empty-state"><Heart size={40}/><h2>{lang==='np'?'हाल कुनै प्रोफाइल उपलब्ध छैन':'No public profiles available yet'}</h2><p>Only admin-approved members who consented to name and photo publication are shown.</p></div>}<div className="search-disclaimer"><ShieldCheck size={18}/> Age, location, education, occupation, contact details and preferences are never available in public search or profile pages.</div><div className="inquiry-bottom"><MatchInquiryForm/></div></div></section></>;
}
