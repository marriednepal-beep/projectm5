# Married Nepal V8 — नेपाली सेटअप निर्देशिका

यो ZIP भित्रको **वेबसाइटको source code** मात्र GitHub repository मा अपलोड गर्नुहोस्। `node_modules`, `.next`, `out`, `.env.local` अपलोड नगर्नुहोस्।

## स्थानीय परीक्षण
1. Node.js 22 स्थापना गर्नुहोस्।
2. नयाँ फोल्डरमा ZIP extract गर्नुहोस्।
3. PowerShell मा `npm install` अनि `npm run dev` चलाउनुहोस्।
4. `http://localhost:3000` खोल्नुहोस् (पुरानो Python संस्करणको 8000 होइन)।

## Firebase
- Project: `marriednepal-282f5`।
- Firebase Authentication मा **Email/Password** (admin को लागि) र **Anonymous** (ग्राहकले पासवर्ड नराखी फाराम बुझाउनको लागि) दुवै enable गर्नुहोस्।
- Firestore → Rules मा `firestore.rules` को पूरा सामग्री paste गरेर **Publish** गर्नुहोस्।
- Admin account `admin@marriednepal.com` को सही Firebase UID पहिचान गरेर Firestore मा `admins/{uid}` document सिर्जना गर्नुहोस्; `role = owner` राख्नुहोस्। UID नमिले admin खुल्दैन।
- Client/आवेदकको login छैन। उनीहरूले ६ चरणको फाराम भरेर फोटो र आवश्यक भए रसिद पठाउँछन्।

## Admin Panel
`/login` बाट admin sign-in गरेपछि `/admin` मा Profile Requests, फोटो स्वीकृति, रसिद, inquiries, वेबसाइट content, FAQs, शुल्क, सम्पर्क, लोगो, background र Theme Library व्यवस्थापन गर्न सकिन्छ। **Restore original design** ले पुरानो cream, maroon र gold रङ फर्काउँछ।

## Deploy
GitHub मा private repository खोल्नुहोस्, source फाइलहरू upload गर्नुहोस्। Vercel मा repository import गरी `.env.example` का सार्वजनिक Firebase variables Environment Variables मा राख्नुहोस्। DNS/domain जोड्ने क्रममा Vercel ले देखाएको सही record मात्र प्रयोग गर्नुहोस्। Authentication → Authorized domains मा प्रयोग भएका domain हरू थप्नुहोस्।

**नोट:** Vercel को Hobby plan व्यवसायिक production website का लागि अनुमति प्राप्त छैन। सबै कुरा निःशुल्क चलाउने हो भने Firebase Hosting Spark जस्ता अनुमति प्राप्त विकल्प जाँच्नुहोस्। Firebase Storage Spark मा उपलब्ध छैन, त्यसैले यो संस्करणले साना compressed image Firestore मा राख्छ।

## जरुरी परीक्षण
वास्तविक मानिसको निजी विवरण लिनुअघि नयाँ registration test गर्नुहोस्, admin को पूरा विवरण हेर्न सक्ने पुष्टि गर्नुहोस्, अनि स्वीकृत नाम र एउटा फोटो बाहेक अरू कुनै field public नदेखिने जाँच गर्नुहोस्। Rules Emulator र abuse-prevention समीक्षा आवश्यक छ।

विस्तृत अंग्रेजी मार्गदर्शन: **DEPLOY-AND-TEST.md**।
