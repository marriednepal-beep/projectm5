import type {FieldSettings,PaymentOption} from './types';
/** Content-management schema for all displayed registration fields. Locked fields can't be disabled or made optional. */
export const fields:{key:string;section:string;en:string;np:string;required:boolean;locked?:boolean;options?:string[]}[]=[
 {key:'fullName',section:'Personal Details',en:'Full Name',np:'पूरा नाम',required:true,locked:true},
 {key:'gender',section:'Personal Details',en:'Gender',np:'लिङ्ग',required:true,locked:true,options:['Male','Female','Other / prefer not to say']},
 {key:'dateOfBirth',section:'Personal Details',en:'Date of Birth (A.D.)',np:'जन्म मिति (ई.सं.)',required:true,locked:true},
 {key:'maritalStatus',section:'Personal Details',en:'Marital Status',np:'वैवाहिक अवस्था',required:true,options:['Never married','Divorced','Widowed','Separated']},
 {key:'height',section:'Personal Details',en:'Height',np:'उचाइ',required:false},
 {key:'religion',section:'Personal Details',en:'Religion',np:'धर्म',required:false,options:['Hindu','Buddhist','Kirat','Muslim','Christian','Other','Prefer not to say']},
 {key:'community',section:'Personal Details',en:'Caste / Community',np:'जात/समुदाय',required:false},
 {key:'motherTongue',section:'Personal Details',en:'Mother Tongue',np:'मातृभाषा',required:false},
 {key:'education',section:'Education & Work',en:'Highest Education',np:'उच्चतम शैक्षिक योग्यता',required:true},
 {key:'occupation',section:'Education & Work',en:'Profession / Occupation',np:'पेशा/व्यवसाय',required:true},
 {key:'monthlyIncome',section:'Education & Work',en:'Monthly Income Range',np:'मासिक आय दायरा',required:false},
 {key:'workDetails',section:'Education & Work',en:'Work Details',np:'कामको विवरण',required:false},
 {key:'permanentAddress',section:'Address & Family',en:'Permanent Address',np:'स्थायी ठेगाना',required:true},
 {key:'temporaryAddress',section:'Address & Family',en:'Current Address',np:'हालको ठेगाना',required:true},
 {key:'district',section:'Address & Family',en:'District',np:'जिल्ला',required:false},
 {key:'city',section:'Address & Family',en:'City / Municipality',np:'सहर/नगरपालिका',required:false},
 {key:'country',section:'Address & Family',en:'Current Country',np:'हालको देश',required:false},
 {key:'familyDetails',section:'Address & Family',en:'Family Background',np:'पारिवारिक विवरण',required:false},
 {key:'partnerAgeMin',section:'Partner Preferences',en:'Preferred Minimum Age',np:'रुचाइएको न्यूनतम उमेर',required:false},
 {key:'partnerAgeMax',section:'Partner Preferences',en:'Preferred Maximum Age',np:'रुचाइएको अधिकतम उमेर',required:false},
 {key:'preferredEducation',section:'Partner Preferences',en:'Preferred Education',np:'रुचाइएको शिक्षा',required:false},
 {key:'preferredLocation',section:'Partner Preferences',en:'Preferred Location / Settlement',np:'रुचाइएको स्थान/बसोबास',required:false},
 {key:'partnerPreferences',section:'Partner Preferences',en:'Specific Expectations or Values',np:'अपेक्षा वा मूल्य मान्यता',required:false},
 {key:'about',section:'Partner Preferences',en:'A Short Introduction (Private)',np:'आफ्नो छोटो परिचय (गोप्य)',required:false},
 {key:'phone',section:'Contact & Photos',en:'Mobile Phone Number',np:'मोबाइल नम्बर',required:true,locked:true},
 {key:'whatsappNumber',section:'Contact & Photos',en:'WhatsApp Number',np:'ह्वाट्सएप नम्बर',required:false},
 {key:'email',section:'Contact & Photos',en:'Email Address',np:'इमेल ठेगाना',required:true,locked:true},
 {key:'guardianContact',section:'Contact & Photos',en:'Alternate Family Contact',np:'वैकल्पिक पारिवारिक सम्पर्क',required:false},
 {key:'photos',section:'Contact & Photos',en:'Recent Clear Photos (1 to 3)',np:'स्पष्ट फोटो (१ देखि ३)',required:true,locked:true},
 {key:'paymentMethod',section:'Fee Payment',en:'Payment Method',np:'भुक्तानी माध्यम',required:false},
 {key:'paymentReference',section:'Fee Payment',en:'Transaction / Reference Number',np:'कारोबार/सन्दर्भ नम्बर',required:false},
 {key:'paymentProof',section:'Fee Payment',en:'Payment Proof / Voucher',np:'भुक्तानी रसिद',required:false},
];
export function effectiveField(key:string, overrides?:Record<string,FieldSettings>):FieldSettings {
 const orig=fields.find(x=>x.key===key)!;
 if(!orig)return {en:key,np:key,required:false,enabled:true};
 const next=overrides?.[key];
 return {en:next?.en || orig.en,np:next?.np || orig.np,required:orig.locked?true:next?.required??orig.required,enabled:orig.locked?true:next?.enabled??true,options:next?.options??orig.options};
}
// Account details were supplied by the owner through their reference screenshots.
// There is deliberately NO built-in QR; only an image uploaded by an authenticated
// administrator to siteAssets/{esewaQrImage,khaltiQrImage,bankQrImage} is displayed.
export const defaultPaymentOptions:Record<string,PaymentOption>={
 esewa:{enabled:true,name:'Married Nepal Pvt. Ltd.',account:'9801234567',branch:'',instructionsEn:'Check the recipient name before transferring. Keep your transaction receipt for review.',instructionsNp:'रकम पठाउनु अघि खातावालाको नाम जाँच्नुहोस्। भुक्तानी रसिद सुरक्षित राख्नुहोस्।'},
 khalti:{enabled:true,name:'Married Nepal Pvt. Ltd.',account:'9801234567',branch:'',instructionsEn:'Check the recipient name before transferring. Keep your transaction receipt for review.',instructionsNp:'रकम पठाउनु अघि खातावालाको नाम जाँच्नुहोस्। भुक्तानी रसिद सुरक्षित राख्नुहोस्।'},
 bank:{enabled:true,name:'Married Nepal Pvt. Ltd.',account:'01201017500123',branch:'Nabil Bank Ltd. · New Baneshwor, Kathmandu',instructionsEn:'Transfer only after confirming the beneficiary and save the payment voucher.',instructionsNp:'लाभग्राही पुष्टि गरेपछि मात्र रकम पठाउनुहोस् र भुक्तानी भौचर सुरक्षित राख्नुहोस्।'}
};
