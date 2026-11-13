export type Moderation = 'pending' | 'approved' | 'rejected' | 'suspended';
export type Profile = {
 ownerUid:string; code:string; status:Moderation; visibility:'hidden'|'public';
 gender:string; age:number; district:string; education:string; occupation:string;
 maritalStatus:string; about:string; height?:string; partnerAgeMin:number; partnerAgeMax:number;
 rejectionReason?:string; createdAt?:unknown; updatedAt?:unknown;
};
export type PublicProfile = {name:string;photo:string}; // NO private fields, even in source document.
export type Member = {uid:string;email:string;fullName:string;phone:string;dateOfBirth:string;city?:string;country?:string;language?:string;createdAt?:unknown};
export type ApplicationDetails = {
 uid:string;fullName:string;gender:string;maritalStatus:string;religion:string;community:string;
 motherTongue:string;education:string;occupation:string;workDetails:string;monthlyIncome:string;
 permanentAddress:string;temporaryAddress:string;familyDetails:string;district:string;city:string;country:string;
 partnerPreferences:string;partnerAgeMin:number;partnerAgeMax:number;preferredEducation:string;preferredLocation:string;
 email:string;phone:string;whatsappNumber:string;guardianContact:string;paymentMethod:string;
 paymentReference:string;consentWhatsapp:boolean;feeDue:number;feeStatus:'unpaid'|'submitted'|'paid'|'waived'|'rejected';
 createdAt?:unknown;updatedAt?:unknown;
};
export type PhotoItem = {imageData:string;reviewStatus:'pending'|'approved'|'rejected'};
export type Photo = {ownerUid:string;images:PhotoItem[];updatedAt?:unknown};
export type PaymentProof = {ownerUid:string;imageData:string;method:string;reference:string;createdAt?:unknown};
export type MatchInquiry = {id:string;name:string;phone:string;email:string;preference:string;targetUid:string;consent:boolean;status:'new'|'contacted'|'closed';createdAt?:unknown};
export type FieldSettings = {en:string;np:string;required:boolean;enabled:boolean;options?:string[]};
export type PaymentOption = {enabled:boolean;name:string;account:string;branch:string;instructionsEn:string;instructionsNp:string};
export type SiteConfig = {
 content?:Record<string,{en:string;np:string}>;
 faq?:{qEn:string;qNp:string;aEn:string;aNp:string}[];
 fees?:{male:number;female:number;success:number;currency:string;notesEn:string;notesNp:string};
 office?:{phone:string;email:string;addressEn:string;addressNp:string;hoursEn:string;hoursNp:string};
 logoImage?:string;faviconImage?:string;aboutImage?:string;registrationImage?:string;contactImage?:string;
 paymentQrImage?:string;esewaQrImage?:string;khaltiQrImage?:string;bankQrImage?:string;
 seoTitle?:string;seoDescription?:string;registrationFeeEnabled?:boolean;themePreset?:'original'|'classic'|'golden'|'sage';
 paymentInstructionsEn?:string;paymentInstructionsNp?:string;
 paymentOptions?:Record<string,PaymentOption>;
 requirePaymentProof?:boolean;
 waInquiryTemplate?:string;
 registrationFields?:Record<string,FieldSettings>;
 heroImage?:string;heroHeadlineEn?:string;heroHeadlineNp?:string;heroBodyEn?:string;heroBodyNp?:string;
 accent?:string;maroon?:string;whatsapp?:string;facebook?:string;tiktok?:string;youtube?:string;
};
