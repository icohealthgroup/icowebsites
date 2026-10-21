/* ============================================================
   Balwyn Central Medical | ICO Health Group
   Shared data model - single source of truth for
   find-care.html, services.html, fees.html and doctors.html
   Fee schedule effective 1 July 2026.
   ============================================================ */

const BOOK_URL = "https://balwyncentralmedical.com.au/balwyn-central-medical-booking/";

/* Billing policy effective 1 July 2026 */
const FEES_EFFECTIVE = "1 July 2026";
const BILLING_POLICY = {
  weekday: "$42",
  saturday: "$50",
  sunday: "$55",
  noShow: "$40",
  bulkBilled: "Concession cardholders and children 15 and under are bulk billed on weekdays."
};

/* Doctors: from balwyncentralmedical.com.au (Doctors @ 427 / @ 411) and the practice's HotDoc
   profiles, checked 22 Oct 2026. Interests for Firth, Hashemi and Dr J Srishanmuganathan
   (no HotDoc interests listed) are kept from the practice appointment preferences.
   role: "General practitioner" or "GP registrar". hours: optional note when a doctor splits sites. */
const DOCTORS = [
  {id:"saadatian", photo:"images/doctors/saadatian.jpg", name:"Dr Siavash Saadatian", role:"General practitioner", quals:"FRACGP, MD, AMC", sites:["427"], telehealth:true,
    interests:["Mental health","Skin checks","Excisions & biopsies","Children's health","Chronic disease management","Diabetes"], languages:["Persian (Farsi)"],
    bio:"Dr Saadatian (Sia) trained in Iran and has worked in Australian general practice since 2013. His interests include mental health, skin cancer, children's health and chronic disease management, particularly diabetes.",
    procedures:["implanon","iud","skin","biopsy","excision","toenail","minor"]},
  {id:"firth", photo:"images/doctors/firth.jpg", name:"Dr Katherine Firth", role:"General practitioner", quals:"MBBS, DCH, FRACGP, MMed", sites:["427"], telehealth:true,
    interests:["Women's health","Child health","Skin cancer medicine","Minor procedures","Antenatal shared care"], languages:[],
    bio:"Dr Firth has been a specialist GP since 2014, working on the Central Coast of New South Wales and, since 2018, in Melbourne. She enjoys seeing patients of all ages, has postgraduate training in child health and a Masters of Medicine, and is an examiner for the RACGP.",
    procedures:["implanon","iud","iron","skin","biopsy","excision","minor"]},
  {id:"sivanesan", photo:"images/doctors/sivanesan.jpg", name:"Dr Sathiya Sivanesan", role:"General practitioner", quals:"MBBS, FRACGP", sites:["427"], telehealth:true,
    interests:["Mental health","Minor procedures","Ingrown toenails","Chronic disease management","Children's health"], languages:["Tamil","Lithuanian"],
    bio:"Dr Sivanesan (Sathi) has more than 15 years of medical experience, from rural and remote medicine to trauma, GP anaesthetics and intensive care, and became a Fellow of the RACGP in 2017. He enjoys mental health care, minor procedures including ingrown toenails, chronic disease management and children's health.",
    procedures:["implanon","toenail","iron","skin","biopsy","excision","minor"]},
  {id:"patel", photo:"images/doctors/patel.jpg", name:"Dr Nisha Patel", role:"General practitioner", quals:"MBBS, FRACGP", sites:["427"], telehealth:true,
    interests:["Children's health","Women's health","Sexual health","Implanon & contraception","Cervical screening"], languages:[],
    bio:"Dr Patel is a UK-trained GP with experience in community general practice, emergency and school settings. She holds postgraduate diplomas in child, women's, sexual and occupational health, and teaches University of Melbourne medical students at the clinic.",
    procedures:["implanon","iud","minor"]},
  {id:"kamale", photo:"images/doctors/kamale.jpg", name:"Dr Avinash Kamale", role:"General practitioner", quals:"MBBS, DOMS, DPD (UK), FRACGP", sites:["427","411"], hours:"Weekdays at 411, weekends at 427", telehealth:true,
    interests:["Skin cancers & mole checks","Excisions & biopsies","Men's health","Travel medicine","General family health"], languages:["Hindi","Marathi"],
    bio:"Dr Kamale (Avi) is a Fellow of the RACGP with Victorian hospital experience in emergency, general medicine, surgery and orthopaedics. His interests include family health, travel medicine and skin, including skin cancer and mole checks, and he performs minor skin surgery on site.",
    procedures:["toenail","skin","biopsy","excision","minor"]},
  {id:"vlam", photo:"images/doctors/vlam.jpg", name:"Dr Vincent Lam", role:"General practitioner", quals:"MD, BMedSt, FRACGP", sites:["427"], telehealth:true,
    interests:["General family health","WorkCover medicine","Men's health","Paediatrics"], languages:[],
    bio:"Dr Vincent Lam (Dr Vinny) is a Fellow of the RACGP. He graduated from Bond University in 2020 and has worked in hospitals and clinics on the Gold Coast, in Sydney and in Melbourne. He enjoys family health, WorkCover medicine, men's health and paediatrics.",
    procedures:[]},
  {id:"lam", photo:"images/doctors/lam.jpg", name:"Dr Winston Lam", role:"General practitioner", quals:"MD, BBiomed", sites:["427","411"], hours:"Weekdays at 411, weekends at 427", telehealth:true,
    interests:["Pattern hair loss management","Biostimulators - Rejuran (salmon polynucleotides)","Wrinkle and fine lines management"], languages:[],
    bio:"Dr Winston Lam is a Specialist General Practitioner with an interest in non-surgical cosmetic procedures, committed to delivering the highest quality care across all aspects of general practice. Dr Winston Lam completed his Bachelor of Biomedicine in 2014 and Doctor of Medicine in 2018 at The University of Melbourne. He is a Fellow of The Royal Australian College of General Practitioners and is certified by the Australian Health Practitioner Regulation Agency. Dr Winston Lam offers a comprehensive and personalised approach to address your specific needs with an emphasis on safety and evidence-based practice.",
    procedures:["minor"]},
  {id:"alfayadh", photo:"images/doctors/alfayadh.jpg", name:"Dr Naba Alfayadh", role:"GP registrar", quals:"MBBS (Hons), BMedSci (Hons), SCHP", sites:["427"], telehealth:true,
    interests:["Mental health","Paediatrics","Women's health","Chronic disease management"], languages:[],
    bio:"Dr Alfayadh studied medicine at Monash University and worked for several years in adult and paediatric emergency medicine before choosing general practice. She is especially interested in mental health, paediatrics, women's health and chronic disease management. Dr Alfayadh has extra training in mental health and Internal Family Systems (IFS), and offers longer consultations to support physical, mental and social wellbeing over the long term. If you're interested, please book an initial consultation to see if this is a good fit for you. IFS mental health consultations cost $350, with approximately $202 rebated by Medicare.",
    procedures:[]},
  {id:"burdick", photo:"images/doctors/burdick.jpg", name:"Dr Christine Burdick", role:"GP registrar", quals:"BN, Grad Cert Child Health, MD", sites:["427"], telehealth:true,
    interests:["Chronic disease management","Women's health","Paediatrics"], languages:[],
    bio:"Dr Burdick graduated from the University of Notre Dame Australia in 2019, trained at St Vincent's Hospital Melbourne and most recently worked in adult and paediatric emergency at Casey Hospital. She has a Graduate Certificate in Child Health and enjoys chronic disease care, women's health and paediatrics.",
    procedures:[]},
  {id:"hodgson", photo:"images/doctors/hodgson.jpg", name:"Dr Martin Hodgson", role:"General practitioner", quals:"MBBS, GradDipOccH, DipDHM", sites:["411"], telehealth:true,
    interests:["Sports medicine","Wound care","Child health","Mental health"], languages:[],
    bio:"Dr Hodgson has more than 30 years of medical experience, including 20 years directing hyperbaric medicine units that treat complex wounds. He has a particular interest in musculoskeletal injuries, wound care, mental health and children's health.",
    procedures:["minor"]},
  {id:"zhang", photo:"images/doctors/zhang.jpg", name:"Dr Wilson Zhang", role:"General practitioner", quals:"MBBS, BMedSci, DCH, FRACGP", sites:["411"], telehealth:true,
    interests:["Medical acupuncture","Warm moxibustion","Implanon insertion & removal"], languages:["Mandarin"],
    bio:"Dr Zhang graduated from the University of Melbourne in 2010 and has worked in general practice since 2014. He has a particular interest in medical acupuncture and warm moxibustion.",
    procedures:["acupuncture","implanon","minor"]},
  {id:"tennakoon", photo:"images/doctors/tennakoon.jpg", name:"Dr Hasanthi Tennakoon", role:"General practitioner", quals:"MBBS, DCH, FRACGP", sites:["411"], telehealth:true,
    interests:["General medicine","Geriatrics","Women's health","Children's health","Chronic disease management","Menopause care"], languages:[],
    bio:"Dr Tennakoon is a Fellow of the RACGP with a Diploma of Child Health. She worked at the Austin and Northern hospitals and trained as a GP registrar in Shepparton and regional Victoria. Her interests include general and geriatric medicine, women's and children's health, chronic disease and menopause care, and she performs Implanon insertion and removal.",
    procedures:["implanon","minor"]},
  {id:"lui", photo:"images/doctors/lui.jpg", name:"Dr Stephen Lui", role:"GP registrar", quals:"MD", sites:["411"], telehealth:true,
    interests:["General medicine","Chronic disease management","Mental health","Paediatrics"], languages:["Cantonese (conversational)"],
    bio:"Dr Lui completed his medical degree at Macquarie University in 2021 and has worked at Sunshine, Footscray, Hornsby and Northern Beaches hospitals. He enjoys all aspects of general practice, especially chronic disease care, mental health and paediatrics.",
    procedures:[]}
];

/* Procedures - fees from the master procedures fee table (out-of-pocket, full fee) */
const PROCEDURES = [
  {id:"implanon", name:"Implanon (contraceptive implant)", cat:"Women's health",
    docs:["firth","sivanesan","saadatian","patel","zhang","tennakoon"],
    fees:[["Insertion","$47.73","$87.80"],["Reinsertion","$127.70","$228.25"],["Removal","$99.60","$154.20"]],
    journey:[["nurse","Prior consult","10-20 min","Discuss suitability and book your procedure. A prior consult is required before insertion."],["nurse","Nurse preparation","20 min","The nurse prepares you and the treatment room for the procedure."],["doctor","With your doctor","20 min","Your doctor inserts, reinserts or removes the implant."]],
    reasons:["A long-acting, reversible contraceptive that lasts up to 3 years","Removal or reinsertion available at any time","Performed on-site by experienced GPs, no referral needed"]},
  {id:"iud", name:"IUD / Mirena (insertion & removal)", cat:"Women's health",
    docs:["firth","patel","saadatian"],
    fees:[["Insertion","$154.20","$348.20"],["Reinsertion","$212.70","$398.05"],["Removal","$80.00","$156.95"]],
    journey:[["nurse","Prior consult","20 min","A consult is required first to check suitability and prepare you."],["doctor","With your doctor & nurse","30-40 min","Your doctor performs the insertion with nurse assistance in the treatment room."]],
    reasons:["Long-acting contraception with hormonal (Mirena) and copper options","Can help manage heavy or painful periods","Inserted and removed on-site by our women's health GPs"]},
  {id:"toenail", name:"Ingrown toenail surgery", cat:"Minor surgery",
    docs:["sivanesan","kamale","saadatian"],
    fees:[["Toenail removal","$128.98","$219.45"],["Partial resection","$133.50","$249.75"],["Wedge resection","$146.85","$338.90"]],
    journey:[["doctor","With your doctor","20 min","Assessment, local anaesthetic and the procedure itself."],["nurse","Nurse dressing & aftercare","30 min","Dressing, wound-care instructions and a follow-up plan."]],
    reasons:["Lasting relief from painful, recurring ingrown toenails","Done under local anaesthetic in our treatment room","Wound care and review handled in the same visit"]},
  {id:"iron", name:"Iron infusion", cat:"Treatments",
    docs:["firth","sivanesan"],
    fees:[["Iron infusion","$150.00","$263.30"]],
    journey:[["doctor","Prior consult","10-20 min","A consult is required to confirm your iron levels and suitability."],["nurse","Nurse infusion","50 min","The infusion is given by our nurse, with your doctor overseeing."]],
    reasons:["Restores low iron faster than tablets when needed","Given safely on-site with nursing supervision","Useful when oral iron isn't tolerated or working"]},
  {id:"skin", name:"Skin cancer check", cat:"Skin",
    docs:["firth","sivanesan","kamale","saadatian"],
    fees:[["Spot check","$40.00","$79.75"],["Full body","$40.00","$116.95"]],
    bulkNote:"Bulk billing is not available for skin checks.",
    journey:[["doctor","With your doctor","10-20 min","A spot check (single lesion) or a full-body examination using dermoscopy."],["doctor","If needed","same or new visit","A biopsy or excision can be arranged if anything looks suspicious."]],
    reasons:["Early detection greatly improves skin cancer outcomes","Recommended for adults, especially those 40 and over","Biopsy and excision available on-site if follow-up is needed"]},
  {id:"biopsy", name:"Skin biopsy (punch / shave)", cat:"Skin",
    docs:["firth","sivanesan","kamale","saadatian"],
    fees:[["All areas","$48.25","$95.20"]],
    journey:[["doctor","With your doctor","20 min","A small sample is taken under local anaesthetic and sent to pathology."],["nurse","Nurse dressing","20 min","Dressing and aftercare, with results discussed at follow-up."]],
    reasons:["Confirms a diagnosis before any larger treatment","Quick, done under local anaesthetic","Results reviewed and followed up by your GP"]},
  {id:"excision", name:"Skin lesion excision", cat:"Minor surgery",
    docs:["firth","sivanesan","kamale","saadatian"],
    fees:[["Simple (<1cm)","$80.00","from $80.00"],["Intermediate (>1cm or 2 lesions)","$125.00","from $125.00"],["Complex (>1.5cm or 3+ lesions)","$150.00","$150.00 +"]],
    journey:[["doctor","Skin check / consult","10-20 min","The lesion is assessed and the excision is planned and booked."],["doctor","Excision with your doctor","by size","The lesion is removed under local anaesthetic, with sutures if needed."],["nurse","Nurse aftercare","follow-up","Dressing, suture removal and results review."]],
    reasons:["Removes suspicious or troublesome lesions completely","Sent to pathology for a definitive diagnosis","Concession pricing available; Medicare rebates apply"]},
  {id:"acupuncture", name:"Acupuncture", cat:"Treatments",
    docs:["zhang"],
    fees:[["Long (20 min)","$25.00","$67.20"],["Prolonged (40 min)","$25.00","$106.70"]],
    journey:[["doctor","With your doctor","20-40 min","A GP-led acupuncture session as part of your care plan."]],
    reasons:["A GP-delivered option for pain and other conditions","Integrated with your general practice care","Flat, affordable out-of-pocket fee"]},
  {id:"minor", name:"Minor procedures (cryotherapy, dressings, ear syringing, ECG)", cat:"Minor procedures",
    docs:["firth","sivanesan","saadatian","patel","kamale","zhang","hodgson","lam","tennakoon"],
    fees:[["Simple","$40.00","$79.75"],["Intermediate","$50.00","$89.75"],["Complex","$60.00","$99.75"]],
    journey:[["nurse","With the nurse","10-20 min","Many minor procedures are done by our nurses in the treatment room."],["doctor","Doctor if required","as needed","Some procedures are performed or reviewed by your GP."]],
    reasons:["Common issues handled quickly, without a referral","Concession pricing available","Performed by most of our doctors and nurses"]}
];

/* Services - patient journeys and reasons to consider */
const SERVICES = [
  {id:"health-assessment", name:"Health assessments (40-44, 45-49 & 75+)", cat:"Prevention", icon:"clipboard",
    blurb:"Routine preventative health checks help you stay on top of your health and identify which risk factors need monitoring. Three assessments are offered: for 75 years and over, for 45 to 49 year olds, and for 40 to 44 year olds whose AUSDRISK diabetes risk score or certain chronic conditions make them eligible.",
    journey:[["nurse","Assessment with the nurse","40-60 min","The nurse completes your assessment, measurements, history and screening. Allow 50 to 60 minutes for a 75+ assessment, or 40 to 50 minutes for the 45 to 49 assessment."],["doctor","Review with your doctor","20 min","Your doctor reviews the assessment and sets a personalised prevention plan."]],
    reasons:["Picks up risks early, before they become problems","Often bulk billed when you're eligible","A tailored plan made with a doctor who knows your history"],
    note:"Eligibility for the 40 to 44 assessment depends on your AUSDRISK score and certain chronic conditions; ask your doctor or our nurses. We also offer the 4-year-old Healthy Kids Check."},
  {id:"chronic", name:"Chronic disease management & care plans", cat:"Ongoing care", icon:"pulse",
    blurb:"Living with a chronic disease or medical condition can be frustrating and tiring. Your doctor can help manage your condition and offer support and guidance, with a wide range of allied health professionals available on the premises and through doctor networks for further expertise.",
    journey:[["doctor","Care plan with your GP","20 min","Your doctor reviews your condition and prepares your GP Management Plan."],["nurse","Care coordination with the nurse","20 min","Straight after the doctor, the nurse completes the plan and coordinates any allied health referrals."],["doctor","Regular reviews","every 3 to 6 months","Your plan is reviewed and adjusted, usually every three months and at least every six."]],
    reasons:["Structured support for conditions like diabetes, heart and lung disease","Access to subsidised allied health through care plans","Coordinated between your GP, nurse and allied health team"]},
  {id:"mental-health", name:"Mental health care", cat:"Wellbeing", icon:"mind",
    blurb:"Mental health is just as important as physical health. Our empathetic practitioners support you no matter what you're going through. If you aren't feeling like yourself, are navigating a difficult time, or simply want someone to talk to, reach out to your doctor.",
    journey:[["doctor","Face-to-face consult","20+ min","A longer, private consult to talk through what's going on."],["doctor","Mental Health Care Plan","same visit","Your GP prepares a plan and referral where appropriate."],["doctor","Review & follow-up","scheduled","Ongoing review and coordination with psychology partners."]],
    reasons:["Compassionate, judgement-free support from your GP","Care plans can subsidise sessions with a psychologist","Continuity with a doctor who knows your history"],
    note:"Mental health care plans are provided face-to-face."},
  {id:"womens", name:"Women's health & cervical screening", cat:"Women's health", icon:"female",
    blurb:"Our doctors are sensitive to the unique health needs of women across the lifespan, assisting with period symptoms, cervical screening, contraception guidance and breast examinations. Comprehensive menopause care is also available, covering symptoms, bone density, heart health, weight and mental health, from practitioners with specialised skills in menopause management.",
    journey:[["doctor","Book a longer consult","20 min","A dedicated appointment for screening or women's health concerns."],["doctor","Screening with your doctor","same visit","Cervical screening and other checks completed in private."]],
    reasons:["Cervical screening is your best protection against cervical cancer","Female and male GPs available for your comfort","Family planning, contraception and antenatal care all on-site"]},
  {id:"mens", name:"Men's health", cat:"Men's health", icon:"male",
    blurb:"Your GP can assist with prostate checks, cancer screening and mental health, and support the management of heart disease, high cholesterol and diabetes, all handled sensitively.",
    journey:[["doctor","Book a consult","standard","A check focused on the conditions that matter most for men."],["doctor","Assessment & plan","same visit","Blood pressure, heart, prostate and mental health as needed."]],
    reasons:["Early detection of heart disease, diabetes and cancers","Prostate and men's health matters handled sensitively","Straightforward path from check to plan"]},
  {id:"child", name:"Child health & immunisations", cat:"Family", icon:"family",
    blurb:"Children's health services are provided from birth. Regular health checks help you navigate growth, dietary changes, cognitive development and recommended immunisations.",
    journey:[["nurse","Nurse or doctor visit","standard","Childhood immunisations and health checks for little ones."],["doctor","Doctor review","as needed","Guidance and support from newborn through to starting school."]],
    reasons:["Keeps your child's immunisations on track","Free vaccines under the National Immunisation Program","Support for development, growth and family wellbeing"]},
  {id:"antenatal", name:"Antenatal & shared care", cat:"Women's health", icon:"female",
    blurb:"During pregnancy, shared antenatal care lets your care be shared between your regular GP and your obstetrician. Planning a pregnancy? Preconception counselling, ideally started 3 to 6 months before trying, and family planning support are available too.",
    journey:[["doctor","Initial pregnancy consult","20 min","Discuss your pregnancy and plan your shared-care schedule."],["doctor","Shared care with your GP","through pregnancy","Most monitoring is done here, with a few hospital visits."],["doctor","6-week check","40 min + 20 min","A combined check for mother and baby with the doctor, then the nurse."]],
    reasons:["See your own GP for most of your pregnancy care","Fewer hospital trips through shared-care arrangements","Continuity of care before and after your baby arrives"]},
  {id:"postnatal", name:"Postnatal check (mother & baby)", cat:"Women's health", icon:"female",
    blurb:"After your baby arrives, a postnatal check looks after you both. The doctor examines your baby first, then checks on you, and the nurse follows up with immunisations, feeding and wellbeing support.",
    journey:[["doctor","Baby's check with the doctor","20 min","Your doctor examines your baby: growth, feeding, development and any concerns."],["doctor","Mother's check with the doctor","10 min","A check on your own recovery, mood and wellbeing."],["nurse","With the nurse","20 min","Immunisations, measurements and practical feeding and settling support."]],
    reasons:["One appointment covers both mother and baby","Immunisations kept on track from the start","A team that supports your recovery, not just the baby's progress"]},
  {id:"immunisation", name:"Immunisations & travel vaccines", cat:"Prevention", icon:"clipboard",
    blurb:"Timely vaccinations strengthen your immune system, with child and adult immunisation programs protecting the whole family. Travelling overseas? Our doctors provide up-to-date travel medicine advice, vaccinations and any medicines you need for the journey.",
    journey:[["doctor","Pre-travel consult with your doctor","first visit","Book the doctor first. Travel advice works as a pre-consultation: your doctor plans which vaccines you need for your destination."],["nurse","Vaccinations with the nurse","follow-up","The nurse gives your vaccines. Some travel vaccines are not kept in stock and need to be ordered, so you may be rebooked once they arrive."]],
    reasons:["Free seasonal flu vaccine for eligible high-risk patients","Childhood vaccines bulk billed under the national program","Travel health advice for wherever you're headed"],
    note:"Routine and childhood immunisations can be booked directly with the nurse. For travel, always see the doctor first."},
  {id:"occupational", name:"Occupational health & WorkCover", cat:"Work health", icon:"clipboard",
    blurb:"Our doctors provide quality occupational healthcare: pre-employment medicals, drug and alcohol screening, and care for workplace injuries, including treatment and support returning to work.",
    journey:[["doctor","Book with a doctor","standard","For a workplace injury, pre-employment medical or return-to-work matter, start with a doctor's appointment."],["doctor","Certificate of capacity","same visit","For WorkCover claims, your doctor assesses you and issues a certificate of capacity."],["employer","Lodge with your employer","next step","Give the certificate to your employer and obtain your WorkCover claim number so ongoing treatment can be billed to the claim."]],
    reasons:["Injury treatment and recovery managed by one doctor","Certificates and paperwork handled properly the first time","Support all the way back to work"]},
  {id:"telehealth", name:"Telehealth consultation", cat:"Access", icon:"video", telehealth:true, teleOnly:true,
    blurb:"Telehealth keeps quality care within reach when you can't come in. Consultations are available to patients who have seen a doctor face to face within the last 12 months. Please be reachable by phone from 5 minutes before your appointment time.",
    journey:[["doctor","Book a telehealth slot","online","Choose a phone or video appointment that suits you."],["doctor","Consult from home","standard","Speak with your GP for scripts, referrals, results and follow-ups."]],
    reasons:["See your doctor without leaving home","Ideal for scripts, referrals and results","Billed in line with our standard fee schedule"]},
  {id:"pathology", name:"On-site pathology (Dorevitch)", cat:"Access", icon:"lab",
    blurb:"Dorevitch Pathology provides collection on-site with no appointment required. At Balwyn, collection is open Monday to Friday, 8:30am to 12:00pm.",
    journey:[["doctor","Request from your GP","same visit","Your doctor orders the tests you need."],["collector","Dorevitch collection","walk in","Dorevitch's own pathology collectors take your samples; our doctors and nurses aren't involved in collection. Monday to Friday, 8:30am to 12:00pm."]],
    reasons:["Bloods and samples collected without a second trip","Results returned to your GP for review","One building for your appointment and your tests"]}
];

/* Consultation out-of-pocket fees, effective 1 July 2026.
   Weekday amounts apply to non-concession patients;
   concession cardholders and children 15 and under are bulk billed on weekdays. */
const CONSULT_FEES = [
  ["Brief consultation","$42","$50","$55"],
  ["Standard consultation","$42","$50","$55"],
  ["Long consultation","$42","$50","$55"],
  ["Prolonged consultation","$42","$50","$55"],
  ["Skin check","$40","$60","$60"],
  ["Ear syringing","$50","$50","$50"],
  ["Acupuncture","$25","$25","$25"]
];

/* ---------- shared helpers ---------- */
const docById = id => DOCTORS.find(d => d.id === id);
const procById = id => PROCEDURES.find(p => p.id === id);
const serviceById = id => SERVICES.find(s => s.id === id);
function siteLabel(sites){ return sites.map(s => s + ' Whitehorse Rd').join(' & '); }
function initials(name){ return name.replace('Dr ','').split(' ').map(w => w[0]).slice(0,2).join(''); }

function journeyHTML(steps){
  return `<div class="journey">${steps.map(s=>`<div class="jstep ${s[0]}"><div class="jwho">${s[0]==='nurse'?'With the nurse':(s[0]==='doctor'?'With your doctor':(s[0]==='collector'?'With the pathology collector':(s[0]==='employer'?'With your employer':s[1])))} <span class="jtime">${s[2]}</span></div><div class="jwhat"><strong>${s[1]}.</strong> ${s[3]}</div></div>`).join('')}</div>`;
}
function reasonsHTML(list){
  return `<ul class="reasons">${list.map(r=>`<li><svg aria-hidden="true" focusable="false" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M20 6L9 17l-5-5"/></svg>${r}</li>`).join('')}</ul>`;
}
function ctaHTML(showTele, teleOnly){
  var tele = `<a class="btn btn-outline" href="telehealth.html"><svg aria-hidden="true" focusable="false" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="14" height="14" rx="2"/><path d="M16 10l6-3v10l-6-3"/></svg>${teleOnly?'Book a telehealth consult':'Telehealth instead'}</a>`;
  if(teleOnly) return `<div class="fc-modal-cta">${tele}</div>`;
  return `<div class="fc-modal-cta">
    <a class="btn btn-primary" href="${BOOK_URL}"><svg aria-hidden="true" focusable="false" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M8 2v4M16 2v4"/></svg>Book this in person</a>
    ${showTele?tele:''}
  </div>`;
}
