"use client";
import Link from 'next/link';
import {ArrowUpRight,Heart} from 'lucide-react';
import type {PublicProfile} from '@/lib/types';
export function ProfileCard({id,p}:{id:string;p:PublicProfile}){
 return <Link href={`/profile?uid=${encodeURIComponent(id)}`} className="profile-card public-only-card">
  <div className="public-photo-frame">{p.photo?<img src={p.photo} alt={`Approved profile photograph for ${p.name}`}/>:<div className="public-placeholder"><Heart size={42}/></div>}</div>
  <div className="public-card-body"><h3>{p.name}</h3><span>Interested? Request a match <ArrowUpRight size={17}/></span></div>
 </Link>
}
