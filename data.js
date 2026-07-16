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

/* Doctors - from practice appointment preferences */
const DOCTORS = [
  {id:"firth", name:"Dr Katherine Firth", sites:["427"], telehealth:true, interests:["Women's health","Skin cancer medicine","Minor procedures","Antenatal shared care"], procedures:["implanon","iud","iron","skin","biopsy","excision","minor"]},
  {id:"mayadunne", name:"Dr Upuli Mayadunne", sites:["427","411"], telehealth:false, interests:["Women's health & family planning","IUD & Implanon","Skin checks","Iron infusions"], procedures:["implanon","iud","iron","skin","biopsy","excision"]},
  {id:"sivanesan", name:"Dr Sathiya Sivanesan", sites:["427"], telehealth:false, interests:["Minor surgery","Skin cancer medicine","Musculoskeletal & joint injections","Ingrown toenail surgery","Spirometry"], procedures:["implanon","toenail","iron","skin","biopsy","excision","minor"]},
  {id:"saadatian", name:"Dr Siavash Saadatian", sites:["427"], telehealth:true, interests:["Skin cancer medicine","Minor surgery","Cysts & lipomas","Fracture & plaster clinic"], procedures:["implanon","iud","skin","biopsy","excision","toenail","minor"]},
  {id:"patel", name:"Dr Nisha Patel", sites:["427"], telehealth:false, interests:["Women's health","Cervical screening","Antenatal care"], procedures:["implanon","iud","minor"]},
  {id:"kamale", name:"Dr Avinash Kamale", sites:["427","411"], telehealth:false, interests:["Skin checks","Minor surgery","Fracture & plaster clinic"], procedures:["toenail","skin","biopsy","excision","minor"]},
  {id:"hashemi", name:"Dr Ela Hashemi", sites:["411"], telehealth:false, interests:["Women's health","Family planning (IUD & Implanon)","Antenatal care"], procedures:["implanon","iud","skin","minor"]},
  {id:"zhang", name:"Dr Wilson Zhang", sites:["411"], telehealth:true, interests:["Acupuncture","Integrative care"], procedures:["acupuncture","minor"]},
  {id:"hodgson", name:"Dr Martin Hodgson", sites:["411"], telehealth:false, interests:["General practice","Travel medicine","Minor procedures","Spirometry"], procedures:["minor"]},
  {id:"lam", name:"Dr Winston Lam", sites:["427","411"], telehealth:true, interests:["General & family medicine","Telehealth","Travel vaccinations"], procedures:["minor"]},
  {id:"janakan", name:"Dr Janakan Srishanmuganathan", sites:["427"], telehealth:false, interests:["General & family medicine"], procedures:["minor"]},
  {id:"sayanan", name:"Dr Sayanan Srishanmuganathan", sites:["427"], telehealth:false, interests:["General & family medicine"], procedures:["minor"]},
  {id:"yang", name:"Dr Katie Yang", sites:["427"], telehealth:false, interests:["General & family medicine","Child health"], procedures:["minor"]},
  {id:"fam", name:"Dr Han Ling Fam", sites:["427"], telehealth:false, interests:["General & family medicine"], procedures:["minor"]}
];

/* Procedures - fees from the master procedures fee table (out-of-pocket, full fee) */
const PROCEDURES = [
  {id:"implanon", name:"Implanon (contraceptive implant)", cat:"Women's health",
    docs:["firth","mayadunne","sivanesan","saadatian","hashemi","patel"],
    fees:[["Insertion","$47.73","$87.80"],["Reinsertion","$127.70","$228.25"],["Removal","$99.60","$154.20"]],
    journey:[["nurse","Prior consult","10-20 min","Discuss suitability and book your procedure. A prior consult is required before insertion."],["nurse","Nurse preparation","20 min","The nurse prepares you and the treatment room for the procedure."],["doctor","With your doctor","20 min","Your doctor inserts, reinserts or removes the implant."]],
    reasons:["A long-acting, reversible contraceptive that lasts up to 3 years","Removal or reinsertion available at any time","Performed on-site by experienced GPs, no referral needed"]},
  {id:"iud", name:"IUD / Mirena (insertion & removal)", cat:"Women's health",
    docs:["mayadunne","hashemi","firth","patel","saadatian"],
    fees:[["Insertion","$154.20","$348.20"],["Reinsertion","$212.70","$398.05"],["Removal","$80.00","$156.95"]],
    journey:[["nurse","Prior consult","20 min","A consult is required first to check suitability and prepare you."],["doctor","With your doctor & nurse","30-40 min","Your doctor performs the insertion with nurse assistance in the treatment room."]],
    reasons:["Long-acting contraception with hormonal (Mirena) and copper options","Can help manage heavy or painful periods","Inserted and removed on-site by our women's health GPs"]},
  {id:"toenail", name:"Ingrown toenail surgery", cat:"Minor surgery",
    docs:["sivanesan","kamale","saadatian"],
    fees:[["Toenail removal","$128.98","$219.45"],["Partial resection","$133.50","$249.75"],["Wedge resection","$146.85","$338.90"]],
    journey:[["doctor","With your doctor","20 min","Assessment, local anaesthetic and the procedure itself."],["nurse","Nurse dressing & aftercare","30 min","Dressing, wound-care instructions and a follow-up plan."]],
    reasons:["Lasting relief from painful, recurring ingrown toenails","Done under local anaesthetic in our treatment room","Wound care and review handled in the same visit"]},
  {id:"iron", name:"Iron infusion", cat:"Treatments",
    docs:["firth","mayadunne","sivanesan"],
    fees:[["Iron infusion","$150.00","$263.30"]],
    journey:[["doctor","Prior consult","10-20 min","A consult is required to confirm your iron levels and suitability."],["nurse","Nurse infusion","50 min","The infusion is given by our nurse, with your doctor overseeing."]],
    reasons:["Restores low iron faster than tablets when needed","Given safely on-site with nursing supervision","Useful when oral iron isn't tolerated or working"]},
  {id:"skin", name:"Skin cancer check", cat:"Skin",
    docs:["firth","mayadunne","sivanesan","kamale","saadatian","hashemi"],
    fees:[["Spot check","$40.00","$79.75"],["Full body","$40.00","$116.95"]],
    bulkNote:"Bulk billing is not available for skin checks.",
    journey:[["doctor","With your doctor","10-20 min","A spot check (single lesion) or a full-body examination using dermoscopy."],["doctor","If needed","same or new visit","A biopsy or excision can be arranged if anything looks suspicious."]],
    reasons:["Early detection greatly improves skin cancer outcomes","Recommended for adults, especially those 40 and over","Biopsy and excision available on-site if follow-up is needed"]},
  {id:"biopsy", name:"Skin biopsy (punch / shave)", cat:"Skin",
    docs:["firth","mayadunne","sivanesan","kamale","saadatian"],
    fees:[["All areas","$48.25","$95.20"]],
    journey:[["doctor","With your doctor","20 min","A small sample is taken under local anaesthetic and sent to pathology."],["nurse","Nurse dressing","20 min","Dressing and aftercare, with results discussed at follow-up."]],
    reasons:["Confirms a diagnosis before any larger treatment","Quick, done under local anaesthetic","Results reviewed and followed up by your GP"]},
  {id:"excision", name:"Skin lesion excision", cat:"Minor surgery",
    docs:["firth","mayadunne","sivanesan","kamale","saadatian"],
    fees:[["Simple (<1cm)","$80.00","from $80.00"],["Intermediate (>1cm or 2 lesions)","$125.00","from $125.00"],["Complex (>1.5cm or 3+ lesions)","$150.00","$150.00 +"]],
    journey:[["doctor","Skin check / consult","10-20 min","The lesion is assessed and the excision is planned and booked."],["doctor","Excision with your doctor","by size","The lesion is removed under local anaesthetic, with sutures if needed."],["nurse","Nurse aftercare","follow-up","Dressing, suture removal and results review."]],
    reasons:["Removes suspicious or troublesome lesions completely","Sent to pathology for a definitive diagnosis","Concession pricing available; Medicare rebates apply"]},
  {id:"acupuncture", name:"Acupuncture", cat:"Treatments",
    docs:["zhang"],
    fees:[["Long (20 min)","$25.00","$67.20"],["Prolonged (40 min)","$25.00","$106.70"]],
    journey:[["doctor","With your doctor","20-40 min","A GP-led acupuncture session as part of your care plan."]],
    reasons:["A GP-delivered option for pain and other conditions","Integrated with your general practice care","Flat, affordable out-of-pocket fee"]},
  {id:"minor", name:"Minor procedures (cryotherapy, dressings, ear syringing, ECG)", cat:"Minor procedures",
    docs:["firth","mayadunne","sivanesan","saadatian","patel","kamale","hashemi","zhang","hodgson","lam","janakan","sayanan","yang","fam"],
    fees:[["Simple","$40.00","$79.75"],["Intermediate","$50.00","$89.75"],["Complex","$60.00","$99.75"]],
    journey:[["nurse","With the nurse","10-20 min","Many minor procedures are done by our nurses in the treatment room."],["doctor","Doctor if required","as needed","Some procedures are performed or reviewed by your GP."]],
    reasons:["Common issues handled quickly, without a referral","Concession pricing available","Performed by most of our doctors and nurses"]}
];

/* Services - patient journeys and reasons to consider */
const SERVICES = [
  {id:"health-assessment", name:"Health Assessment (45-49 years)", cat:"Prevention", icon:"clipboard",
    blurb:"Routine preventative health checks help you stay on top of your health and identify which risk factors need monitoring. By taking steps to maintain your health before getting sick you can reduce the risk of chronic disease, and if something isn't quite right, your doctor works with you to address it as soon as possible.",
    journey:[["nurse","Arrive & check in with the nurse","40 min","The nurse completes a detailed health assessment, measurements and history."],["doctor","Review with your doctor","20 min","Your doctor reviews the assessment and sets a personalised prevention plan."]],
    reasons:["Picks up risks early, before they become problems","Often bulk billed when you're eligible","A tailored plan to keep you well through your 40s and 50s"],
    note:"We also offer the 4-year-old Healthy Kids Check and assessments for other eligible age groups."},
  {id:"chronic", name:"Chronic Disease Management & Care Plans", cat:"Ongoing care", icon:"pulse",
    blurb:"Living with a chronic disease or medical condition can be frustrating and tiring. Your doctor can help manage your condition and offer support and guidance, with a wide range of allied health professionals available on the premises and through doctor networks for further expertise.",
    journey:[["doctor","Long consult with your GP","20-40 min","Your doctor reviews your condition and prepares a GP Management Plan."],["nurse","Nurse care coordination","20 min","The nurse helps coordinate your plan and any allied health referrals."],["doctor","Regular reviews","scheduled","Your plan is reviewed and adjusted over time."]],
    reasons:["Structured support for conditions like diabetes, heart and lung disease","Access to subsidised allied health through care plans","Coordinated between your GP, nurse and allied health team"]},
  {id:"mental-health", name:"Mental Health Care", cat:"Wellbeing", icon:"mind",
    blurb:"Mental health is just as important as physical health. Our empathetic practitioners support you no matter what you're going through. If you aren't feeling like yourself, are navigating a difficult time, or simply want someone to talk to, reach out to your doctor.",
    journey:[["doctor","Face-to-face consult","20+ min","A longer, private consult to talk through what's going on."],["doctor","Mental Health Care Plan","same visit","Your GP prepares a plan and referral where appropriate."],["doctor","Review & follow-up","scheduled","Ongoing review and coordination with psychology partners."]],
    reasons:["Compassionate, judgement-free support from your GP","Care plans can subsidise sessions with a psychologist","Continuity with a doctor who knows your history"],
    note:"Mental health care plans are provided face-to-face."},
  {id:"womens", name:"Women's Health & Cervical Screening", cat:"Women's health", icon:"female",
    blurb:"Our doctors are sensitive to the unique health needs of women across the lifespan, assisting with period symptoms, cervical screening, contraception guidance and breast examinations. Comprehensive menopause care is also available, covering symptoms, bone density, heart health, weight and mental health, from practitioners with specialised skills in menopause management.",
    journey:[["doctor","Book a longer consult","20 min","A dedicated appointment for screening or women's health concerns."],["doctor","Screening with your doctor","same visit","Cervical screening and other checks completed in private."]],
    reasons:["Cervical screening is your best protection against cervical cancer","Female and male GPs available for your comfort","Family planning, contraception and antenatal care all on-site"]},
  {id:"mens", name:"Men's Health", cat:"Men's health", icon:"male",
    blurb:"Your GP can assist with prostate checks, cancer screening and mental health, and support the management of heart disease, high cholesterol and diabetes, all handled sensitively.",
    journey:[["doctor","Book a consult","standard","A check focused on the conditions that matter most for men."],["doctor","Assessment & plan","same visit","Blood pressure, heart, prostate and mental health as needed."]],
    reasons:["Early detection of heart disease, diabetes and cancers","Prostate and men's health matters handled sensitively","Straightforward path from check to plan"]},
  {id:"child", name:"Child Health & Immunisations", cat:"Family", icon:"family",
    blurb:"Children's health services are provided from birth. Regular health checks help you navigate growth, dietary changes, cognitive development and recommended immunisations.",
    journey:[["nurse","Nurse or doctor visit","standard","Childhood immunisations and health checks for little ones."],["doctor","Doctor review","as needed","Guidance and support from newborn through to starting school."]],
    reasons:["Keeps your child's immunisations on track","Free vaccines under the National Immunisation Program","Support for development, growth and family wellbeing"]},
  {id:"antenatal", name:"Antenatal & Shared Care", cat:"Women's health", icon:"female",
    blurb:"During pregnancy, shared antenatal care lets your care be shared between your regular GP and your obstetrician. Planning a pregnancy? Preconception counselling, ideally started 3 to 6 months before trying, and family planning support are available too.",
    journey:[["doctor","Initial pregnancy consult","20 min","Discuss your pregnancy and plan your shared-care schedule."],["doctor","Shared care with your GP","through pregnancy","Most monitoring is done here, with a few hospital visits."],["doctor","6-week check","40 min + 20 min","A combined check for mother and baby with the doctor, then the nurse."]],
    reasons:["See your own GP for most of your pregnancy care","Fewer hospital trips through shared-care arrangements","Continuity of care before and after your baby arrives"]},
  {id:"immunisation", name:"Immunisations & Travel Vaccines", cat:"Prevention", icon:"clipboard",
    blurb:"Timely vaccinations strengthen your immune system, with child and adult immunisation programs protecting the whole family. Travelling overseas? Our doctors provide up-to-date travel medicine advice, vaccinations and any medicines you need for the journey.",
    journey:[["nurse","Book with nurse or doctor","standard","Routine, flu and travel vaccinations."],["doctor","Travel advice","as needed","Pre-travel advice and vaccines such as Hepatitis A, Typhoid and Malaria."]],
    reasons:["Free seasonal flu vaccine for eligible high-risk patients","Childhood vaccines bulk billed under the national program","Travel health advice for wherever you're headed"]},
  {id:"telehealth", name:"Telehealth Consultation", cat:"Access", icon:"video", telehealth:true,
    blurb:"Telehealth keeps quality care within reach when you can't come in. Consultations are available to patients who have seen a doctor face to face within the last 12 months. Please be reachable by phone from 5 minutes before your appointment time.",
    journey:[["doctor","Book a telehealth slot","online","Choose a phone or video appointment that suits you."],["doctor","Consult from home","standard","Speak with your GP for scripts, referrals, results and follow-ups."]],
    reasons:["See your doctor without leaving home","Ideal for scripts, referrals and results","Billed in line with our standard fee schedule"]},
  {id:"pathology", name:"On-site Pathology (Dorevitch)", cat:"Access", icon:"lab",
    blurb:"Dorevitch Pathology provides collection on-site with no appointment required. At Balwyn, collection is open Monday to Friday, 8:30am to 12:00pm.",
    journey:[["doctor","Request from your GP","same visit","Your doctor orders the tests you need."],["nurse","Collection on-site","same day","Dorevitch provides pathology collection in the same building."]],
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
  return `<div class="journey">${steps.map(s=>`<div class="jstep ${s[0]}"><div class="jwho">${s[0]==='nurse'?'🩺 With the nurse':(s[0]==='doctor'?'👨‍⚕️ With your doctor':s[1])} <span class="jtime">${s[2]}</span></div><div class="jwhat"><strong>${s[1]}.</strong> ${s[3]}</div></div>`).join('')}</div>`;
}
function reasonsHTML(list){
  return `<ul class="reasons">${list.map(r=>`<li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M20 6L9 17l-5-5"/></svg>${r}</li>`).join('')}</ul>`;
}
function ctaHTML(showTele){
  return `<div class="fc-modal-cta">
    <a class="btn btn-green btn-lg" href="${BOOK_URL}"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M8 2v4M16 2v4"/></svg>Book this in person</a>
    ${showTele?`<a class="btn btn-light-blue btn-lg" href="telehealth.html"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="14" height="14" rx="2"/><path d="M16 10l6-3v10l-6-3"/></svg>Telehealth instead</a>`:''}
  </div>`;
}
