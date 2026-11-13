"use client";
import {useState} from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {sendPasswordResetEmail} from "firebase/auth";
import {doc,getDoc} from "firebase/firestore";
import {login,logout} from "@/lib/actions";
import {requireAuth,requireDb} from "@/lib/firebase";
import {useApp} from "@/components/providers";
import {FirebaseNotice,FriendlyError} from "@/components/alerts";
export default function LoginClient(){
 const router=useRouter();const {admin}=useApp();const [email,setEmail]=useState(""),[password,setPassword]=useState(""),[busy,setBusy]=useState(false),[err,setErr]=useState(""),[message,setMessage]=useState("");
 async function submit(e:React.FormEvent){e.preventDefault();setBusy(true);setErr("");try{
  const credential=await login(email.trim().toLowerCase(),password);
  const record=await getDoc(doc(requireDb(),"admins",credential.user.uid));
  if(!record.exists()){await logout();throw new Error("This account does not have administrator access.");}
  router.replace("/admin");
 }catch(e){setErr(e instanceof Error?e.message:"Sign-in failed.");}finally{setBusy(false);}}
 async function reset(){if(!email.trim()){setErr("Enter the administrator email first.");return;}setBusy(true);setErr("");try{await sendPasswordResetEmail(requireAuth(),email.trim().toLowerCase());}catch{}setMessage("If this administrator email exists, a reset message has been requested.");setBusy(false);}
 if(admin)return <section className="section"><div className="container narrow"><div className="empty-state"><h2>Administrator signed in</h2><Link className="btn btn-maroon" href="/admin">Open Admin Studio</Link></div></div></section>;
 return <section className="form-shell admin-login-page"><div className="container narrow"><div className="form-heading"><span className="eyebrow">PRIVATE OFFICE ACCESS</span><h1>Administrator sign in</h1><p>Secure access for authorized Married Nepal staff only.</p></div><FirebaseNotice/><form className="form-card" onSubmit={submit}><div className="field-grid"><label className="field full">Administrator email<input type="email" autoComplete="username" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="admin@example.com"/></label><label className="field full">Password<input type="password" autoComplete="current-password" required value={password} onChange={e=>setPassword(e.target.value)} placeholder="Enter your password"/></label></div>{err&&<FriendlyError message={err}/>} {message&&<div className="alert success">{message}</div>}<button type="submit" className="btn btn-maroon btn-full" disabled={busy}>{busy?"Verifying…":"Sign in securely"}</button><button type="button" className="subtle-button" onClick={()=>void reset()} disabled={busy}>Forgot password?</button><div className="secure-note">Administrator access is controlled by Firebase security rules.</div></form></div></section>;
}
