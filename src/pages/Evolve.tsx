import { useState, useMemo } from "react";

const G = {
  bg:"#0A0A0C",surface:"#111113",border:"#1E1E22",muted:"#2A2A2E",
  text:"#E8E6E1",sub:"#9CA3AF",dim:"#4B5563",gold:"#C9A84C",
  goldH:"#E2BC6A",green:"#10B981",red:"#EF4444",blue:"#3B82F6",
  purple:"#8B5CF6",cyan:"#06B6D4",orange:"#F97316",amber:"#F59E0B",
};

const BSTATUSES = [
  {key:"Enquiry",label:"Enquiry",color:"#6B7280",bg:"rgba(107,114,128,0.15)",dot:"#6B7280"},
  {key:"Invoice Submitted",label:"Invoice Submitted",color:"#F59E0B",bg:"rgba(245,158,11,0.15)",dot:"#F59E0B"},
  {key:"Confirmed",label:"Confirmed",color:"#3B82F6",bg:"rgba(59,130,246,0.15)",dot:"#3B82F6"},
  {key:"Contract Issued",label:"Contract Issued",color:"#8B5CF6",bg:"rgba(139,92,246,0.15)",dot:"#8B5CF6"},
  {key:"Contract Signed",label:"Contract Signed",color:"#06B6D4",bg:"rgba(6,182,212,0.15)",dot:"#06B6D4"},
  {key:"Deposit Received",label:"Deposit Received",color:"#F97316",bg:"rgba(249,115,22,0.15)",dot:"#F97316"},
  {key:"Fully Paid",label:"Fully Paid",color:"#10B981",bg:"rgba(16,185,129,0.15)",dot:"#10B981"},
  {key:"Completed",label:"Completed",color:"#D1FAE5",bg:"rgba(16,185,129,0.08)",dot:"#10B981"},
  {key:"Cancelled",label:"Cancelled",color:"#EF4444",bg:"rgba(239,68,68,0.1)",dot:"#EF4444"},
];
const TEAM=["Junior","Ayanda","Blessing","Mambo","Smooth","Neo","Keegan","Nivo","Lastee"];

const IB: any[]=[
  {id:1,date:"2026-02-28",promoter:"Tyron",contact:"27699020621",eventType:"Club",city:"Johannesburg - SA",venue:"Mamalisa",offer:"90000",currency:"ZAR",paymentReceived:"90000",status:"Completed",contract:"",flights:"",accommodation:"77 on Burger — 3 Bedroom Apartment",transport:"1 x V-Class (Sosha)",travelParty:["Ayanda","Junior","Lastee","Blessing","Neo","Smooth","Mambo"],comments:"Replacement gig from 31 Dec 25"},
  {id:2,date:"2026-03-05",promoter:"Miss Brics",contact:"",eventType:"Beauty Pageant",city:"Russia",venue:"Kazan Expo",offer:"20000",currency:"USD",paymentReceived:"",status:"Enquiry",contract:"",flights:"",accommodation:"",transport:"",travelParty:["Ayanda","Junior","Lastee","Blessing"],comments:""},
  {id:3,date:"2026-03-07",promoter:"Giant Leap Events",contact:"27658910588",eventType:"Festival",city:"Johannesburg - SA",venue:"Kayalami Race Track",offer:"200000",currency:"ZAR",paymentReceived:"",status:"Invoice Submitted",contract:"",flights:"",accommodation:"",transport:"",travelParty:[],comments:"Invoice submitted, client is now quiet"},
  {id:4,date:"2026-03-01",promoter:"Thato Bae",contact:"27671559224",eventType:"Festival",city:"Randfontein",venue:"Ace Ntsoelengoe Stadium",offer:"180000",currency:"ZAR",paymentReceived:"",status:"Invoice Submitted",contract:"",flights:"",accommodation:"",transport:"",travelParty:[],comments:"No commitment from promoter"},
  {id:5,date:"2026-03-27",promoter:"Simamkele",contact:"27768490253",eventType:"Festival",city:"Port Elizabeth",venue:"TBC",offer:"80000",currency:"ZAR",paymentReceived:"",status:"Invoice Submitted",contract:"",flights:"",accommodation:"",transport:"",travelParty:[],comments:"Counter offer, final feedback 23/01/26"},
  {id:6,date:"2026-03-28",promoter:"Kilamo",contact:"27793589738",eventType:"Festival - Big Steeze",city:"Johannesburg - SA",venue:"TBC",offer:"200000",currency:"ZAR",paymentReceived:"",status:"Enquiry",contract:"",flights:"",accommodation:"",transport:"",travelParty:[],comments:""},
  {id:7,date:"2026-03-28",promoter:"Thato Effect",contact:"27815094296",eventType:"Festival",city:"Potchefstroom",venue:"CSA",offer:"90000",currency:"ZAR",paymentReceived:"45000",status:"Invoice Submitted",contract:"",flights:"",accommodation:"",transport:"1 x V-Class (Sosha)",travelParty:["Junior","Blessing","Mambo","Smooth","Neo","Ayanda","Keegan"],comments:""},
  {id:8,date:"2026-04-25",promoter:"Roy",contact:"27834074928",eventType:"Festival",city:"Livingstone - Zambia",venue:"TBC",offer:"20000",currency:"USD",paymentReceived:"",status:"Enquiry",contract:"",flights:"",accommodation:"",transport:"",travelParty:[],comments:""},
  {id:9,date:"2026-04-04",promoter:"Mihlali",contact:"27835004968",eventType:"Festival",city:"Cape Town",venue:"Cabo Beach",offer:"80000",currency:"ZAR",paymentReceived:"40000",status:"Confirmed",contract:"",flights:"",accommodation:"",transport:"1 x V-Class (Luzuko)",travelParty:["Junior","Blessing","Mambo","Smooth","Neo","Ayanda","Nivo"],comments:""},
  {id:10,date:"2026-04-05",promoter:"Luzuko",contact:"27714993182",eventType:"Festival",city:"Cape Town",venue:"Rands",offer:"80000",currency:"ZAR",paymentReceived:"80000",status:"Confirmed",contract:"",flights:"",accommodation:"",transport:"1 x V-Class (Luzuko)",travelParty:["Junior","Blessing","Mambo","Smooth","Neo","Ayanda","Nivo"],comments:""},
  {id:11,date:"2026-05-23",promoter:"Giant Entertainment",contact:"27748755637",eventType:"Festival",city:"Zimbabwe",venue:"TBC",offer:"TBC",currency:"ZAR",paymentReceived:"",status:"Enquiry",contract:"",flights:"",accommodation:"",transport:"",travelParty:[],comments:""},
  {id:12,date:"2026-05-24",promoter:"Giant Entertainment",contact:"27748755637",eventType:"Festival",city:"Zimbabwe",venue:"TBC",offer:"TBC",currency:"ZAR",paymentReceived:"",status:"Enquiry",contract:"",flights:"",accommodation:"",transport:"",travelParty:[],comments:""},
  {id:13,date:"2026-04-25",promoter:"Goldex Entertainment",contact:"27725092608",eventType:"Festival",city:"Johannesburg - SA",venue:"The Station Newtown",offer:"100000",currency:"ZAR",paymentReceived:"",status:"Enquiry",contract:"",flights:"",accommodation:"",transport:"1 x V-Class (Sosha)",travelParty:["Junior","Blessing","Mambo","Smooth","Neo","Ayanda"],comments:"Keegan / Nivo TBC"},
  {id:14,date:"2026-04-26",promoter:"We Are Events",contact:"27845809882",eventType:"Festival",city:"Mossel Bay",venue:"Kwanonqaba Sports Fields",offer:"150000",currency:"ZAR",paymentReceived:"",status:"Enquiry",contract:"",flights:"",accommodation:"",transport:"",travelParty:[],comments:""},
  {id:15,date:"2026-04-25",promoter:"Thulz",contact:"27815094296",eventType:"Festival",city:"Sun City",venue:"TBC",offer:"125000",currency:"ZAR",paymentReceived:"",status:"Confirmed",contract:"",flights:"",accommodation:"",transport:"",travelParty:["Junior","Blessing","Mambo","Smooth","Neo","Ayanda"],comments:"Keegan / Nivo TBC"},
  {id:16,date:"2026-04-25",promoter:"Giant Entertainment",contact:"27748755637",eventType:"Festival",city:"Bulawayo Shutdown",venue:"TBC",offer:"170000",currency:"ZAR",paymentReceived:"",status:"Enquiry",contract:"",flights:"",accommodation:"",transport:"",travelParty:[],comments:""},
  {id:17,date:"2026-04-26",promoter:"Thulz",contact:"",eventType:"Festival",city:"Cape Town",venue:"TBC",offer:"125000",currency:"ZAR",paymentReceived:"",status:"Enquiry",contract:"",flights:"",accommodation:"",transport:"",travelParty:[],comments:""},
  {id:18,date:"2026-05-09",promoter:"Aly",contact:"256755825368",eventType:"Festival",city:"Kenya",venue:"TBC",offer:"TBC",currency:"USD",paymentReceived:"",status:"Enquiry",contract:"",flights:"",accommodation:"",transport:"",travelParty:[],comments:""},
  {id:19,date:"2026-05-30",promoter:"Sane C4",contact:"27747531007",eventType:"Festival",city:"Botswana",venue:"TBC",offer:"150000",currency:"ZAR",paymentReceived:"75000",status:"Contract Issued",contract:"Contract issued — awaiting signature",flights:"",accommodation:"",transport:"",travelParty:["Junior","Blessing","Mambo","Smooth","Neo","Ayanda","Keegan"],comments:"Awaiting signature"},
  {id:20,date:"2026-05-30",promoter:"Africa Day Festival",contact:"27712099216",eventType:"Festival",city:"Pretoria North",venue:"TBC",offer:"TBC",currency:"ZAR",paymentReceived:"",status:"Enquiry",contract:"",flights:"",accommodation:"",transport:"",travelParty:[],comments:"Very early enquiry"},
  {id:21,date:"2026-07-03",promoter:"Lusanda",contact:"27832429237",eventType:"Festival",city:"Durban",venue:"TBC",offer:"200000",currency:"ZAR",paymentReceived:"",status:"Enquiry",contract:"",flights:"",accommodation:"",transport:"",travelParty:[],comments:""},
  {id:22,date:"2026-07-04",promoter:"Layla Ent Online",contact:"27646867548",eventType:"Festival",city:"Durban",venue:"Greyville Racecourse",offer:"200000",currency:"ZAR",paymentReceived:"",status:"Enquiry",contract:"",flights:"",accommodation:"",transport:"",travelParty:[],comments:""},
  {id:23,date:"2026-07-31",promoter:"Giant Entertainment",contact:"27748755637",eventType:"Festival",city:"Kadoma - Zimbabwe",venue:"Odyssey Kadoma",offer:"150000",currency:"ZAR",paymentReceived:"",status:"Cancelled",contract:"",flights:"",accommodation:"",transport:"",travelParty:[],comments:"Promoter opted for a different lineup"},
  {id:24,date:"2026-09-28",promoter:"Gobs",contact:"27765362893",eventType:"Festival",city:"Swaziland",venue:"Malkerns Country Club",offer:"300000",currency:"ZAR",paymentReceived:"",status:"Enquiry",contract:"",flights:"",accommodation:"",transport:"",travelParty:[],comments:""},
];

const STAGES=[
  {id:"mp3",label:"MP3 Received",icon:"🎵",desc:"Audio file received from artist"},
  {id:"producer",label:"Producer ID'd",icon:"👤",desc:"Producer identified & contact logged"},
  {id:"negotiate",label:"Licence Negotiation",icon:"📋",desc:"Beat licence agreement in progress"},
  {id:"payment",label:"Beat Payment",icon:"💳",desc:"Invoice raised & payment made"},
  {id:"stems_req",label:"Stems Requested",icon:"📤",desc:"Stem files requested from producer"},
  {id:"stems_rec",label:"Stems Received",icon:"📥",desc:"Stem files received & uploaded"},
  {id:"mix_sent",label:"Sent to Mix",icon:"🎛",desc:"Stems delivered to mixing engineer"},
  {id:"mix_back",label:"Mix Returned",icon:"🔊",desc:"Mixed track received back"},
  {id:"approval",label:"Artist Approval",icon:"✍",desc:"Nasty C has formally signed off"},
  {id:"delivery",label:"Platoon Delivery",icon:"🚀",desc:"All assets confirmed & delivered"},
];
const DITEMS=["Audio (Mixed & Mastered)","Signed Contracts","Split Sheet","Lyrics","Cover Art"];
const NC: Record<string, string>={Signed:G.green,"N/A":G.sub,Pending:G.amber,Negotiating:G.orange,"Not Started":G.dim};

const mkT=(id: number,title: string,producer: string,sc: number,neg: string,fee: number,notes: string,del?: any)=>({
  id,title,producer,stagesComplete:sc,negStatus:neg,beatFee:fee,notes,
  delivery:del||Object.fromEntries(DITEMS.map(d=>[d,false])),
});

const IP=[{
  id:"free-deluxe",title:"FREE — Deluxe Edition",artist:"Nasty C",distributor:"Platoon",
  releaseDate:"2026-03-13",status:"In Progress",tracks:[
    mkT(1,"Bookoo Bucks","Gemini Major",10,"Signed",25000,"Fully delivered to Platoon",Object.fromEntries(DITEMS.map(d=>[d,true]))),
    mkT(2,"Strings & Bling Freestyle","Nasty C",9,"N/A",0,"Self-produced. Awaiting cover art upload.",{...Object.fromEntries(DITEMS.map(d=>[d,true])),"Cover Art":false}),
    mkT(3,"SMA","Tweezy",8,"Signed",18000,"Mix returned, awaiting final artist approval",{...Object.fromEntries(DITEMS.map(d=>[d,false])),"Signed Contracts":true,"Split Sheet":true}),
    mkT(4,"Jack","DJ Maphorisa",7,"Signed",30000,"Mix received back from engineer",{"Audio (Mixed & Mastered)":false,"Signed Contracts":true,"Split Sheet":false,"Lyrics":false,"Cover Art":false}),
    mkT(5,"Emazulwini","FNX Omar",6,"Signed",15000,"Stems sent to mixing engineer",Object.fromEntries(DITEMS.map(d=>[d,false]))),
    mkT(6,"There They Go","Young Stunna",5,"Signed",20000,"Stems received, preparing for mix",Object.fromEntries(DITEMS.map(d=>[d,false]))),
    mkT(7,"Lemons (Lemonade)","Kato On The Track",4,"Pending",22000,"Beat payment made, awaiting stems",Object.fromEntries(DITEMS.map(d=>[d,false]))),
    mkT(8,"God Flow","LiquidBeatz",3,"Negotiating",18000,"Licence under negotiation",Object.fromEntries(DITEMS.map(d=>[d,false]))),
    mkT(9,"Palm Trees","Nasty C",9,"N/A",0,"Self-produced. Mix approved, delivery pending cover art",{"Audio (Mixed & Mastered)":true,"Signed Contracts":true,"Split Sheet":true,"Lyrics":true,"Cover Art":false}),
    mkT(10,"Phases","The Binks",2,"Negotiating",16000,"Producer identified, negotiation started",Object.fromEntries(DITEMS.map(d=>[d,false]))),
    mkT(11,"Said ft. Ari Lennox","NV",4,"Signed",20000,"Beat payment made, awaiting stems",Object.fromEntries(DITEMS.map(d=>[d,false]))),
    mkT(12,"Always","DJ Ph",1,"Not Started",0,"MP3 received, producer not yet identified",Object.fromEntries(DITEMS.map(d=>[d,false]))),
  ]
}];

const fmt=(v: any,c="ZAR")=>{if(!v||v==="TBC"||v==="")return v||"—";const n=parseFloat(v);if(isNaN(n))return v;return c==="USD"?`$${n.toLocaleString()}`:`R${n.toLocaleString()}`;};
const fmtD=(d: any)=>{if(!d)return"—";try{return new Date(d).toLocaleDateString("en-ZA",{day:"numeric",month:"short",year:"numeric"});}catch{return d;}};
const getBS=(k: string)=>BSTATUSES.find(s=>s.key===k)||BSTATUSES[0];
const sc=(c: number,t: number)=>{const p=c/t;if(p===1)return G.green;if(p>=.7)return G.cyan;if(p>=.4)return G.amber;return G.dim;};

const PLATOON_DEAL = {
  drawdownTotal:200000, nonRecoupable:50000, recoupable:150000,
  revShareTallRacks:60, revSharePlatoon:40, agreementDate:"2026-04-11",
  licencePeriod:"7 years per recording", minProductCommitment:12,
};
const INIT_INVOICES: any[] = [
  {id:1,date:"2026-04-15",supplier:"Gemini Major",description:"Beat licence — Bookoo Bucks",amount:25000,currency:"USD",type:"Recoupable",status:"Paid",platoonRef:"PLT-2026-001"},
  {id:2,date:"2026-04-18",supplier:"Tweezy",description:"Beat licence — SMA",amount:18000,currency:"USD",type:"Recoupable",status:"Paid",platoonRef:"PLT-2026-002"},
  {id:3,date:"2026-04-20",supplier:"DJ Maphorisa",description:"Beat licence — Jack",amount:30000,currency:"USD",type:"Recoupable",status:"Paid",platoonRef:"PLT-2026-003"},
  {id:4,date:"2026-04-22",supplier:"FNX Omar",description:"Beat licence — Emazulwini",amount:15000,currency:"USD",type:"Recoupable",status:"Paid",platoonRef:"PLT-2026-004"},
  {id:5,date:"2026-04-25",supplier:"Young Stunna",description:"Beat licence — There They Go",amount:20000,currency:"USD",type:"Recoupable",status:"Paid",platoonRef:"PLT-2026-005"},
  {id:6,date:"2026-05-01",supplier:"Studio One",description:"Recording session — FREE Deluxe",amount:8000,currency:"USD",type:"Non-Recoupable",status:"Paid",platoonRef:"PLT-2026-006"},
  {id:7,date:"2026-05-03",supplier:"Mix Master SA",description:"Mixing — 6 tracks",amount:12000,currency:"USD",type:"Non-Recoupable",status:"Paid",platoonRef:"PLT-2026-007"},
  {id:8,date:"2026-05-10",supplier:"Kato On The Track",description:"Beat licence — Lemons (Lemonade)",amount:22000,currency:"USD",type:"Recoupable",status:"Submitted",platoonRef:"PLT-2026-008"},
  {id:9,date:"2026-05-12",supplier:"Cover Art Studio",description:"Album artwork — FREE Deluxe",amount:5000,currency:"USD",type:"Non-Recoupable",status:"Submitted",platoonRef:"PLT-2026-009"},
  {id:10,date:"2026-05-15",supplier:"Mix Master SA",description:"Mixing — remaining 4 tracks",amount:8000,currency:"USD",type:"Non-Recoupable",status:"Pending",platoonRef:""},
  {id:11,date:"2026-05-20",supplier:"LiquidBeatz",description:"Beat licence — God Flow",amount:18000,currency:"USD",type:"Recoupable",status:"Pending",platoonRef:""},
  {id:12,date:"2026-05-22",supplier:"The Binks",description:"Beat licence — Phases",amount:16000,currency:"USD",type:"Recoupable",status:"Pending",platoonRef:""},
];
const INIT_REVENUE: any[] = [
  {id:1,period:"Feb 2026",type:"Digital",source:"Platoon",amount:4820,currency:"USD",date:"2026-03-15",statement:""},
  {id:2,period:"Mar 2026",type:"Digital",source:"Platoon",amount:6340,currency:"USD",date:"2026-04-15",statement:""},
  {id:3,period:"Apr 2026",type:"Digital",source:"Platoon",amount:9210,currency:"USD",date:"2026-05-15",statement:""},
  {id:4,period:"Q1 2026",type:"Sync",source:"Platoon",amount:2500,currency:"USD",date:"2026-04-14",statement:""},
  {id:5,period:"Q4 2025",type:"Royalty",source:"UMG",amount:3800,currency:"USD",date:"2026-01-20",statement:"uploaded"},
  {id:6,period:"Q1 2026",type:"Royalty",source:"UMG",amount:4100,currency:"USD",date:"2026-04-18",statement:"uploaded"},
];
const INV_STATUS_COLORS: Record<string,string> = {Paid:G.green,Submitted:G.amber,Pending:G.dim};
const INIT_CONTACTS: any[] = [
  {id:1,name:"Platoon Ltd",role:"Distributor",category:"Partner",email:"invoices@platoon.ai",phone:"",location:"London, UK",company:"Platoon",notes:"Exclusive distributor. Agreement signed 11 Apr 2026. Contact: Leo Wyndham (signatory).",tags:["Active","Exclusive"],negotiations:[]},
  {id:2,name:"Mzwandile",role:"Music Publisher",category:"Partner",email:"",phone:"",location:"South Africa",company:"ACP",notes:"Handles Nasty C publishing rights. Quarterly sync reporting.",tags:["Active"],negotiations:[]},
  {id:3,name:"UMG South Africa",role:"Legacy Label",category:"Partner",email:"",phone:"",location:"South Africa",company:"Universal Music Group",notes:"Owns catalog: Bad Hair, Zulu Man With Some Power, Strings & Blings, I Love It Here + all features 2018–2024. Quarterly royalty statements.",tags:["Royalties"],negotiations:[]},
  {id:4,name:"Gemini Major",role:"Producer",category:"Producer",email:"",phone:"",location:"South Africa",company:"",notes:"Beat licence — Bookoo Bucks. Signed. R25,000 paid.",tags:["Signed"],negotiations:[{id:1,track:"Bookoo Bucks",status:"Signed",fee:25000,date:"2026-04-15",notes:"Licence executed. Stems received."}]},
  {id:5,name:"Tweezy",role:"Producer",category:"Producer",email:"",phone:"",location:"South Africa",company:"",notes:"Beat licence — SMA. Signed. R18,000 paid.",tags:["Signed"],negotiations:[{id:1,track:"SMA",status:"Signed",fee:18000,date:"2026-04-18",notes:"Licence signed. Stems delivered."}]},
  {id:6,name:"DJ Maphorisa",role:"Producer",category:"Producer",email:"",phone:"",location:"South Africa",company:"",notes:"Beat licence — Jack. Signed. R30,000 paid.",tags:["Signed"],negotiations:[{id:1,track:"Jack",status:"Signed",fee:30000,date:"2026-04-20",notes:"Done."}]},
  {id:7,name:"FNX Omar",role:"Producer",category:"Producer",email:"",phone:"",location:"South Africa",company:"",notes:"Beat licence — Emazulwini. Signed. R15,000 paid.",tags:["Signed"],negotiations:[{id:1,track:"Emazulwini",status:"Signed",fee:15000,date:"2026-04-22",notes:""}]},
  {id:8,name:"Young Stunna",role:"Producer",category:"Producer",email:"",phone:"",location:"South Africa",company:"",notes:"Beat licence — There They Go. Signed. R20,000 paid.",tags:["Signed"],negotiations:[{id:1,track:"There They Go",status:"Signed",fee:20000,date:"2026-04-25",notes:""}]},
  {id:9,name:"Kato On The Track",role:"Producer",category:"Producer",email:"",phone:"",location:"South Africa",company:"",notes:"Beat licence — Lemons (Lemonade). Payment submitted. Awaiting countersigned licence.",tags:["Pending"],negotiations:[{id:1,track:"Lemons (Lemonade)",status:"Pending",fee:22000,date:"2026-05-10",notes:"Invoice submitted to Platoon. Awaiting signed licence from producer."}]},
  {id:10,name:"LiquidBeatz",role:"Producer",category:"Producer",email:"",phone:"",location:"South Africa",company:"",notes:"Beat licence — God Flow. Negotiation in progress.",tags:["Negotiating"],negotiations:[{id:1,track:"God Flow",status:"Negotiating",fee:18000,date:"2026-05-20",notes:"Initial offer made. Producer requested higher fee. Counter-offer pending."}]},
  {id:11,name:"The Binks",role:"Producer",category:"Producer",email:"",phone:"",location:"South Africa",company:"",notes:"Beat licence — Phases. Negotiation just started.",tags:["Negotiating"],negotiations:[{id:1,track:"Phases",status:"Negotiating",fee:16000,date:"2026-05-22",notes:"First contact made. Awaiting producer response."}]},
  {id:12,name:"Mix Master SA",role:"Mixing Engineer",category:"Engineer",email:"",phone:"",location:"South Africa",company:"",notes:"Mixing engineer for FREE Deluxe. 10 tracks. Two invoices submitted.",tags:["Active"],negotiations:[]},
  {id:13,name:"DJ Ph",role:"Producer",category:"Producer",email:"",phone:"",location:"South Africa",company:"",notes:"Beat licence — Always. Producer not yet contacted.",tags:["Not Started"],negotiations:[{id:1,track:"Always",status:"Not Started",fee:0,date:"",notes:"MP3 received. Need to identify and contact producer."}]},
  {id:14,name:"NV",role:"Producer",category:"Producer",email:"",phone:"",location:"South Africa",company:"",notes:"Beat licence — Said ft. Ari Lennox. Payment made. Awaiting stems.",tags:["Signed"],negotiations:[{id:1,track:"Said ft. Ari Lennox",status:"Signed",fee:20000,date:"2026-05-01",notes:"Signed. Beat payment made. Stems not yet received."}]},
];
const CAT_COLORS: Record<string,string>={Partner:"rgba(201,168,76,.15)",Producer:"rgba(139,92,246,.15)",Engineer:"rgba(6,182,212,.15)",Label:"rgba(249,115,22,.15)"};
const CAT_TEXT: Record<string,string>={Partner:G.gold,Producer:G.purple,Engineer:G.cyan,Label:G.orange};
const NEG_STATUS_C: Record<string,string>={Signed:G.green,Pending:G.amber,Negotiating:G.orange,"Not Started":G.dim};

const CSS=`
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@500;600;700&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
::-webkit-scrollbar{width:3px;}::-webkit-scrollbar-track{background:#0A0A0C;}::-webkit-scrollbar-thumb{background:#2A2A2E;border-radius:2px;}
input,select,textarea{font-family:'DM Sans',sans-serif;}
.brow:hover{background:rgba(255,255,255,.025)!important;}
.brow:hover .ra{opacity:1!important;}
.tr:hover{background:rgba(255,255,255,.025)!important;cursor:pointer;}
.btn-p{background:#C9A84C;color:#0A0A0C;border:none;padding:9px 20px;border-radius:6px;font-family:'DM Sans';font-weight:600;font-size:13px;cursor:pointer;transition:.15s;}
.btn-p:hover{background:#E2BC6A;}
.btn-g{background:transparent;border:1px solid #2A2A2E;color:#9CA3AF;padding:9px 16px;border-radius:6px;font-family:'DM Sans';font-size:13px;cursor:pointer;transition:.15s;}
.btn-g:hover{border-color:#4A4A50;color:#E8E6E1;}
.fi{width:100%;background:#161618;border:1px solid #2A2A2E;color:#E8E6E1;padding:9px 12px;border-radius:6px;font-size:13px;outline:none;transition:.15s;}
.fi:focus{border-color:#C9A84C;}
.fl{font-size:11px;font-weight:500;color:#6B7280;text-transform:uppercase;letter-spacing:.08em;margin-bottom:6px;display:block;}
.sbg{display:inline-flex;align-items:center;gap:5px;padding:3px 9px;border-radius:20px;font-size:11px;font-weight:500;white-space:nowrap;}
.sh{display:flex;align-items:center;justify-content:space-between;padding:12px 16px;cursor:pointer;border-radius:8px;transition:.15s;user-select:none;}
.sh:hover{background:rgba(255,255,255,.025);}
.tc{padding:5px 10px;border-radius:4px;font-size:12px;cursor:pointer;border:1px solid #2A2A2E;transition:.12s;background:#161618;color:#9CA3AF;}
.tc.on{background:rgba(201,168,76,.15);border-color:#C9A84C;color:#C9A84C;}
.ov{position:fixed;inset:0;background:rgba(0,0,0,.85);z-index:100;display:flex;align-items:flex-start;justify-content:flex-end;}
.modal{background:#111113;width:520px;height:100vh;overflow-y:auto;padding:32px;border-left:1px solid #1E1E22;animation:sli .2s ease;}
.dpan{background:#0F0F11;height:100vh;overflow-y:auto;padding:28px;border-left:1px solid #1E1E22;animation:sli .2s ease;}
@keyframes sli{from{transform:translateX(16px);opacity:0;}to{transform:translateX(0);opacity:1;}}
.ib{background:none;border:none;cursor:pointer;padding:4px 6px;border-radius:4px;color:#6B7280;font-size:14px;transition:.12s;}
.ib:hover{background:rgba(255,255,255,.06);color:#E8E6E1;}
.del:hover{color:#EF4444!important;}
.sc-card{background:#111113;border:1px solid #1E1E22;border-radius:10px;padding:20px 24px;}
.di{padding:10px 14px;border-radius:6px;display:flex;align-items:center;gap:10px;border:1px solid #1E1E22;background:#0F0F11;cursor:pointer;transition:.12s;}
.di:hover{border-color:#2A2A2E;}
.di.done{border-color:rgba(16,185,129,.25);background:rgba(16,185,129,.05);}
`;

const EB: any={date:"",promoter:"",contact:"",eventType:"Festival",city:"",venue:"",offer:"",currency:"ZAR",paymentReceived:"",status:"Enquiry",contract:"",flights:"",accommodation:"",transport:"",travelParty:[],comments:""};

// ── BOOKINGS ──────────────────────────────────────────────────────────────────
function Bookings() {
  const[bookings,setB]=useState(IB);
  const[search,setS]=useState("");
  const[exp,setExp]=useState(new Set(["Confirmed","Contract Issued","Deposit Received","Invoice Submitted"]));
  const[modal,setM]=useState(false);
  const[editB,setEB]=useState<any>(null);
  const[form,setF]=useState<any>(EB);
  const[detail,setD]=useState<any>(null);
  const[nid,setN]=useState(25);

  const filtered=useMemo(()=>{
    if(!search)return bookings;
    const q=search.toLowerCase();
    return bookings.filter((b: any)=>[b.promoter,b.city,b.venue,b.eventType,b.status].join(" ").toLowerCase().includes(q));
  },[bookings,search]);

  const grouped=useMemo(()=>{
    const g: any={};BSTATUSES.forEach(s=>{g[s.key]=[];});
    filtered.forEach((b: any)=>{(g[b.status]||g["Enquiry"]).push(b);});
    return g;
  },[filtered]);

  const stats=useMemo(()=>{
    const conf=bookings.filter((b: any)=>["Confirmed","Contract Issued","Contract Signed","Deposit Received","Fully Paid"].includes(b.status)).length;
    const val=bookings.reduce((a: number,b: any)=>{const n=parseFloat(b.offer);return a+(isNaN(n)||b.currency==="USD"?0:n);},0);
    const rec=bookings.reduce((a: number,b: any)=>{const n=parseFloat(b.paymentReceived);return a+(isNaN(n)?0:n);},0);
    return{total:bookings.length,conf,val,rec};
  },[bookings]);

  const openAdd=()=>{setEB(null);setF({...EB,travelParty:[]});setM(true);};
  const openEdit=(b: any,e?: any)=>{e&&e.stopPropagation();setEB(b);setF({...b});setM(true);};
  const save=()=>{
    if(editB)setB((p: any)=>p.map((b: any)=>b.id===editB.id?{...form,id:b.id}:b));
    else{setB((p: any)=>[...p,{...form,id:nid}]);setN(n=>n+1);}
    setM(false);
  };
  const del=(id: number,e?: any)=>{e&&e.stopPropagation();setB((p: any)=>p.filter((b: any)=>b.id!==id));if(detail?.id===id)setD(null);};
  const tog=(n: string)=>setF((f: any)=>({...f,travelParty:f.travelParty.includes(n)?f.travelParty.filter((x: string)=>x!==n):[...f.travelParty,n]}));
  const togS=(k: string)=>setExp(p=>{const n=new Set(p);n.has(k)?n.delete(k):n.add(k);return n;});

  return(
    <div style={{padding:"28px 32px"}}>
      <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",marginBottom:20}}>
        <div>
          <div style={{fontSize:11,color:G.gold,fontWeight:500,letterSpacing:".1em",textTransform:"uppercase",marginBottom:4}}>Ivyson Entertainment</div>
          <h1 style={{fontSize:26,fontWeight:700,color:G.text,letterSpacing:"-.02em",fontFamily:"'Syne'"}}>Bookings 2026</h1>
        </div>
        <div style={{display:"flex",gap:10,alignItems:"center"}}>
          <div style={{display:"flex",alignItems:"center",gap:8,background:"#161618",border:`1px solid ${G.muted}`,borderRadius:6,padding:"7px 12px"}}>
            <span style={{fontSize:13,color:G.dim}}>⌕</span>
            <input value={search} onChange={e=>setS(e.target.value)} placeholder="Search…" style={{background:"none",border:"none",color:G.text,fontSize:13,outline:"none",width:160}}/>
          </div>
          <button className="btn-p" onClick={openAdd}>+ New Booking</button>
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:24}}>
        {[{l:"Total Bookings",v:stats.total,s:"all enquiries & shows"},{l:"Confirmed Shows",v:stats.conf,s:"verbally agreed or above"},{l:"Pipeline Value",v:`R${(stats.val/1000).toFixed(0)}k`,s:"ZAR only, excl TBC"},{l:"Received",v:`R${(stats.rec/1000).toFixed(0)}k`,s:"payments collected"}].map(c=>(
          <div key={c.l} className="sc-card">
            <div style={{fontSize:11,color:G.dim,textTransform:"uppercase",letterSpacing:".08em",marginBottom:8}}>{c.l}</div>
            <div style={{fontSize:28,fontWeight:700,color:G.text,letterSpacing:"-.02em",lineHeight:1,fontFamily:"'Syne'"}}>{c.v}</div>
            <div style={{fontSize:11,color:G.dim,marginTop:4}}>{c.s}</div>
          </div>
        ))}
      </div>

      <div style={{display:"flex",flexDirection:"column",gap:6}}>
        {BSTATUSES.map(st=>{
          const grp=grouped[st.key]||[];
          if(!grp.length)return null;
          const open=exp.has(st.key);
          const gv=grp.reduce((a: number,b: any)=>{const n=parseFloat(b.offer);return a+(isNaN(n)||b.currency==="USD"?0:n);},0);
          return(
            <div key={st.key} style={{border:`1px solid ${G.border}`,borderRadius:10,overflow:"hidden"}}>
              <div className="sh" onClick={()=>togS(st.key)} style={{background:"#111113"}}>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <div style={{width:7,height:7,borderRadius:"50%",background:st.dot}}/>
                  <span style={{fontSize:13,fontWeight:500,color:"#D1D5DB"}}>{st.label}</span>
                  <span style={{background:G.muted,color:G.sub,fontSize:11,padding:"1px 7px",borderRadius:10,fontFamily:"'DM Mono'"}}>{grp.length}</span>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:12}}>
                  {gv>0&&<span style={{fontSize:12,color:G.dim,fontFamily:"'DM Mono'"}}>R{gv.toLocaleString()}</span>}
                  <span style={{color:G.dim,fontSize:11}}>{open?"▲":"▼"}</span>
                </div>
              </div>
              {open&&(
                <div>
                  <div style={{display:"grid",gridTemplateColumns:"110px 1fr 130px 1fr 100px 100px 60px",padding:"8px 16px",borderTop:`1px solid #1A1A1E`,background:"#0D0D0F"}}>
                    {["Date","Promoter","Event Type","City / Venue","Offer","Payment",""].map((h,i)=>(
                      <div key={i} style={{fontSize:10,color:G.dim,textTransform:"uppercase",letterSpacing:".08em",fontWeight:500}}>{h}</div>
                    ))}
                  </div>
                  {grp.map((b: any)=>(
                    <div key={b.id} className="brow" onClick={()=>setD(b)} style={{display:"grid",gridTemplateColumns:"110px 1fr 130px 1fr 100px 100px 60px",padding:"11px 16px",borderTop:`1px solid ${G.bg}`,cursor:"pointer",alignItems:"center"}}>
                      <div style={{fontSize:12,color:G.sub,fontFamily:"'DM Mono'"}}>{fmtD(b.date)}</div>
                      <div>
                        <div style={{fontSize:13,fontWeight:500,color:G.text}}>{b.promoter}</div>
                        {b.contact&&<div style={{fontSize:11,color:G.dim,marginTop:1}}>{b.contact}</div>}
                      </div>
                      <div style={{fontSize:12,color:G.sub}}>{b.eventType}</div>
                      <div>
                        <div style={{fontSize:12,color:"#D1D5DB"}}>{b.city}</div>
                        {b.venue&&b.venue!=="TBC"&&<div style={{fontSize:11,color:G.dim,marginTop:1}}>{b.venue}</div>}
                      </div>
                      <div style={{fontSize:13,color:G.text,fontFamily:"'DM Mono'",fontWeight:500}}>{fmt(b.offer,b.currency)}</div>
                      <div style={{fontSize:12,color:b.paymentReceived&&b.paymentReceived!=="-"?G.green:G.dim,fontFamily:"'DM Mono'"}}>{b.paymentReceived&&b.paymentReceived!=="-"?fmt(b.paymentReceived,b.currency):"—"}</div>
                      <div className="ra" style={{opacity:0,display:"flex",gap:2,transition:"opacity .15s"}}>
                        <button className="ib" onClick={(e)=>openEdit(b,e)}>✏️</button>
                        <button className="ib del" onClick={(e)=>del(b.id,e)}>🗑</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {detail&&!modal&&(
        <div className="ov" onClick={()=>setD(null)}>
          <div className="dpan" style={{width:460}} onClick={e=>e.stopPropagation()}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20}}>
              <div>
                <div style={{fontSize:11,color:G.dim,textTransform:"uppercase",letterSpacing:".08em",marginBottom:4}}>{fmtD(detail.date)}</div>
                <h2 style={{fontSize:20,fontWeight:700,color:G.text,fontFamily:"'Syne'"}}>{detail.promoter}</h2>
              </div>
              <div style={{display:"flex",gap:6}}>
                <button className="ib" onClick={(e: any)=>{setD(null);openEdit(detail,e);}}>✏️</button>
                <button className="ib" onClick={()=>setD(null)} style={{fontSize:16}}>✕</button>
              </div>
            </div>
            {(()=>{const s=getBS(detail.status);return(<span className="sbg" style={{background:s.bg,color:s.color,fontSize:12,padding:"5px 12px",marginBottom:18,display:"inline-flex"}}><span style={{width:6,height:6,borderRadius:"50%",background:s.dot,display:"inline-block"}}/>{s.label}</span>);})()}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:18}}>
              {[["Event Type",detail.eventType],["City",detail.city],["Venue",detail.venue||"TBC"],["Contact",detail.contact||"—"],["Offer",fmt(detail.offer,detail.currency)],["Payment Received",detail.paymentReceived?fmt(detail.paymentReceived,detail.currency):"—"]].map(([l,v])=>(
                <div key={l}><div className="fl">{l}</div><div style={{fontSize:13,color:"#D1D5DB"}}>{v}</div></div>
              ))}
            </div>
            <div style={{marginBottom:18}}>
              <div className="fl" style={{marginBottom:10}}>Documents</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                {(["contract","flights","accommodation","transport"] as const).map(doc=>(
                  <div key={doc} style={{background:"#161618",border:`1px solid ${G.muted}`,borderRadius:6,padding:"10px 12px",display:"flex",alignItems:"center",gap:8}}>
                    <span style={{fontSize:11,color:detail[doc]?G.green:"#374151"}}>{detail[doc]?"✓":"○"}</span>
                    <div>
                      <div style={{fontSize:11,color:detail[doc]?G.green:G.sub,textTransform:"capitalize"}}>{doc}</div>
                      {detail[doc]&&<div style={{fontSize:10,color:G.dim,marginTop:1}}>{detail[doc]}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {detail.travelParty?.length>0&&(
              <div style={{marginBottom:18}}>
                <div className="fl">Travel Party</div>
                <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                  {detail.travelParty.map((n: string)=><span key={n} style={{background:"#1E1E22",color:"#D1D5DB",fontSize:12,padding:"4px 10px",borderRadius:4}}>{n}</span>)}
                </div>
              </div>
            )}
            {detail.comments&&(
              <div style={{marginBottom:18}}>
                <div className="fl">Notes</div>
                <div style={{background:"#161618",border:`1px solid ${G.muted}`,borderRadius:6,padding:12,fontSize:13,color:G.sub,lineHeight:1.5}}>{detail.comments}</div>
              </div>
            )}
            <button className="btn-p" style={{width:"100%"}} onClick={(e: any)=>{setD(null);openEdit(detail,e);}}>Edit Booking</button>
          </div>
        </div>
      )}

      {modal&&(
        <div className="ov" onClick={()=>setM(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24}}>
              <h2 style={{fontSize:18,fontWeight:700,color:G.text,fontFamily:"'Syne'"}}>{editB?"Edit Booking":"New Booking"}</h2>
              <button onClick={()=>setM(false)} style={{background:"none",border:"none",color:G.sub,fontSize:18,cursor:"pointer"}}>✕</button>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:14}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                <div><label className="fl">Date</label><input type="date" className="fi" value={form.date} onChange={e=>setF((f: any)=>({...f,date:e.target.value}))}/></div>
                <div><label className="fl">Status</label><select className="fi" value={form.status} onChange={e=>setF((f: any)=>({...f,status:e.target.value}))}>{BSTATUSES.map(s=><option key={s.key} value={s.key}>{s.label}</option>)}</select></div>
              </div>
              <div><label className="fl">Promoter</label><input className="fi" placeholder="Promoter name" value={form.promoter} onChange={e=>setF((f: any)=>({...f,promoter:e.target.value}))}/></div>
              <div><label className="fl">Contact Number</label><input className="fi" placeholder="+27…" value={form.contact} onChange={e=>setF((f: any)=>({...f,contact:e.target.value}))}/></div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                <div><label className="fl">Event Type</label><input className="fi" value={form.eventType} onChange={e=>setF((f: any)=>({...f,eventType:e.target.value}))}/></div>
                <div><label className="fl">City</label><input className="fi" value={form.city} onChange={e=>setF((f: any)=>({...f,city:e.target.value}))}/></div>
              </div>
              <div><label className="fl">Venue</label><input className="fi" value={form.venue} onChange={e=>setF((f: any)=>({...f,venue:e.target.value}))}/></div>
              <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:12}}>
                <div><label className="fl">Offer / Fee</label><input className="fi" placeholder="Amount or TBC" value={form.offer} onChange={e=>setF((f: any)=>({...f,offer:e.target.value}))}/></div>
                <div><label className="fl">Currency</label><select className="fi" value={form.currency} onChange={e=>setF((f: any)=>({...f,currency:e.target.value}))}><option value="ZAR">ZAR</option><option value="USD">USD</option></select></div>
              </div>
              <div><label className="fl">Payment Received</label><input className="fi" value={form.paymentReceived} onChange={e=>setF((f: any)=>({...f,paymentReceived:e.target.value}))}/></div>
              {(["contract","flights","accommodation","transport"] as const).map(doc=>(
                <div key={doc}><label className="fl" style={{textTransform:"capitalize"}}>{doc}</label><input className="fi" value={form[doc]} onChange={e=>setF((f: any)=>({...f,[doc]:e.target.value}))}/></div>
              ))}
              <div>
                <label className="fl" style={{marginBottom:10}}>Travel Party</label>
                <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                  {TEAM.map(n=><button key={n} className={`tc${form.travelParty.includes(n)?" on":""}`} onClick={()=>tog(n)} type="button">{n}</button>)}
                </div>
              </div>
              <div><label className="fl">Notes</label><textarea className="fi" rows={3} style={{resize:"vertical"}} value={form.comments} onChange={e=>setF((f: any)=>({...f,comments:e.target.value}))}/></div>
              <div style={{display:"flex",gap:10,paddingTop:6}}>
                <button className="btn-p" style={{flex:1}} onClick={save}>{editB?"Save Changes":"Add Booking"}</button>
                <button className="btn-g" onClick={()=>setM(false)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── PIPELINE ──────────────────────────────────────────────────────────────────
function Pipeline() {
  const[projects,setP]=useState(IP);
  const[sel,setSel]=useState<any>(null);
  const[panel,setPan]=useState(false);

  const proj=projects[0];
  const tracks=proj.tracks;
  const total=STAGES.length;
  const allDone=tracks.filter(t=>t.stagesComplete===total).length;
  const inProg=tracks.filter(t=>t.stagesComplete>0&&t.stagesComplete<total).length;
  const platReady=tracks.filter(t=>Object.values(t.delivery).every(Boolean)).length;

  const open=(t: any)=>{setSel({...t,delivery:{...t.delivery}});setPan(true);};

  const togStage=(tid: number,i: number)=>{
    const update=(t: any)=>t.id===tid?{...t,stagesComplete:i+1===t.stagesComplete?i:Math.max(t.stagesComplete,i+1)}:t;
    setP(p=>p.map(pr=>({...pr,tracks:pr.tracks.map(update)})));
    setSel((s: any)=>s&&s.id===tid?update(s):s);
  };

  const togDel=(tid: number,item: string)=>{
    const update=(t: any)=>t.id===tid?{...t,delivery:{...t.delivery,[item]:!t.delivery[item]}}:t;
    setP(p=>p.map(pr=>({...pr,tracks:pr.tracks.map(update)})));
    setSel((s: any)=>s&&s.id===tid?update(s):s);
  };

  const pct=(t: any)=>Math.round((t.stagesComplete/total)*100);
  const dp=(t: any)=>{const v=Object.values(t.delivery) as boolean[];return Math.round((v.filter(Boolean).length/v.length)*100);};

  return(
    <div style={{padding:"28px 32px"}}>
      <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",marginBottom:20}}>
        <div>
          <div style={{fontSize:11,color:G.gold,fontWeight:500,letterSpacing:".1em",textTransform:"uppercase",marginBottom:4}}>Tall Racks Music · Platoon Distribution</div>
          <h1 style={{fontSize:26,fontWeight:700,color:G.text,letterSpacing:"-.02em",fontFamily:"'Syne'"}}>{proj.title}</h1>
          <div style={{fontSize:13,color:G.sub,marginTop:4}}>Release: {fmtD(proj.releaseDate)} · {tracks.length} tracks · Minimum Product Commitment</div>
        </div>
        <button className="btn-p">+ Add Track</button>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:24}}>
        {[{l:"Total Tracks",v:tracks.length,s:"of 12 MPC"},{l:"Fully Complete",v:allDone,s:"all 10 stages done"},{l:"In Progress",v:inProg,s:"pipeline active"},{l:"Platoon Ready",v:platReady,s:"all 5 assets confirmed"}].map(c=>(
          <div key={c.l} className="sc-card">
            <div style={{fontSize:11,color:G.dim,textTransform:"uppercase",letterSpacing:".08em",marginBottom:8}}>{c.l}</div>
            <div style={{fontSize:28,fontWeight:700,color:G.text,letterSpacing:"-.02em",lineHeight:1,fontFamily:"'Syne'"}}>{c.v}</div>
            <div style={{fontSize:11,color:G.dim,marginTop:4}}>{c.s}</div>
          </div>
        ))}
      </div>

      <div style={{marginBottom:20,background:"#111113",border:`1px solid ${G.border}`,borderRadius:10,padding:"14px 20px"}}>
        <div style={{fontSize:10,color:G.dim,textTransform:"uppercase",letterSpacing:".1em",marginBottom:12,fontWeight:500}}>10-Stage Pipeline</div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          {STAGES.map((s,i)=>(
            <div key={s.id} style={{display:"flex",alignItems:"center",gap:5,background:"#161618",border:`1px solid ${G.muted}`,borderRadius:6,padding:"5px 10px"}}>
              <span style={{fontSize:10,color:G.dim,fontFamily:"'DM Mono'",fontWeight:500,minWidth:12}}>{i+1}</span>
              <span style={{fontSize:10}}>{s.icon}</span>
              <span style={{fontSize:11,color:G.sub}}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{border:`1px solid ${G.border}`,borderRadius:10,overflow:"hidden"}}>
        <div style={{display:"grid",gridTemplateColumns:"36px 1fr 110px 130px 220px 90px",padding:"10px 20px",background:"#0D0D0F",borderBottom:`1px solid ${G.border}`}}>
          {["#","Track","Producer","Negotiation","Pipeline Progress","Delivery"].map((h,i)=>(
            <div key={i} style={{fontSize:10,color:G.dim,textTransform:"uppercase",letterSpacing:".08em",fontWeight:500}}>{h}</div>
          ))}
        </div>
        {tracks.map((t,idx)=>{
          const p=pct(t);const d=dp(t);const nc=NC[t.negStatus]||G.dim;const pc=sc(t.stagesComplete,total);
          return(
            <div key={t.id} className="tr" onClick={()=>open(t)}
              style={{display:"grid",gridTemplateColumns:"36px 1fr 110px 130px 220px 90px",padding:"13px 20px",borderTop:`1px solid ${G.bg}`,alignItems:"center",transition:"background .1s"}}>
              <div style={{fontSize:12,color:G.dim,fontFamily:"'DM Mono'",fontWeight:500}}>{String(idx+1).padStart(2,"0")}</div>
              <div>
                <div style={{fontSize:13,fontWeight:500,color:G.text}}>{t.title}</div>
                <div style={{fontSize:11,color:G.dim,marginTop:2,maxWidth:230,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{t.notes}</div>
              </div>
              <div style={{fontSize:12,color:G.sub}}>{t.producer}</div>
              <div>
                <span style={{fontSize:11,color:nc,background:`${nc}20`,padding:"3px 8px",borderRadius:10,fontWeight:500}}>{t.negStatus}</span>
                {t.beatFee>0&&<div style={{fontSize:11,color:G.dim,marginTop:3,fontFamily:"'DM Mono'"}}>R{t.beatFee.toLocaleString()}</div>}
              </div>
              <div>
                <div style={{display:"flex",gap:3,marginBottom:5}}>
                  {STAGES.map((_,i)=>(
                    <div key={i} style={{width:16,height:4,borderRadius:2,background:i<t.stagesComplete?pc:G.muted,transition:"background .2s"}}/>
                  ))}
                </div>
                <div style={{fontSize:11,color:pc,fontFamily:"'DM Mono'"}}>{p}% · {t.stagesComplete}/{total} stages</div>
              </div>
              <div>
                <div style={{display:"flex",gap:3,marginBottom:4}}>
                  {DITEMS.map((item,i)=>(
                    <div key={i} style={{width:11,height:11,borderRadius:2,background:t.delivery[item]?G.green:G.muted}} title={item}/>
                  ))}
                </div>
                <div style={{fontSize:11,color:d===100?G.green:G.dim,fontFamily:"'DM Mono'"}}>{d}%</div>
              </div>
            </div>
          );
        })}
      </div>

      {panel&&sel&&(
        <div className="ov" onClick={()=>setPan(false)}>
          <div className="dpan" style={{width:500}} onClick={e=>e.stopPropagation()}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20}}>
              <div>
                <div style={{fontSize:11,color:G.gold,textTransform:"uppercase",letterSpacing:".08em",marginBottom:4}}>Track {sel.id} · {proj.title}</div>
                <h2 style={{fontSize:20,fontWeight:700,color:G.text,fontFamily:"'Syne'"}}>{sel.title}</h2>
                <div style={{fontSize:13,color:G.sub,marginTop:3}}>
                  {sel.producer}{sel.beatFee>0&&<span style={{color:G.dim}}> · R{sel.beatFee.toLocaleString()}</span>}
                </div>
              </div>
              <button className="ib" onClick={()=>setPan(false)} style={{fontSize:16}}>✕</button>
            </div>

            {sel.notes&&<div style={{background:"#161618",border:`1px solid ${G.muted}`,borderRadius:6,padding:"10px 14px",marginBottom:22,fontSize:13,color:G.sub,lineHeight:1.5}}>{sel.notes}</div>}

            <div style={{marginBottom:20,display:"flex",gap:8,alignItems:"center"}}>
              <div className="fl" style={{marginBottom:0}}>Negotiation:</div>
              <span style={{fontSize:12,color:NC[sel.negStatus]||G.dim,background:`${NC[sel.negStatus]||G.dim}20`,padding:"3px 10px",borderRadius:10,fontWeight:500}}>{sel.negStatus}</span>
              {sel.beatFee>0&&<span style={{fontSize:12,color:G.dim}}>Beat fee: R{sel.beatFee.toLocaleString()}</span>}
            </div>

            <div style={{marginBottom:26}}>
              <div style={{fontSize:11,color:G.sub,fontWeight:500,textTransform:"uppercase",letterSpacing:".08em",marginBottom:14}}>Pipeline Stages <span style={{color:G.dim,fontWeight:400,textTransform:"none",letterSpacing:0,fontSize:11}}>— click to mark complete</span></div>
              <div style={{display:"flex",flexDirection:"column"}}>
                {STAGES.map((stage,i)=>{
                  const done=i<sel.stagesComplete;const curr=i===sel.stagesComplete;const last=i===STAGES.length-1;
                  return(
                    <div key={stage.id} style={{display:"flex",gap:14,alignItems:"flex-start"}}>
                      <div style={{display:"flex",flexDirection:"column",alignItems:"center",flexShrink:0}}>
                        <div onClick={()=>togStage(sel.id,i)}
                          style={{width:28,height:28,borderRadius:"50%",background:done?"rgba(16,185,129,.15)":curr?"rgba(201,168,76,.15)":"#161618",border:`1.5px solid ${done?G.green:curr?G.gold:G.muted}`,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",transition:"all .2s",flexShrink:0}}>
                          {done?<span style={{color:G.green,fontSize:12}}>✓</span>:<span style={{fontSize:11}}>{stage.icon}</span>}
                        </div>
                        {!last&&<div style={{width:2,height:18,background:done?G.green:G.muted,margin:"2px auto",transition:"background .2s"}}/>}
                      </div>
                      <div style={{paddingBottom:last?0:12,flex:1,paddingTop:5}}>
                        <div style={{display:"flex",alignItems:"center",gap:8}}>
                          <span style={{fontSize:13,fontWeight:done?400:curr?500:400,color:done?G.sub:curr?G.text:G.dim}}>{stage.label}</span>
                          {curr&&<span style={{fontSize:10,background:"rgba(201,168,76,.15)",color:G.gold,padding:"2px 7px",borderRadius:10,fontWeight:500}}>CURRENT</span>}
                        </div>
                        <div style={{fontSize:11,color:G.dim,marginTop:1}}>{stage.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
                <div style={{fontSize:11,color:G.sub,fontWeight:500,textTransform:"uppercase",letterSpacing:".08em"}}>Platoon Delivery Checklist</div>
                <span style={{fontSize:11,color:G.dim,fontFamily:"'DM Mono'"}}>{Object.values(sel.delivery).filter(Boolean).length}/{DITEMS.length}</span>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:7}}>
                {DITEMS.map(item=>{
                  const done=sel.delivery[item];
                  return(
                    <div key={item} className={`di${done?" done":""}`} onClick={()=>togDel(sel.id,item)}>
                      <div style={{width:20,height:20,borderRadius:5,border:`1.5px solid ${done?G.green:G.muted}`,background:done?"rgba(16,185,129,.15)":"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all .2s"}}>
                        {done&&<span style={{color:G.green,fontSize:11}}>✓</span>}
                      </div>
                      <span style={{fontSize:13,color:done?"#D1D5DB":G.sub,flex:1}}>{item}</span>
                      <span style={{fontSize:11,color:done?G.green:G.dim}}>{done?"Uploaded":"Pending"}</span>
                    </div>
                  );
                })}
              </div>
              {Object.values(sel.delivery).every(Boolean)&&(
                <div style={{marginTop:14,background:"rgba(16,185,129,.08)",border:"1px solid rgba(16,185,129,.2)",borderRadius:8,padding:"12px 16px",display:"flex",alignItems:"center",gap:10}}>
                  <span style={{fontSize:16}}>🚀</span>
                  <div>
                    <div style={{fontSize:13,color:G.green,fontWeight:500}}>Ready for Platoon delivery</div>
                    <div style={{fontSize:11,color:G.dim,marginTop:1}}>All 5 assets confirmed</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── FINANCIALS ────────────────────────────────────────────────────────────────
function Financials() {
  const [invoices, setInvoices] = useState(INIT_INVOICES);
  const [revenue] = useState(INIT_REVENUE);
  const [activeTab, setActiveTab] = useState("platoon");
  const [invModal, setInvModal] = useState(false);
  const [editInv, setEditInv] = useState<any>(null);
  const [invForm, setInvForm] = useState<any>({date:"",supplier:"",description:"",amount:"",currency:"USD",type:"Recoupable",status:"Pending",platoonRef:""});
  const [nid, setNid] = useState(13);

  const paidInvoices = invoices.filter((i: any)=>i.status==="Paid");
  const nonRecoupDrawn = paidInvoices.filter((i: any)=>i.type==="Non-Recoupable").reduce((a: number,i: any)=>a+i.amount,0);
  const recoupDrawn = paidInvoices.filter((i: any)=>i.type==="Recoupable").reduce((a: number,i: any)=>a+i.amount,0);
  const totalDrawn = nonRecoupDrawn + recoupDrawn;
  const nonRecoupRemaining = Math.max(0, PLATOON_DEAL.nonRecoupable - nonRecoupDrawn);
  const recoupRemaining = Math.max(0, PLATOON_DEAL.recoupable - recoupDrawn);
  const totalRemaining = PLATOON_DEAL.drawdownTotal - totalDrawn;

  const platoonRevenue = revenue.filter((r: any)=>r.source==="Platoon").reduce((a: number,r: any)=>a+r.amount,0);
  const tallRacksShare = platoonRevenue * (PLATOON_DEAL.revShareTallRacks/100);
  const recoupProgress = Math.min(100, Math.round((tallRacksShare / PLATOON_DEAL.recoupable)*100));
  const remainingToRecoup = Math.max(0, PLATOON_DEAL.recoupable - tallRacksShare);

  const monthlyAvg = platoonRevenue / 3;
  const monthsLeft = monthlyAvg > 0 ? Math.ceil(remainingToRecoup / (monthlyAvg * PLATOON_DEAL.revShareTallRacks/100)) : null;
  const projDate = monthsLeft ? new Date(Date.now() + monthsLeft*30*24*60*60*1000).toLocaleDateString("en-ZA",{month:"short",year:"numeric"}) : "—";

  const umgRevenue = revenue.filter((r: any)=>r.source==="UMG").reduce((a: number,r: any)=>a+r.amount,0);

  const openAddInv = () => { setEditInv(null); setInvForm({date:"",supplier:"",description:"",amount:"",currency:"USD",type:"Recoupable",status:"Pending",platoonRef:""}); setInvModal(true); };
  const openEditInv = (inv: any,e?: any) => { e&&e.stopPropagation(); setEditInv(inv); setInvForm({...inv}); setInvModal(true); };
  const saveInv = () => {
    if(editInv) setInvoices((p: any)=>p.map((i: any)=>i.id===editInv.id?{...invForm,id:i.id}:i));
    else { setInvoices((p: any)=>[...p,{...invForm,id:nid,amount:parseFloat(invForm.amount)||0}]); setNid(n=>n+1); }
    setInvModal(false);
  };

  const Bar = ({value,max,color,height=6}: {value: number,max: number,color: string,height?: number}) => (
    <div style={{background:G.muted,borderRadius:height,height,overflow:"hidden",width:"100%"}}>
      <div style={{width:`${Math.min(100,Math.round((value/max)*100))}%`,height:"100%",background:color,borderRadius:height,transition:"width .6s ease"}}/>
    </div>
  );

  const TABS = [{k:"platoon",l:"Platoon Deal"},{k:"invoices",l:"Invoices"},{k:"revenue",l:"Revenue"},{k:"umg",l:"UMG Royalties"}];

  return (
    <div style={{padding:"28px 32px"}}>
      <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",marginBottom:24}}>
        <div>
          <div style={{fontSize:11,color:G.gold,fontWeight:500,letterSpacing:".1em",textTransform:"uppercase",marginBottom:4}}>Tall Racks Music</div>
          <h1 style={{fontSize:26,fontWeight:700,color:G.text,letterSpacing:"-.02em",fontFamily:"'Syne'"}}>Financials</h1>
        </div>
        <button className="btn-p" onClick={openAddInv}>+ Add Invoice</button>
      </div>

      <div style={{display:"flex",gap:2,marginBottom:24,background:"#111113",border:`1px solid ${G.border}`,borderRadius:8,padding:4,width:"fit-content"}}>
        {TABS.map(t=>(
          <button key={t.k} onClick={()=>setActiveTab(t.k)}
            style={{padding:"7px 16px",borderRadius:6,fontSize:13,color:activeTab===t.k?G.text:G.sub,background:activeTab===t.k?"#1E1E22":"transparent",border:"none",cursor:"pointer",fontFamily:"'DM Sans'",fontWeight:activeTab===t.k?500:400,transition:".12s"}}>
            {t.l}
          </button>
        ))}
      </div>

      {activeTab==="platoon" && (
        <div>
          <div style={{background:"#111113",border:`1px solid ${G.border}`,borderRadius:12,padding:"20px 24px",marginBottom:20}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
              <div>
                <div style={{fontSize:13,fontWeight:600,color:G.text}}>Platoon Distribution Agreement</div>
                <div style={{fontSize:12,color:G.sub,marginTop:2}}>Signed {fmtD("2026-04-11")} · 7-year licence per recording · {PLATOON_DEAL.revShareTallRacks}/{PLATOON_DEAL.revSharePlatoon} revenue split</div>
              </div>
              <span style={{fontSize:11,background:"rgba(16,185,129,.15)",color:G.green,padding:"4px 12px",borderRadius:20,fontWeight:500}}>Active</span>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:1,background:G.border,borderRadius:8,overflow:"hidden"}}>
              {[["Min. Product Commitment","12 Recordings"],["Territory","World & Universe"],["Accounting","Monthly digital · Quarterly sync"]].map(([l,v])=>(
                <div key={l} style={{background:"#0F0F11",padding:"12px 16px"}}>
                  <div style={{fontSize:10,color:G.dim,textTransform:"uppercase",letterSpacing:".08em",marginBottom:4}}>{l}</div>
                  <div style={{fontSize:13,color:"#D1D5DB"}}>{v}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{marginBottom:20}}>
            <div style={{fontSize:12,color:G.sub,fontWeight:500,textTransform:"uppercase",letterSpacing:".08em",marginBottom:14}}>Drawdown Fund — $200,000</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
              <div style={{background:"#111113",border:`1px solid ${G.border}`,borderRadius:10,padding:"18px 20px"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
                  <div>
                    <div style={{fontSize:11,color:G.dim,textTransform:"uppercase",letterSpacing:".08em",marginBottom:4}}>Non-Recoupable</div>
                    <div style={{fontSize:22,fontWeight:700,color:G.text,fontFamily:"'Syne'"}}>${nonRecoupDrawn.toLocaleString()}</div>
                    <div style={{fontSize:11,color:G.dim,marginTop:2}}>spent of ${PLATOON_DEAL.nonRecoupable.toLocaleString()}</div>
                  </div>
                  <div style={{textAlign:"right"}}>
                    <div style={{fontSize:11,color:G.dim,marginBottom:2}}>Remaining</div>
                    <div style={{fontSize:16,fontWeight:600,color:G.cyan,fontFamily:"'Syne'"}}>${nonRecoupRemaining.toLocaleString()}</div>
                  </div>
                </div>
                <Bar value={nonRecoupDrawn} max={PLATOON_DEAL.nonRecoupable} color={G.cyan} height={5}/>
                <div style={{fontSize:10,color:G.dim,marginTop:6}}>Spent first — does not reduce your revenue share</div>
              </div>
              <div style={{background:"#111113",border:`1px solid ${G.border}`,borderRadius:10,padding:"18px 20px"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
                  <div>
                    <div style={{fontSize:11,color:G.dim,textTransform:"uppercase",letterSpacing:".08em",marginBottom:4}}>Recoupable</div>
                    <div style={{fontSize:22,fontWeight:700,color:G.text,fontFamily:"'Syne'"}}>${recoupDrawn.toLocaleString()}</div>
                    <div style={{fontSize:11,color:G.dim,marginTop:2}}>drawn of ${PLATOON_DEAL.recoupable.toLocaleString()}</div>
                  </div>
                  <div style={{textAlign:"right"}}>
                    <div style={{fontSize:11,color:G.dim,marginBottom:2}}>Remaining</div>
                    <div style={{fontSize:16,fontWeight:600,color:G.amber,fontFamily:"'Syne'"}}>${recoupRemaining.toLocaleString()}</div>
                  </div>
                </div>
                <Bar value={recoupDrawn} max={PLATOON_DEAL.recoupable} color={G.amber} height={5}/>
                <div style={{fontSize:10,color:G.dim,marginTop:6}}>Recouped from your 60% revenue share</div>
              </div>
            </div>
            <div style={{background:"#111113",border:`1px solid ${G.border}`,borderRadius:10,padding:"16px 20px"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
                <div style={{fontSize:13,color:G.text,fontWeight:500}}>Total Drawn: <span style={{fontFamily:"'DM Mono'",color:G.gold}}>${totalDrawn.toLocaleString()}</span></div>
                <div style={{fontSize:13,color:G.sub}}>Remaining: <span style={{fontFamily:"'DM Mono'",color:G.green}}>${totalRemaining.toLocaleString()}</span></div>
              </div>
              <Bar value={totalDrawn} max={PLATOON_DEAL.drawdownTotal} color={G.gold} height={7}/>
              <div style={{fontSize:11,color:G.dim,marginTop:6}}>{Math.round((totalDrawn/PLATOON_DEAL.drawdownTotal)*100)}% of $200k fund utilised</div>
            </div>
          </div>

          <div style={{background:"#111113",border:`1px solid ${G.border}`,borderRadius:10,padding:"20px 24px"}}>
            <div style={{fontSize:12,color:G.sub,fontWeight:500,textTransform:"uppercase",letterSpacing:".08em",marginBottom:16}}>Recoupment Tracker</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:20}}>
              {[
                {l:"Platoon Revenue",v:`$${platoonRevenue.toLocaleString()}`,s:"total earned to date",c:G.text},
                {l:"Your 60% Share",v:`$${tallRacksShare.toLocaleString()}`,s:"applied to recoupment",c:G.gold},
                {l:"Still to Recoup",v:`$${remainingToRecoup.toLocaleString()}`,s:`of $${PLATOON_DEAL.recoupable.toLocaleString()} total`,c:G.amber},
                {l:"Projected Date",v:projDate,s:"at current revenue rate",c:G.cyan},
              ].map(c=>(
                <div key={c.l} style={{background:"#0F0F11",border:`1px solid ${G.muted}`,borderRadius:8,padding:"14px 16px"}}>
                  <div style={{fontSize:10,color:G.dim,textTransform:"uppercase",letterSpacing:".08em",marginBottom:6}}>{c.l}</div>
                  <div style={{fontSize:18,fontWeight:700,color:c.c,fontFamily:"'Syne'"}}>{c.v}</div>
                  <div style={{fontSize:10,color:G.dim,marginTop:3}}>{c.s}</div>
                </div>
              ))}
            </div>
            <div style={{marginBottom:8}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                <span style={{fontSize:12,color:G.sub}}>Recoupment progress</span>
                <span style={{fontSize:12,color:G.gold,fontFamily:"'DM Mono'",fontWeight:500}}>{recoupProgress}%</span>
              </div>
              <Bar value={tallRacksShare} max={PLATOON_DEAL.recoupable} color={G.green} height={8}/>
            </div>
            <div style={{fontSize:11,color:G.dim,marginTop:8}}>
              Once $150,000 is recouped, Tall Racks receives 60% of all subsequent revenue with no deductions.
            </div>
          </div>
        </div>
      )}

      {activeTab==="invoices" && (
        <div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
            <div style={{fontSize:13,color:G.sub}}>{invoices.length} invoices · Total submitted: <span style={{color:G.text,fontFamily:"'DM Mono'",fontWeight:500}}>${invoices.reduce((a: number,i: any)=>a+i.amount,0).toLocaleString()}</span></div>
            <button className="btn-p" onClick={openAddInv}>+ Add Invoice</button>
          </div>
          <div style={{border:`1px solid ${G.border}`,borderRadius:10,overflow:"hidden"}}>
            <div style={{display:"grid",gridTemplateColumns:"100px 130px 1fr 90px 70px 100px 110px 60px",padding:"10px 20px",background:"#0D0D0F",borderBottom:`1px solid ${G.border}`}}>
              {["Date","Supplier","Description","Amount","Curr.","Type","Status",""].map((h,i)=>(
                <div key={i} style={{fontSize:10,color:G.dim,textTransform:"uppercase",letterSpacing:".08em",fontWeight:500}}>{h}</div>
              ))}
            </div>
            {invoices.map((inv: any)=>{
              const scColor = INV_STATUS_COLORS[inv.status]||G.dim;
              return(
                <div key={inv.id} className="brow" style={{display:"grid",gridTemplateColumns:"100px 130px 1fr 90px 70px 100px 110px 60px",padding:"12px 20px",borderTop:`1px solid ${G.bg}`,alignItems:"center"}}>
                  <div style={{fontSize:11,color:G.sub,fontFamily:"'DM Mono'"}}>{fmtD(inv.date)}</div>
                  <div style={{fontSize:12,fontWeight:500,color:G.text}}>{inv.supplier}</div>
                  <div style={{fontSize:12,color:G.sub}}>{inv.description}</div>
                  <div style={{fontSize:13,color:G.text,fontFamily:"'DM Mono'",fontWeight:500}}>${inv.amount.toLocaleString()}</div>
                  <div style={{fontSize:11,color:G.dim}}>{inv.currency}</div>
                  <div>
                    <span style={{fontSize:11,color:inv.type==="Recoupable"?G.amber:G.cyan,background:inv.type==="Recoupable"?"rgba(245,158,11,.12)":"rgba(6,182,212,.12)",padding:"2px 8px",borderRadius:10}}>{inv.type}</span>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:5}}>
                    <span style={{width:5,height:5,borderRadius:"50%",background:scColor,display:"inline-block"}}/>
                    <span style={{fontSize:12,color:scColor}}>{inv.status}</span>
                  </div>
                  <div className="ra" style={{opacity:0,transition:"opacity .15s"}}>
                    <button className="ib" onClick={(e)=>openEditInv(inv,e)}>✏️</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab==="revenue" && (
        <div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:20}}>
            {[
              {l:"Total Revenue",v:`$${(platoonRevenue+umgRevenue).toLocaleString()}`,s:"Platoon + UMG combined"},
              {l:"Platoon (Digital + Sync)",v:`$${platoonRevenue.toLocaleString()}`,s:"your 60% share applied to recoupment"},
              {l:"UMG Royalties",v:`$${umgRevenue.toLocaleString()}`,s:"legacy catalog — 2 statements received"},
            ].map(c=>(
              <div key={c.l} className="sc-card">
                <div style={{fontSize:11,color:G.dim,textTransform:"uppercase",letterSpacing:".08em",marginBottom:8}}>{c.l}</div>
                <div style={{fontSize:26,fontWeight:700,color:G.text,fontFamily:"'Syne'"}}>{c.v}</div>
                <div style={{fontSize:11,color:G.dim,marginTop:4}}>{c.s}</div>
              </div>
            ))}
          </div>
          <div style={{border:`1px solid ${G.border}`,borderRadius:10,overflow:"hidden"}}>
            <div style={{display:"grid",gridTemplateColumns:"100px 120px 80px 100px 90px 1fr",padding:"10px 20px",background:"#0D0D0F",borderBottom:`1px solid ${G.border}`}}>
              {["Date","Period","Type","Source","Amount","Notes"].map((h,i)=>(
                <div key={i} style={{fontSize:10,color:G.dim,textTransform:"uppercase",letterSpacing:".08em",fontWeight:500}}>{h}</div>
              ))}
            </div>
            {revenue.map((r: any)=>(
              <div key={r.id} className="brow" style={{display:"grid",gridTemplateColumns:"100px 120px 80px 100px 90px 1fr",padding:"12px 20px",borderTop:`1px solid ${G.bg}`,alignItems:"center"}}>
                <div style={{fontSize:11,color:G.sub,fontFamily:"'DM Mono'"}}>{fmtD(r.date)}</div>
                <div style={{fontSize:12,color:G.text,fontWeight:500}}>{r.period}</div>
                <div><span style={{fontSize:11,color:r.type==="Digital"?G.blue:r.type==="Sync"?G.purple:G.orange,background:r.type==="Digital"?"rgba(59,130,246,.12)":r.type==="Sync"?"rgba(139,92,246,.12)":"rgba(249,115,22,.12)",padding:"2px 7px",borderRadius:10}}>{r.type}</span></div>
                <div style={{fontSize:12,color:G.sub}}>{r.source}</div>
                <div style={{fontSize:13,color:G.green,fontFamily:"'DM Mono'",fontWeight:500}}>${r.amount.toLocaleString()}</div>
                <div style={{fontSize:11,color:G.dim}}>{r.statement==="uploaded"?"Statement uploaded":""}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab==="umg" && (
        <div>
          <div style={{background:"#111113",border:`1px solid ${G.border}`,borderRadius:12,padding:"20px 24px",marginBottom:20}}>
            <div style={{fontSize:12,color:G.sub,fontWeight:500,textTransform:"uppercase",letterSpacing:".08em",marginBottom:14}}>UMG Legacy Catalog</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:16}}>
              {["Bad Hair","Zulu Man With Some Power","Strings & Blings","I Love It Here","All features 2018–2024"].map(a=>(
                <span key={a} style={{background:"#1E1E22",color:"#D1D5DB",fontSize:12,padding:"5px 12px",borderRadius:6,border:`1px solid ${G.muted}`}}>{a}</span>
              ))}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:1,background:G.border,borderRadius:8,overflow:"hidden"}}>
              {[["Accounting","Quarterly"],["Contact","UMG South Africa"],["Revenue to date",`$${umgRevenue.toLocaleString()}`]].map(([l,v])=>(
                <div key={l} style={{background:"#0F0F11",padding:"12px 16px"}}>
                  <div style={{fontSize:10,color:G.dim,textTransform:"uppercase",letterSpacing:".08em",marginBottom:4}}>{l}</div>
                  <div style={{fontSize:13,color:"#D1D5DB"}}>{v}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{marginBottom:14}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
              <div style={{fontSize:12,color:G.sub,fontWeight:500,textTransform:"uppercase",letterSpacing:".08em"}}>Royalty Statements</div>
              <button className="btn-p" style={{fontSize:12,padding:"7px 14px"}}>+ Upload Statement</button>
            </div>
            <div style={{border:`1px solid ${G.border}`,borderRadius:10,overflow:"hidden"}}>
              {revenue.filter((r: any)=>r.source==="UMG").map((r: any)=>(
                <div key={r.id} className="brow" style={{display:"grid",gridTemplateColumns:"1fr 80px 100px 110px 60px",padding:"14px 20px",borderTop:`1px solid ${G.bg}`,alignItems:"center",gap:0}}>
                  <div>
                    <div style={{fontSize:13,fontWeight:500,color:G.text}}>{r.period} Statement</div>
                    <div style={{fontSize:11,color:G.dim,marginTop:2}}>Received {fmtD(r.date)}</div>
                  </div>
                  <span style={{fontSize:11,color:G.orange,background:"rgba(249,115,22,.12)",padding:"2px 7px",borderRadius:10}}>{r.type}</span>
                  <div style={{fontSize:13,color:G.green,fontFamily:"'DM Mono'",fontWeight:500}}>${r.amount.toLocaleString()}</div>
                  <div style={{display:"flex",alignItems:"center",gap:5}}>
                    <span style={{fontSize:11,color:r.statement==="uploaded"?G.green:G.dim}}>
                      {r.statement==="uploaded"?"✓ Uploaded":"○ Pending"}
                    </span>
                  </div>
                  <button className="ib" style={{fontSize:12}}>📎</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {invModal&&(
        <div className="ov" onClick={()=>setInvModal(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24}}>
              <h2 style={{fontSize:18,fontWeight:700,color:G.text,fontFamily:"'Syne'"}}>{editInv?"Edit Invoice":"New Invoice"}</h2>
              <button onClick={()=>setInvModal(false)} style={{background:"none",border:"none",color:G.sub,fontSize:18,cursor:"pointer"}}>✕</button>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:14}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                <div><label className="fl">Date</label><input type="date" className="fi" value={invForm.date} onChange={e=>setInvForm((f: any)=>({...f,date:e.target.value}))}/></div>
                <div><label className="fl">Status</label><select className="fi" value={invForm.status} onChange={e=>setInvForm((f: any)=>({...f,status:e.target.value}))}><option>Pending</option><option>Submitted</option><option>Paid</option></select></div>
              </div>
              <div><label className="fl">Supplier</label><input className="fi" placeholder="Name of supplier" value={invForm.supplier} onChange={e=>setInvForm((f: any)=>({...f,supplier:e.target.value}))}/></div>
              <div><label className="fl">Description</label><input className="fi" placeholder="What this invoice covers" value={invForm.description} onChange={e=>setInvForm((f: any)=>({...f,description:e.target.value}))}/></div>
              <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:12}}>
                <div><label className="fl">Amount</label><input className="fi" type="number" placeholder="0" value={invForm.amount} onChange={e=>setInvForm((f: any)=>({...f,amount:e.target.value}))}/></div>
                <div><label className="fl">Currency</label><select className="fi" value={invForm.currency} onChange={e=>setInvForm((f: any)=>({...f,currency:e.target.value}))}><option>USD</option><option>ZAR</option></select></div>
              </div>
              <div><label className="fl">Type</label><select className="fi" value={invForm.type} onChange={e=>setInvForm((f: any)=>({...f,type:e.target.value}))}><option>Recoupable</option><option>Non-Recoupable</option></select></div>
              <div><label className="fl">Platoon Reference</label><input className="fi" placeholder="PLT-2026-XXX" value={invForm.platoonRef} onChange={e=>setInvForm((f: any)=>({...f,platoonRef:e.target.value}))}/></div>
              <div style={{display:"flex",gap:10,paddingTop:6}}>
                <button className="btn-p" style={{flex:1}} onClick={saveInv}>{editInv?"Save Changes":"Add Invoice"}</button>
                <button className="btn-g" onClick={()=>setInvModal(false)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── DASHBOARD ─────────────────────────────────────────────────────────────────
function Dashboard({setView}: {setView: (v: string)=>void}) {
  const tracks = IP[0].tracks;
  const bookings = IB;
  const invoices = INIT_INVOICES;

  const confShows = bookings.filter((b: any)=>["Confirmed","Contract Issued","Contract Signed","Deposit Received","Fully Paid"].includes(b.status));
  const pipelineZAR = bookings.reduce((a: number,b: any)=>{const n=parseFloat(b.offer);return a+(isNaN(n)||b.currency==="USD"?0:n);},0);
  const received = bookings.reduce((a: number,b: any)=>{const n=parseFloat(b.paymentReceived);return a+(isNaN(n)?0:n);},0);
  const platoonRevenue = INIT_REVENUE.filter((r: any)=>r.source==="Platoon").reduce((a: number,r: any)=>a+r.amount,0);
  const recoupPct = Math.min(100,Math.round((platoonRevenue*0.6/150000)*100));
  const totalDrawn = invoices.filter((i: any)=>i.status==="Paid").reduce((a: number,i: any)=>a+i.amount,0);
  const pipelineComplete = tracks.filter(t=>t.stagesComplete===10).length;
  const platoonReady = tracks.filter(t=>Object.values(t.delivery).every(Boolean)).length;
  const pendingNeg = INIT_CONTACTS.filter((c: any)=>c.negotiations.some((n: any)=>["Negotiating","Pending","Not Started"].includes(n.status))).length;

  const upcoming = bookings
    .filter((b: any)=>["Confirmed","Contract Issued","Contract Signed","Deposit Received","Fully Paid"].includes(b.status) && b.date >= "2026-03-08")
    .sort((a: any,b_: any)=>a.date.localeCompare(b_.date)).slice(0,4);

  const needsAction: any[] = [
    ...tracks.filter(t=>t.stagesComplete===8).map(t=>({type:"mix", label:`Approve mix — ${t.title}`, sub:"Mix returned. Awaiting artist sign-off.", link:"pipeline", color:G.red})),
    ...INIT_CONTACTS.filter((c: any)=>c.negotiations.some((n: any)=>n.status==="Negotiating")).map((c: any)=>({type:"neg", label:`Negotiation open — ${c.name}`, sub:c.negotiations.find((n: any)=>n.status==="Negotiating")?.track||"", link:"contacts", color:G.orange})),
    bookings.some((b: any)=>b.status==="Contract Issued")&&{type:"contract", label:"Contract awaiting signature — Sane C4", sub:"Botswana · May 30", link:"bookings", color:G.purple},
    tracks.filter(t=>Object.values(t.delivery).some(v=>!v)&&t.stagesComplete>=9).length>0&&{type:"delivery", label:"Platoon delivery incomplete", sub:`${tracks.filter(t=>Object.values(t.delivery).some(v=>!v)).length} tracks missing assets`, link:"pipeline", color:G.amber},
  ].filter(Boolean).slice(0,5);

  const SC = ({label,value,sub,icon,color,link}: any)=>(
    <div onClick={()=>link&&setView(link)} style={{background:"#111113",border:`1px solid ${G.border}`,borderRadius:10,padding:"18px 20px",cursor:link?"pointer":"default",transition:"border-color .15s"}}
      onMouseEnter={e=>{if(link)(e.currentTarget as HTMLElement).style.borderColor=G.gold;}}
      onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor=G.border;}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
        <div style={{fontSize:11,color:G.dim,textTransform:"uppercase",letterSpacing:".08em"}}>{label}</div>
        <span style={{fontSize:18,opacity:.6}}>{icon}</span>
      </div>
      <div style={{fontSize:26,fontWeight:700,color:color||G.text,letterSpacing:"-.02em",lineHeight:1,fontFamily:"'Syne'"}}>{value}</div>
      <div style={{fontSize:11,color:G.dim,marginTop:5}}>{sub}</div>
    </div>
  );

  return(
    <div style={{padding:"28px 32px"}}>
      <div style={{marginBottom:24}}>
        <div style={{fontSize:11,color:G.gold,fontWeight:500,letterSpacing:".1em",textTransform:"uppercase",marginBottom:4}}>Nasty C · Tall Racks Music</div>
        <h1 style={{fontSize:26,fontWeight:700,color:G.text,letterSpacing:"-.02em",fontFamily:"'Syne'"}}>Command Centre</h1>
        <div style={{fontSize:13,color:G.sub,marginTop:3}}>{new Date().toLocaleDateString("en-ZA",{weekday:"long",day:"numeric",month:"long",year:"numeric"})}</div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:10,marginBottom:20}}>
        <SC label="Platoon Revenue" value={`$${platoonRevenue.toLocaleString()}`} sub="earned to date" icon="💰" color={G.green} link="financials"/>
        <SC label="Shows Confirmed" value={confShows.length} sub={`of ${bookings.length} total bookings`} icon="📅" color={G.blue} link="bookings"/>
        <SC label="Pipeline Value" value={`R${(pipelineZAR/1000).toFixed(0)}k`} sub="ZAR bookings" icon="📈" link="bookings"/>
        <SC label="Recoupment" value={`${recoupPct}%`} sub="of $150k recoupable" icon="🔄" color={recoupPct>50?G.green:G.amber} link="financials"/>
        <SC label="Platoon-Ready" value={`${platoonReady}/12`} sub="tracks fully delivered" icon="🚀" color={platoonReady===12?G.green:G.amber} link="pipeline"/>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
        <div style={{background:"#111113",border:`1px solid ${G.border}`,borderRadius:12,padding:"18px 20px"}}>
          <div style={{fontSize:11,color:G.sub,fontWeight:500,textTransform:"uppercase",letterSpacing:".08em",marginBottom:14}}>Needs Attention</div>
          <div style={{display:"flex",flexDirection:"column",gap:7}}>
            {needsAction.length===0&&<div style={{fontSize:12,color:G.dim,padding:"8px 0"}}>All clear — nothing outstanding.</div>}
            {needsAction.map((item: any,i)=>(
              <div key={i} onClick={()=>setView(item.link)}
                style={{display:"flex",gap:10,padding:"10px 12px",background:"#0F0F11",border:`1px solid ${item.color}25`,borderRadius:8,cursor:"pointer",transition:".12s"}}
                onMouseEnter={e=>(e.currentTarget as HTMLElement).style.borderColor=`${item.color}55`}
                onMouseLeave={e=>(e.currentTarget as HTMLElement).style.borderColor=`${item.color}25`}>
                <div style={{width:3,borderRadius:2,background:item.color,flexShrink:0,alignSelf:"stretch",minHeight:32}}/>
                <div>
                  <div style={{fontSize:12,fontWeight:500,color:G.text}}>{item.label}</div>
                  {item.sub&&<div style={{fontSize:11,color:G.dim,marginTop:2}}>{item.sub}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{background:"#111113",border:`1px solid ${G.border}`,borderRadius:12,padding:"18px 20px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
            <div style={{fontSize:11,color:G.sub,fontWeight:500,textTransform:"uppercase",letterSpacing:".08em"}}>Next Confirmed Shows</div>
            <button onClick={()=>setView("bookings")} style={{fontSize:11,color:G.gold,background:"none",border:"none",cursor:"pointer"}}>View all →</button>
          </div>
          {upcoming.length===0&&<div style={{fontSize:12,color:G.dim}}>No confirmed shows.</div>}
          <div style={{display:"flex",flexDirection:"column",gap:7}}>
            {upcoming.map((b: any)=>{
              const s=getBS(b.status);
              const d=new Date(b.date);
              return(
                <div key={b.id} style={{display:"flex",gap:12,alignItems:"center",padding:"9px 10px",background:"#0F0F11",borderRadius:8,border:`1px solid ${G.muted}`}}>
                  <div style={{textAlign:"center",flexShrink:0,width:36,background:"#161618",borderRadius:6,padding:"4px 0"}}>
                    <div style={{fontSize:15,fontWeight:700,color:G.text,fontFamily:"'Syne'",lineHeight:1}}>{d.getDate()}</div>
                    <div style={{fontSize:9,color:G.dim,textTransform:"uppercase"}}>{d.toLocaleDateString("en-ZA",{month:"short"})}</div>
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:12,fontWeight:500,color:G.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{b.promoter} · {b.city}</div>
                    <div style={{fontSize:11,color:G.sub,marginTop:1}}>{b.eventType}</div>
                  </div>
                  <div style={{textAlign:"right",flexShrink:0}}>
                    <div style={{fontSize:12,color:G.gold,fontFamily:"'DM Mono'",fontWeight:500}}>{fmt(b.offer,b.currency)}</div>
                    <div style={{fontSize:10,color:s.color,marginTop:1}}>{s.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
        <div style={{background:"#111113",border:`1px solid ${G.border}`,borderRadius:12,padding:"18px 20px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
            <div style={{fontSize:11,color:G.sub,fontWeight:500,textTransform:"uppercase",letterSpacing:".08em"}}>FREE Deluxe — Pipeline</div>
            <button onClick={()=>setView("pipeline")} style={{fontSize:11,color:G.gold,background:"none",border:"none",cursor:"pointer"}}>Open →</button>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:14}}>
            {[
              {l:"Complete",v:pipelineComplete,c:G.green},
              {l:"In Progress",v:tracks.filter(t=>t.stagesComplete>0&&t.stagesComplete<10).length,c:G.cyan},
              {l:"Not Started",v:tracks.filter(t=>t.stagesComplete===0).length,c:G.dim},
            ].map(s=>(
              <div key={s.l} style={{background:"#0F0F11",border:`1px solid ${G.muted}`,borderRadius:7,padding:"10px 12px",textAlign:"center"}}>
                <div style={{fontSize:20,fontWeight:700,color:s.c,fontFamily:"'Syne'"}}>{s.v}</div>
                <div style={{fontSize:10,color:G.dim,marginTop:2}}>{s.l}</div>
              </div>
            ))}
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:5}}>
            {tracks.slice(0,6).map(t=>{
              const p=Math.round((t.stagesComplete/10)*100);
              const c=t.stagesComplete===10?G.green:t.stagesComplete>=7?G.cyan:t.stagesComplete>=4?G.amber:G.dim;
              return(
                <div key={t.id} style={{display:"flex",alignItems:"center",gap:10}}>
                  <div style={{fontSize:11,color:G.sub,width:120,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",flexShrink:0}}>{t.title}</div>
                  <div style={{flex:1,background:G.muted,borderRadius:3,height:4,overflow:"hidden"}}>
                    <div style={{width:`${p}%`,height:"100%",background:c,borderRadius:3,transition:"width .4s"}}/>
                  </div>
                  <div style={{fontSize:10,color:c,fontFamily:"'DM Mono'",width:30,textAlign:"right",flexShrink:0}}>{p}%</div>
                </div>
              );
            })}
            {tracks.length>6&&<div style={{fontSize:11,color:G.dim,textAlign:"center",paddingTop:4}}>+ {tracks.length-6} more tracks</div>}
          </div>
        </div>

        <div style={{background:"#111113",border:`1px solid ${G.border}`,borderRadius:12,padding:"18px 20px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
            <div style={{fontSize:11,color:G.sub,fontWeight:500,textTransform:"uppercase",letterSpacing:".08em"}}>Financials Snapshot</div>
            <button onClick={()=>setView("financials")} style={{fontSize:11,color:G.gold,background:"none",border:"none",cursor:"pointer"}}>Open →</button>
          </div>
          <div style={{marginBottom:14}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
              <span style={{fontSize:11,color:G.sub}}>Platoon drawdown</span>
              <span style={{fontSize:11,color:G.text,fontFamily:"'DM Mono'"}}>${totalDrawn.toLocaleString()} / $200,000</span>
            </div>
            <div style={{background:G.muted,borderRadius:3,height:5,overflow:"hidden"}}>
              <div style={{width:`${Math.round((totalDrawn/200000)*100)}%`,height:"100%",background:G.gold,borderRadius:3}}/>
            </div>
          </div>
          <div style={{marginBottom:14}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
              <span style={{fontSize:11,color:G.sub}}>Recoupment progress</span>
              <span style={{fontSize:11,color:G.text,fontFamily:"'DM Mono'"}}>{recoupPct}% of $150k</span>
            </div>
            <div style={{background:G.muted,borderRadius:3,height:5,overflow:"hidden"}}>
              <div style={{width:`${recoupPct}%`,height:"100%",background:G.green,borderRadius:3}}/>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
            {[
              {l:"Bookings received",v:`R${received.toLocaleString()}`,s:"payments collected",c:G.gold},
              {l:"Pending nego.",v:pendingNeg,s:"producer licences open",c:G.orange},
            ].map(c=>(
              <div key={c.l} style={{background:"#0F0F11",border:`1px solid ${G.muted}`,borderRadius:7,padding:"10px 12px"}}>
                <div style={{fontSize:10,color:G.dim,marginBottom:4}}>{c.l}</div>
                <div style={{fontSize:16,fontWeight:700,color:c.c,fontFamily:"'Syne'"}}>{c.v}</div>
                <div style={{fontSize:10,color:G.dim,marginTop:2}}>{c.s}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10}}>
        {[
          {k:"pipeline",l:"Music Pipeline",i:"🎵",s:"10-stage track workflow"},
          {k:"bookings",l:"Bookings",i:"📅",s:`${bookings.length} bookings logged`},
          {k:"financials",l:"Financials",i:"💰",s:"Platoon · UMG · invoices"},
          {k:"contacts",l:"Contacts",i:"👥",s:`${INIT_CONTACTS.length} contacts · licences`},
        ].map(n=>(
          <div key={n.k} onClick={()=>setView(n.k)}
            style={{background:"#111113",border:`1px solid ${G.border}`,borderRadius:10,padding:"16px 18px",cursor:"pointer",transition:".15s",display:"flex",gap:12,alignItems:"center"}}
            onMouseEnter={e=>(e.currentTarget as HTMLElement).style.borderColor=G.gold}
            onMouseLeave={e=>(e.currentTarget as HTMLElement).style.borderColor=G.border}>
            <span style={{fontSize:22}}>{n.i}</span>
            <div>
              <div style={{fontSize:13,fontWeight:500,color:G.text}}>{n.l}</div>
              <div style={{fontSize:11,color:G.dim,marginTop:1}}>{n.s}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── CONTACTS ──────────────────────────────────────────────────────────────────
function Contacts() {
  const [contacts, setContacts] = useState(INIT_CONTACTS);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("All");
  const [selected, setSelected] = useState<any>(null);
  const [modal, setModal] = useState(false);
  const [editC, setEditC] = useState<any>(null);
  const [form, setForm] = useState<any>({name:"",role:"",category:"Producer",email:"",phone:"",location:"",company:"",notes:"",tags:[]});
  const [nid, setNid] = useState(15);
  const [negModal, setNegModal] = useState(false);
  const [negForm, setNegForm] = useState<any>({track:"",status:"Negotiating",fee:"",date:"",notes:""});

  const cats = ["All","Partner","Producer","Engineer"];
  const filtered = useMemo(()=>{
    let c = contacts;
    if(filterCat !== "All") c = c.filter((x: any)=>x.category===filterCat);
    if(search) { const q=search.toLowerCase(); c=c.filter((x: any)=>[x.name,x.role,x.company,x.notes].join(" ").toLowerCase().includes(q)); }
    return c;
  },[contacts,filterCat,search]);

  const openAdd = () => { setEditC(null); setForm({name:"",role:"",category:"Producer",email:"",phone:"",location:"",company:"",notes:"",tags:[]}); setModal(true); };
  const openEdit = (c: any,e?: any) => { e&&e.stopPropagation(); setEditC(c); setForm({...c}); setModal(true); };
  const save = () => {
    if(editC) { setContacts((p: any)=>p.map((c: any)=>c.id===editC.id?{...form,id:c.id,negotiations:c.negotiations}:c)); if(selected?.id===editC.id) setSelected((p: any)=>({...p,...form})); }
    else { const nc={...form,id:nid,negotiations:[]}; setContacts((p: any)=>[...p,nc]); setNid(n=>n+1); }
    setModal(false);
  };
  const addNeg = () => {
    if(!selected) return;
    const neg = {...negForm,id:Date.now(),fee:parseFloat(negForm.fee)||0};
    setContacts((p: any)=>p.map((c: any)=>c.id===selected.id?{...c,negotiations:[...c.negotiations,neg]}:c));
    setSelected((p: any)=>({...p,negotiations:[...p.negotiations,neg]}));
    setNegModal(false);
    setNegForm({track:"",status:"Negotiating",fee:"",date:"",notes:""});
  };
  const updateNegStatus = (contactId: number, negId: number, status: string) => {
    setContacts((p: any)=>p.map((c: any)=>c.id===contactId?{...c,negotiations:c.negotiations.map((n: any)=>n.id===negId?{...n,status}:n)}:c));
    setSelected((p: any)=>p?{...p,negotiations:p.negotiations.map((n: any)=>n.id===negId?{...n,status}:n)}:p);
  };

  return(
    <div style={{padding:"28px 32px"}}>
      <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",marginBottom:20}}>
        <div>
          <div style={{fontSize:11,color:G.gold,fontWeight:500,letterSpacing:".1em",textTransform:"uppercase",marginBottom:4}}>All Projects</div>
          <h1 style={{fontSize:26,fontWeight:700,color:G.text,letterSpacing:"-.02em",fontFamily:"'Syne'"}}>Contacts</h1>
        </div>
        <div style={{display:"flex",gap:10}}>
          <div style={{display:"flex",alignItems:"center",gap:8,background:"#161618",border:`1px solid ${G.muted}`,borderRadius:6,padding:"7px 12px"}}>
            <span style={{color:G.dim,fontSize:13}}>⌕</span>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search contacts…" style={{background:"none",border:"none",color:G.text,fontSize:13,outline:"none",width:160}}/>
          </div>
          <button className="btn-p" onClick={openAdd}>+ Add Contact</button>
        </div>
      </div>

      <div style={{display:"flex",gap:6,marginBottom:20}}>
        {cats.map(c=>(
          <button key={c} onClick={()=>setFilterCat(c)}
            style={{padding:"6px 14px",borderRadius:6,fontSize:12,border:`1px solid ${filterCat===c?G.gold:G.muted}`,background:filterCat===c?"rgba(201,168,76,.1)":"transparent",color:filterCat===c?G.gold:G.sub,cursor:"pointer",fontFamily:"'DM Sans'",transition:".12s"}}>
            {c} {c==="All"?`(${contacts.length})`:`(${contacts.filter((x: any)=>x.category===c).length})`}
          </button>
        ))}
      </div>

      <div style={{display:"grid",gridTemplateColumns:selected?"1fr 420px":"1fr",gap:16}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:10,alignContent:"start"}}>
          {filtered.map((c: any)=>(
            <div key={c.id} onClick={()=>setSelected(c)} style={{background:"#111113",border:`1px solid ${selected?.id===c.id?G.gold:G.border}`,borderRadius:10,padding:"16px 18px",cursor:"pointer",transition:"all .15s"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <div style={{width:36,height:36,borderRadius:8,background:CAT_COLORS[c.category]||"#1E1E22",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    <span style={{fontSize:14,fontWeight:700,color:CAT_TEXT[c.category]||G.sub,fontFamily:"'Syne'"}}>{c.name[0]}</span>
                  </div>
                  <div>
                    <div style={{fontSize:13,fontWeight:600,color:G.text}}>{c.name}</div>
                    <div style={{fontSize:11,color:G.sub,marginTop:1}}>{c.role}{c.company?` · ${c.company}`:""}</div>
                  </div>
                </div>
                <button className="ib" onClick={(e)=>openEdit(c,e)} style={{flexShrink:0}}>✏️</button>
              </div>
              <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                <span style={{fontSize:10,background:CAT_COLORS[c.category],color:CAT_TEXT[c.category],padding:"2px 7px",borderRadius:10,fontWeight:500}}>{c.category}</span>
                {c.tags.map((t: string)=>{
                  const tc=t==="Signed"?G.green:t==="Negotiating"?G.orange:t==="Pending"?G.amber:t==="Active"?G.blue:G.dim;
                  return <span key={t} style={{fontSize:10,background:`${tc}18`,color:tc,padding:"2px 7px",borderRadius:10}}>{t}</span>;
                })}
                {c.negotiations.length>0&&<span style={{fontSize:10,color:G.dim,padding:"2px 7px",borderRadius:10,border:`1px solid ${G.muted}`}}>{c.negotiations.length} neg.</span>}
              </div>
            </div>
          ))}
        </div>

        {selected && (
          <div style={{background:"#111113",border:`1px solid ${G.border}`,borderRadius:12,padding:"22px",alignSelf:"start",position:"sticky",top:74}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:18}}>
              <div style={{display:"flex",gap:12,alignItems:"center"}}>
                <div style={{width:44,height:44,borderRadius:10,background:CAT_COLORS[selected.category],display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <span style={{fontSize:18,fontWeight:700,color:CAT_TEXT[selected.category],fontFamily:"'Syne'"}}>{selected.name[0]}</span>
                </div>
                <div>
                  <h3 style={{fontSize:16,fontWeight:700,color:G.text,fontFamily:"'Syne'"}}>{selected.name}</h3>
                  <div style={{fontSize:12,color:G.sub}}>{selected.role}{selected.company?` · ${selected.company}`:""}</div>
                </div>
              </div>
              <div style={{display:"flex",gap:4}}>
                <button className="ib" onClick={(e)=>openEdit(selected,e)}>✏️</button>
                <button className="ib" onClick={()=>setSelected(null)} style={{fontSize:15}}>✕</button>
              </div>
            </div>

            <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:18}}>
              {[[selected.email,"📧"],[selected.phone,"📞"],[selected.location,"📍"]].filter(([v])=>v).map(([v,icon])=>(
                <div key={icon} style={{display:"flex",gap:8,alignItems:"center"}}>
                  <span style={{fontSize:12}}>{icon}</span>
                  <span style={{fontSize:12,color:G.sub}}>{v}</span>
                </div>
              ))}
            </div>

            {selected.notes && (
              <div style={{background:"#161618",border:`1px solid ${G.muted}`,borderRadius:6,padding:"10px 12px",marginBottom:18,fontSize:12,color:G.sub,lineHeight:1.6}}>{selected.notes}</div>
            )}

            {(selected.category==="Producer"||selected.negotiations.length>0) && (
              <div>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
                  <div style={{fontSize:11,color:G.sub,fontWeight:500,textTransform:"uppercase",letterSpacing:".08em"}}>Licence Negotiations</div>
                  <button className="btn-p" style={{fontSize:11,padding:"5px 10px"}} onClick={()=>setNegModal(true)}>+ Add</button>
                </div>
                {selected.negotiations.length===0 && <div style={{fontSize:12,color:G.dim,padding:"10px 0"}}>No negotiations logged yet.</div>}
                <div style={{display:"flex",flexDirection:"column",gap:8}}>
                  {selected.negotiations.map((neg: any)=>{
                    const nc=NEG_STATUS_C[neg.status]||G.dim;
                    return(
                      <div key={neg.id} style={{background:"#0F0F11",border:`1px solid ${G.muted}`,borderRadius:8,padding:"12px 14px"}}>
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
                          <div style={{fontSize:13,fontWeight:500,color:G.text}}>{neg.track||"—"}</div>
                          <select value={neg.status} onChange={e=>updateNegStatus(selected.id,neg.id,e.target.value)}
                            style={{background:`${nc}18`,border:`1px solid ${nc}40`,color:nc,borderRadius:6,fontSize:11,padding:"2px 6px",fontFamily:"'DM Sans'",cursor:"pointer",outline:"none"}}>
                            {["Not Started","Negotiating","Pending","Signed"].map(s=><option key={s}>{s}</option>)}
                          </select>
                        </div>
                        <div style={{display:"flex",gap:12,marginBottom:neg.notes?6:0}}>
                          {neg.fee>0&&<span style={{fontSize:12,color:G.gold,fontFamily:"'DM Mono'"}}>R{neg.fee.toLocaleString()}</span>}
                          {neg.date&&<span style={{fontSize:11,color:G.dim}}>{fmtD(neg.date)}</span>}
                        </div>
                        {neg.notes&&<div style={{fontSize:11,color:G.dim,lineHeight:1.5}}>{neg.notes}</div>}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {modal&&(
        <div className="ov" onClick={()=>setModal(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24}}>
              <h2 style={{fontSize:18,fontWeight:700,color:G.text,fontFamily:"'Syne'"}}>{editC?"Edit Contact":"New Contact"}</h2>
              <button onClick={()=>setModal(false)} style={{background:"none",border:"none",color:G.sub,fontSize:18,cursor:"pointer"}}>✕</button>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:14}}>
              <div><label className="fl">Name</label><input className="fi" value={form.name} onChange={e=>setForm((f: any)=>({...f,name:e.target.value}))} placeholder="Full name"/></div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                <div><label className="fl">Role</label><input className="fi" value={form.role} onChange={e=>setForm((f: any)=>({...f,role:e.target.value}))} placeholder="e.g. Producer"/></div>
                <div><label className="fl">Category</label><select className="fi" value={form.category} onChange={e=>setForm((f: any)=>({...f,category:e.target.value}))}><option>Producer</option><option>Partner</option><option>Engineer</option><option>Label</option></select></div>
              </div>
              <div><label className="fl">Email</label><input className="fi" type="email" value={form.email} onChange={e=>setForm((f: any)=>({...f,email:e.target.value}))}/></div>
              <div><label className="fl">Phone</label><input className="fi" value={form.phone} onChange={e=>setForm((f: any)=>({...f,phone:e.target.value}))}/></div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                <div><label className="fl">Location</label><input className="fi" value={form.location} onChange={e=>setForm((f: any)=>({...f,location:e.target.value}))}/></div>
                <div><label className="fl">Company</label><input className="fi" value={form.company} onChange={e=>setForm((f: any)=>({...f,company:e.target.value}))}/></div>
              </div>
              <div><label className="fl">Notes</label><textarea className="fi" rows={3} style={{resize:"vertical"}} value={form.notes} onChange={e=>setForm((f: any)=>({...f,notes:e.target.value}))}/></div>
              <div style={{display:"flex",gap:10,paddingTop:6}}>
                <button className="btn-p" style={{flex:1}} onClick={save}>{editC?"Save Changes":"Add Contact"}</button>
                <button className="btn-g" onClick={()=>setModal(false)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {negModal&&(
        <div className="ov" onClick={()=>setNegModal(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24}}>
              <h2 style={{fontSize:18,fontWeight:700,color:G.text,fontFamily:"'Syne'"}}>New Negotiation</h2>
              <button onClick={()=>setNegModal(false)} style={{background:"none",border:"none",color:G.sub,fontSize:18,cursor:"pointer"}}>✕</button>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:14}}>
              <div><label className="fl">Track</label><input className="fi" value={negForm.track} onChange={e=>setNegForm((f: any)=>({...f,track:e.target.value}))} placeholder="Track name"/></div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                <div><label className="fl">Status</label><select className="fi" value={negForm.status} onChange={e=>setNegForm((f: any)=>({...f,status:e.target.value}))}><option>Not Started</option><option>Negotiating</option><option>Pending</option><option>Signed</option></select></div>
                <div><label className="fl">Fee (ZAR)</label><input className="fi" type="number" value={negForm.fee} onChange={e=>setNegForm((f: any)=>({...f,fee:e.target.value}))}/></div>
              </div>
              <div><label className="fl">Date</label><input type="date" className="fi" value={negForm.date} onChange={e=>setNegForm((f: any)=>({...f,date:e.target.value}))}/></div>
              <div><label className="fl">Notes</label><textarea className="fi" rows={3} style={{resize:"vertical"}} value={negForm.notes} onChange={e=>setNegForm((f: any)=>({...f,notes:e.target.value}))}/></div>
              <div style={{display:"flex",gap:10,paddingTop:6}}>
                <button className="btn-p" style={{flex:1}} onClick={addNeg}>Add Negotiation</button>
                <button className="btn-g" onClick={()=>setNegModal(false)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── MAIN SHELL ────────────────────────────────────────────────────────────────
const NAV = [
  {k:"dashboard",l:"Dashboard",i:"⚡"},
  {k:"pipeline",l:"Pipeline",i:"🎵"},
  {k:"bookings",l:"Bookings",i:"📅"},
  {k:"financials",l:"Financials",i:"💰"},
  {k:"contacts",l:"Contacts",i:"👥"},
];

export default function Evolve() {
  const [view, setView] = useState("dashboard");

  return (
    <>
      <style>{CSS}</style>
      <div style={{display:"flex",height:"100vh",background:G.bg,fontFamily:"'DM Sans', sans-serif",color:G.text}}>
        {/* Sidebar */}
        <div style={{width:220,background:G.surface,borderRight:`1px solid ${G.border}`,display:"flex",flexDirection:"column",flexShrink:0}}>
          <div style={{padding:"24px 20px 20px"}}>
            <div style={{fontSize:18,fontWeight:700,color:G.gold,fontFamily:"'Syne'",letterSpacing:"-.02em"}}>EVOLVE</div>
            <div style={{fontSize:10,color:G.dim,marginTop:2,textTransform:"uppercase",letterSpacing:".12em"}}>Management Suite</div>
          </div>
          <nav style={{flex:1,padding:"0 10px"}}>
            {NAV.map(n=>(
              <div key={n.k} onClick={()=>setView(n.k)}
                style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",borderRadius:8,cursor:"pointer",marginBottom:2,
                  background:view===n.k?"rgba(201,168,76,.1)":"transparent",
                  color:view===n.k?G.gold:G.sub,
                  transition:".12s",fontWeight:view===n.k?500:400,fontSize:13}}>
                <span style={{fontSize:15}}>{n.i}</span>
                {n.l}
              </div>
            ))}
          </nav>
          <div style={{padding:"16px 20px",borderTop:`1px solid ${G.border}`}}>
            <div style={{fontSize:11,color:G.dim}}>Tall Racks Music</div>
            <div style={{fontSize:11,color:G.dim,marginTop:2}}>Ivyson Entertainment</div>
          </div>
        </div>

        {/* Main content */}
        <div style={{flex:1,overflowY:"auto"}}>
          {view==="dashboard"&&<Dashboard setView={setView}/>}
          {view==="pipeline"&&<Pipeline/>}
          {view==="bookings"&&<Bookings/>}
          {view==="financials"&&<Financials/>}
          {view==="contacts"&&<Contacts/>}
        </div>
      </div>
    </>
  );
}
