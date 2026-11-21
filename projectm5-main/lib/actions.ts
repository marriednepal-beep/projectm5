"use client";
import {signInAnonymously,signInWithEmailAndPassword,signOut} from 'firebase/auth';
import {doc,getDoc,setDoc,updateDoc,deleteDoc,writeBatch,serverTimestamp,getDocs,collection,query,limit} from 'firebase/firestore';
import {requireAuth,requireDb} from '@/lib/firebase';
import type {Member,Profile,ApplicationDetails,PublicProfile,Photo,PhotoItem,PaymentProof,MatchInquiry} from '@/lib/types';

/** All registration records are written together, with photos and receipts in separate restricted documents. */
export async function submitRegistration(member:Omit<Member,'uid'>,profile:Omit<Profile,'ownerUid'|'createdAt'|'updatedAt'>,application:Omit<ApplicationDetails,'uid'|'createdAt'|'updatedAt'>,images:string[],consent:boolean,proof?:{imageData:string;method:string;reference:string}){
 if(images.length<1||images.length>3)throw new Error('Select one to three clear photographs.');
 if(images.some(x=>x.length>175000||!x.startsWith('data:image/jpeg;base64,')))throw new Error('Please select smaller JPEG photos.');
 if(proof&&proof.imageData.length>175000)throw new Error('Payment voucher is too large.');
 const auth=requireAuth(),db=requireDb();
 if(auth.currentUser && !auth.currentUser.isAnonymous)throw new Error('Administrator account is signed in. Sign out to register a new applicant.');
 // A temporary anonymous Firebase session is created silently; visitors never need an account/password.
 // A fresh identity per registration prevents overwriting a previous submission.
 if(auth.currentUser?.isAnonymous)await signOut(auth);
 const cred=await signInAnonymously(auth);const uid=cred.user.uid;const code=`MN-${uid.slice(0,7).toUpperCase()}`;
 const batch=writeBatch(db);
 batch.set(doc(db,'members',uid),{...member,uid,email:member.email.trim().toLowerCase(),createdAt:serverTimestamp()});
 batch.set(doc(db,'profiles',uid),{...profile,ownerUid:uid,code,status:'pending',visibility:'hidden',createdAt:serverTimestamp(),updatedAt:serverTimestamp()});
 batch.set(doc(db,'applications',uid),{...application,uid,feeStatus:proof?'submitted':'unpaid',createdAt:serverTimestamp(),updatedAt:serverTimestamp()});
 batch.set(doc(db,'profilePhotos',uid),{ownerUid:uid,images:images.map(imageData=>({imageData,reviewStatus:'pending'})),updatedAt:serverTimestamp()});
 batch.set(doc(db,'publicationConsents',uid),{ownerUid:uid,consent,updatedAt:serverTimestamp()});
 if(proof)batch.set(doc(db,'paymentProofs',uid),{ownerUid:uid,...proof,createdAt:serverTimestamp()});
 try{await batch.commit();}catch(e){throw e;}
 return {uid,code};
}
export const login=(email:string,password:string)=>signInWithEmailAndPassword(requireAuth(),email.trim().toLowerCase(),password);
export const logout=()=>signOut(requireAuth());
async function load<T>(collectionName:string,uid:string):Promise<T|null>{const snap=await getDoc(doc(requireDb(),collectionName,uid));return snap.exists()?snap.data() as T:null;}
export const getMyProfile=(uid:string)=>load<Profile>('profiles',uid);
export const getMyMember=(uid:string)=>load<Member>('members',uid);
export const getMyApplication=(uid:string)=>load<ApplicationDetails>('applications',uid);
export const getMyPhotos=(uid:string)=>load<Photo>('profilePhotos',uid);
export const getMyConsent=(uid:string)=>load<{consent:boolean}>('publicationConsents',uid);
export const getMyPaymentProof=(uid:string)=>load<PaymentProof>('paymentProofs',uid);
export async function listApprovedProfiles(){const docs=await getDocs(query(collection(requireDb(),'publicProfiles'),limit(100)));return docs.docs.map(d=>({id:d.id,...d.data() as PublicProfile}));}
/** A copy of ONLY name and one approved photo is released to publicProfiles after separate approvals and consent. */
export async function adminPublishProfile(uid:string){
 const db=requireDb();const [profile,member,consent,photos]=await Promise.all([getMyProfile(uid),getMyMember(uid),getMyConsent(uid),getMyPhotos(uid)]);
 if(!profile||profile.status!=='approved')throw new Error('Approve the application first.');
 if(!member?.fullName?.trim())throw new Error('A name is required before publication.');
 if(!consent?.consent)throw new Error('The member has not consented to public name/photo display.');
 const image=photos?.images.find(x=>x.reviewStatus==='approved')?.imageData;
 if(!image)throw new Error('At least one photo must be approved before publication.');
 const batch=writeBatch(db);batch.update(doc(db,'profiles',uid),{visibility:'public',updatedAt:serverTimestamp()});
 batch.set(doc(db,'publicProfiles',uid),{name:member.fullName.trim(),photo:image});await batch.commit();
}
/** Any privacy-impacting review change removes the public copy atomically. */
export async function adminChangeProfile(uid:string,status:Profile['status'],reason=''){
 const db=requireDb(),batch=writeBatch(db);batch.delete(doc(db,'publicProfiles',uid));
 batch.update(doc(db,'profiles',uid),{status,visibility:'hidden',rejectionReason:reason.slice(0,500),updatedAt:serverTimestamp()});await batch.commit();
}
export async function adminHideProfile(uid:string){const db=requireDb(),batch=writeBatch(db);batch.delete(doc(db,'publicProfiles',uid));batch.update(doc(db,'profiles',uid),{visibility:'hidden',updatedAt:serverTimestamp()});await batch.commit();}
export async function adminReviewPhoto(uid:string,index:number,status:PhotoItem['reviewStatus']){
 const db=requireDb(),photo=await getMyPhotos(uid);if(!photo||!photo.images[index])throw new Error('Photo not found.');
 const images=photo.images.map((x,i)=>i===index?{...x,reviewStatus:status}:x);
 const batch=writeBatch(db);batch.delete(doc(db,'publicProfiles',uid));batch.update(doc(db,'profiles',uid),{visibility:'hidden',updatedAt:serverTimestamp()});batch.update(doc(db,'profilePhotos',uid),{images,updatedAt:serverTimestamp()});await batch.commit();
}
export async function adminUploadPhoto(uid:string,imageData:string){
 const db=requireDb(),current=await getMyPhotos(uid);
 if((current?.images.length||0)>=3)throw new Error('Maximum three photographs. Remove an old one first.');
 const batch=writeBatch(db);batch.delete(doc(db,'publicProfiles',uid));
 batch.update(doc(db,'profiles',uid),{visibility:'hidden',updatedAt:serverTimestamp()});
 batch.set(doc(db,'profilePhotos',uid),{ownerUid:uid,images:[...(current?.images||[]),{imageData,reviewStatus:'pending'}],updatedAt:serverTimestamp()});await batch.commit();
}
export async function adminRemovePhoto(uid:string,index:number){
 const db=requireDb(),current=await getMyPhotos(uid);if(!current?.images[index])throw new Error('Photograph not found.');
 const images=current.images.filter((_,i)=>i!==index),batch=writeBatch(db);
 batch.delete(doc(db,'publicProfiles',uid));batch.update(doc(db,'profiles',uid),{visibility:'hidden',updatedAt:serverTimestamp()});
 if(images.length)batch.update(doc(db,'profilePhotos',uid),{images,updatedAt:serverTimestamp()});else batch.delete(doc(db,'profilePhotos',uid));
 await batch.commit();
}
export async function adminEditApplication(uid:string,data:Partial<ApplicationDetails>){
 const safe={...data};delete safe.uid;delete safe.createdAt;
 await updateDoc(doc(requireDb(),'applications',uid),{...safe,updatedAt:serverTimestamp()});
}
/** Changing name requires withdrawing the public copy; admin can republish afterwards. */
export async function adminEditMember(uid:string,details:Partial<Member>){
 const db=requireDb(),batch=writeBatch(db);batch.delete(doc(db,'publicProfiles',uid));
 batch.update(doc(db,'profiles',uid),{visibility:'hidden',updatedAt:serverTimestamp()});
 batch.update(doc(db,'members',uid),{...details,uid:uid,updatedAt:serverTimestamp()});await batch.commit();
}
/** Delete every Firestore record, but Firebase Auth user removal must be performed in console or trusted server. */
export async function adminDeleteProfileData(uid:string){
 const db=requireDb(),batch=writeBatch(db);
 for(const path of ['publicProfiles','profilePhotos','paymentProofs','publicationConsents','applications','members','profiles'])batch.delete(doc(db,path,uid));
 await batch.commit();
}
async function ensurePublicSubmissionSession(){const auth=requireAuth();if(!auth.currentUser)await signInAnonymously(auth);}
export async function submitMatchInquiry(data:{name:string;phone:string;email:string;preference:string;targetUid?:string;consent:boolean}){
 if(!data.consent)throw new Error('Please give consent for the office to contact you.');
 const db=requireDb(),id=crypto.randomUUID();
 await ensurePublicSubmissionSession();
 await setDoc(doc(db,'matchmakingInquiries',id),{name:data.name.trim(),phone:data.phone.trim(),email:data.email.trim(),preference:data.preference.trim(),targetUid:data.targetUid||'',consent:true,status:'new',createdAt:serverTimestamp()});
 return id;
}
export async function withdrawPublicConsent(uid:string){
 const db=requireDb();await deleteDoc(doc(db,'publicProfiles',uid));
 await updateDoc(doc(db,'publicationConsents',uid),{consent:false,updatedAt:serverTimestamp()});
}
export async function grantPublicConsent(uid:string){await updateDoc(doc(requireDb(),'publicationConsents',uid),{consent:true,updatedAt:serverTimestamp()});}
export async function updateOwnPhotos(uid:string,images:string[]){
 if(images.length<1||images.length>3)throw new Error('Upload one to three photos.');
 const db=requireDb();await withdrawPublicConsent(uid);
 await setDoc(doc(db,'profilePhotos',uid),{ownerUid:uid,images:images.map(imageData=>({imageData,reviewStatus:'pending'})),updatedAt:serverTimestamp()});
}
export async function updateMyProfile(uid:string,data:Partial<Profile>){
 const db=requireDb();await deleteDoc(doc(db,'publicProfiles',uid));const keys=['gender','district','education','occupation','maritalStatus','about','height','partnerAgeMin','partnerAgeMax'];
 const safe:Record<string,unknown>={status:'pending',visibility:'hidden',updatedAt:serverTimestamp()};for(const key of keys)if((data as Record<string,unknown>)[key]!==undefined)safe[key]=(data as Record<string,unknown>)[key];
 await updateDoc(doc(db,'profiles',uid),safe);
}
export async function compressPhoto(file:File):Promise<string>{
 if(!/^image\/(jpeg|png|webp)$/.test(file.type))throw new Error('Use a JPG, PNG or WebP image.');
 if(file.size>12_000_000)throw new Error('Image exceeds the 12 MB upload limit.');
 const objectUrl=URL.createObjectURL(file);
 try{const img=await new Promise<HTMLImageElement>((resolve,reject)=>{const i=new Image();i.onload=()=>resolve(i);i.onerror=()=>reject(new Error('Could not read the selected image.'));i.src=objectUrl;});
  for(const maxDim of [800,680,560,440,320]){const scale=Math.min(1,maxDim/Math.max(img.width,img.height));const canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.round(img.width*scale));canvas.height=Math.max(1,Math.round(img.height*scale));const ctx=canvas.getContext('2d');if(!ctx)throw new Error('Canvas unavailable');ctx.fillStyle='#fff';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(img,0,0,canvas.width,canvas.height);
   for(const quality of [.78,.65,.53,.4,.28]){const data=canvas.toDataURL('image/jpeg',quality);if(data.length<170000)return data;}}
  throw new Error('This photograph could not be compressed to the free-plan size limit.');
 }finally{URL.revokeObjectURL(objectUrl);}
}
export async function compressSiteImage(file:File,maxChars=190000,transparent=false):Promise<string>{
 if(!/^image\/(jpeg|png|webp)$/.test(file.type))throw new Error('Use JPG, PNG or WebP.');if(file.size>12_000_000)throw new Error('Image must be under 12 MB.');
 const url=URL.createObjectURL(file);try{const img=await new Promise<HTMLImageElement>((resolve,reject)=>{const x=new Image();x.onload=()=>resolve(x);x.onerror=()=>reject(new Error('Invalid image'));x.src=url;});
 for(const dim of [960,720,540,400,280,180,120]){const scale=Math.min(1,dim/Math.max(img.width,img.height));const c=document.createElement('canvas');c.width=Math.max(1,Math.round(img.width*scale));c.height=Math.max(1,Math.round(img.height*scale));const ctx=c.getContext('2d');if(!ctx)throw new Error('Image conversion unavailable');if(!transparent){ctx.fillStyle='#fffdf8';ctx.fillRect(0,0,c.width,c.height);}ctx.drawImage(img,0,0,c.width,c.height);for(const q of [.79,.66,.52,.4,.28]){const result=c.toDataURL('image/webp',q);if(result.length<maxChars)return result;}}throw new Error('Could not compress image to Firestore limit.');
 }finally{URL.revokeObjectURL(url);}
}
