/** Content registry. Public copy and business facts are editable in Admin > Content studio.
 * Text has both languages; fallbacks keep the static-export SEO pages useful offline.
 */
export type CmsField = {key:string;section:string;label:string;en:string;np:string;multiline?:boolean};
export const cmsFields:CmsField[] = [
 {key:'header.tagline',section:'Header & navigation',label:'Header tagline',en:'Thoughtful connections. Lasting beginnings.',np:'अर्थपूर्ण परिचय, दीर्घकालीन सम्बन्ध।'},
 {key:'header.createProfile',section:'Header & navigation',label:'Create profile button',en:'Create profile',np:'प्रोफाइल बनाउनुहोस्'},
 {key:'home.eyebrow',section:'Homepage',label:'Hero small overline',en:'A MORE PERSONAL WAY TO FIND YOUR PERSON',np:'जीवनसाथीसँग अर्थपूर्ण सुरुवात'},
 {key:'home.primaryButton',section:'Homepage',label:'Hero main button',en:'Begin your journey',np:'आफ्नो यात्रा सुरु गर्नुहोस्'},
 {key:'home.secondaryButton',section:'Homepage',label:'Hero secondary button',en:'Explore profiles',np:'प्रोफाइलहरू हेर्नुहोस्'},
 {key:'home.privacyNote',section:'Homepage',label:'Privacy note under hero buttons',en:'Your private information stays private.',np:'तपाईंको निजी विवरण निजी नै रहन्छ।'},
 {key:'home.discoverTitle',section:'Homepage',label:'Search strip title',en:'DISCOVER YOUR MATCH',np:'जीवनसाथी खोज्नुहोस्'},
 {key:'home.discoverDescription',section:'Homepage',label:'Search strip explanation',en:'Only approved names & photographs are visible.',np:'नाम र स्वीकृत फोटो मात्र देखिन्छ।'},
 {key:'home.searchButton',section:'Homepage',label:'Search strip button',en:'Search profiles',np:'प्रोफाइल खोज्नुहोस्'},
 {key:'home.trustOne',section:'Homepage',label:'Trust item one',en:'Profiles reviewed by our team',np:'हाम्रो टोलीले समीक्षा गरेका प्रोफाइलहरू'},
 {key:'home.trustTwo',section:'Homepage',label:'Trust item two',en:'Privacy on your terms',np:'गोपनीयता तपाईंको नियन्त्रणमा'},
 {key:'home.trustThree',section:'Homepage',label:'Trust item three',en:'Made for Nepali connections',np:'नेपाली सम्बन्धका लागि'},
 {key:'home.subtitle',section:'Homepage',label:'Homepage supporting paragraph',en:'A respectful, confidential matrimonial matchmaking service for Nepali individuals and families.',np:'नेपाली व्यक्ति तथा परिवारका लागि सम्मानजनक र गोपनीय वैवाहिक परिचय सेवा।'},
 {key:'home.how',section:'Homepage',label:'How it works heading',en:'Your next chapter starts with a thoughtful introduction.',np:'तपाईंको नयाँ अध्याय एक अर्थपूर्ण परिचयबाट सुरु हुन्छ।'},
 {key:'home.advantages',section:'Homepage',label:'Benefits section heading',en:'Why choose Married Nepal?',np:'म्यारिड नेपाल किन रोज्ने?'},
 {key:'home.faq',section:'Homepage',label:'FAQ heading',en:'Frequently asked questions',np:'प्रायः सोधिने प्रश्नहरू'},
 {key:'home.cta',section:'Homepage',label:'Final call to action',en:'Ready to take the next step?',np:'नयाँ यात्राको सुरुवात गर्न तयार हुनुहुन्छ?'},
 {key:'about.title',section:'About',label:'About title',en:'Married Nepal Pvt. Ltd.',np:'म्यारिड नेपाल प्रा. लि.'},
 {key:'about.intro',section:'About',label:'About introduction',en:'A considered approach to marriage-focused introductions, built on respect, trust and individual choice.',np:'सम्मान, विश्वास र व्यक्तिगत निर्णयलाई आधार मानेर वैवाहिक परिचयको सेवा।',multiline:true},
 {key:'about.mission',section:'About',label:'Mission statement',en:'Help individuals and families explore compatible introductions with dignity and clear expectations.',np:'सम्मान र स्पष्ट अपेक्षासहित उपयुक्त वैवाहिक परिचयमा सहयोग गर्ने।',multiline:true},
 {key:'about.vision',section:'About',label:'Vision statement',en:'Make marriage-focused introductions more thoughtful, accessible and privacy-conscious across Nepal and beyond.',np:'नेपाल तथा विदेशमा अर्थपूर्ण, सहज र गोपनीय वैवाहिक परिचय विस्तार गर्ने।',multiline:true},
 {key:'fees.intro',section:'Services & fees',label:'Fees explanation',en:'Clear pricing for registration and post-marriage confirmation. Payments are collected only after the next steps are explained.',np:'दर्ता र विवाहपछि पुष्टि शुल्कको स्पष्ट विवरण। सबै सर्त बुझेर मात्र भुक्तानी गर्नुहोस्।',multiline:true},
 {key:'contact.title',section:'Contact',label:'Contact title',en:'Contact & office information',np:'सम्पर्क तथा कार्यालय विवरण'},
 {key:'contact.subtitle',section:'Contact',label:'Contact introduction',en:'Reach our team for questions about registration, profile review and matrimonial services.',np:'दर्ता, प्रोफाइल समीक्षा तथा वैवाहिक सेवासम्बन्धी जिज्ञासाका लागि सम्पर्क गर्नुहोस्।'},
 {key:'rules.intro',section:'Rules',label:'Rules introduction',en:'Respect, privacy, truthful information and mutual consent are essential for all members.',np:'सम्मान, गोपनीयता, सही विवरण र दुवै पक्षको सहमति सबै सदस्यका लागि आवश्यक छन्।'},
 {key:'registration.intro',section:'Registration',label:'Registration introduction',en:'Your submission is private and requires administrator review before any profile can be shown.',np:'तपाईंको विवरण गोप्य रहन्छ र कुनै प्रोफाइल देखाइनुअघि प्रशासकको स्वीकृति चाहिन्छ।'},
];
export const defaultFaq = [
 {qEn:'Will my details and photographs be published publicly?',qNp:'के मेरो विवरण र फोटो सार्वजनिक हुन्छ?',aEn:'Your confidential registration details stay restricted to you and authorized staff. Only your name and one administrator-approved photo may be displayed after your explicit consent and approval. No other personal details are made public.',aNp:'तपाईंको निजी दर्ता विवरण तपाईं र अधिकारप्राप्त कर्मचारीमा सीमित हुन्छ। स्वीकृति र तपाईंको स्पष्ट सहमतिपछि नाम र एउटा स्वीकृत फोटो मात्र सार्वजनिक हुन सक्छ। अन्य विवरण गोप्य रहन्छ।'},
 {qEn:'What happens after I register?',qNp:'दर्ता गरेपछि के हुन्छ?',aEn:'Your application appears in the administrator review queue. The team can approve it, reject it, or ask for corrections. Payment must be confirmed separately; submitting the form is not a receipt.',aNp:'तपाईंको आवेदन प्रशासकको समीक्षा सूचीमा जान्छ। आवश्यकताअनुसार स्वीकृत, अस्वीकृत वा सुधारका लागि अनुरोध गरिन्छ। भुक्तानी छुट्टै पुष्टि हुन्छ।'},
 {qEn:'How much is the registration fee?',qNp:'दर्ता शुल्क कति हो?',aEn:'The published schedule lists Rs. 2,000 for male applicants and Rs. 1,500 for female applicants. Confirm with the office before payment.',aNp:'प्रकाशित विवरणअनुसार पुरुषको रु. २,००० र महिलाको रु. १,५०० छ। भुक्तानी अघि कार्यालयसँग पुष्टि गर्नुहोस्।'},
 {qEn:'What is the post-marriage confirmation fee?',qNp:'विवाहपछिको पुष्टि शुल्क कति हो?',aEn:'The published post-marriage fee is Rs. 5,000 total, paid jointly by the couple after marriage is finalized (not Rs. 5,000 each).',aNp:'प्रकाशित शुल्कअनुसार विवाह निश्चित भएपछि दुवै जनाबाट संयुक्त रु. ५,००० लाग्छ (प्रति व्यक्ति होइन)।'},
 {qEn:'Who can register?',qNp:'कसले दर्ता गर्न सक्छ?',aEn:'Adults who are at least 20 years old, legally eligible to marry and seeking a marriage-focused relationship.',aNp:'कम्तीमा २० वर्ष पुगेका, कानुनी रूपमा विवाह गर्न योग्य र वैवाहिक सम्बन्ध खोजिरहेका व्यक्तिहरू।'},
];
export type FaqItem=(typeof defaultFaq)[number];
export const defaultFees={male:2000,female:1500,success:5000,currency:'NPR',notesEn:'The Rs. 5,000 confirmation fee is one combined amount payable by the couple after marriage, not Rs. 5,000 each.',notesNp:'विवाहपछिको रु. ५,००० दुवै जनाको संयुक्त शुल्क हो, प्रति व्यक्ति होइन।'};
export const defaultOffice={phone:'+9779740850390',email:'marriednepalofficial@gmail.com',addressEn:'Bhotang, Ward No. 3, Panchpokhari Thangpal Rural Municipality, Sindhupalchok, Nepal',addressNp:'भोताङ, वडा नं. ३, पाँचपोखरी थाङपाल गाउँपालिका, सिन्धुपाल्चोक, नेपाल',hoursEn:'Sunday – Friday · 10:00 AM – 6:00 PM',hoursNp:'आइतबार – शुक्रबार · बिहान १० देखि साँझ ६ बजेसम्म'};
