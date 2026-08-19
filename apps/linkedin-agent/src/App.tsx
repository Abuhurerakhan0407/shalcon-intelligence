import { useMemo, useState } from 'react'
import { Activity, BarChart3, Bot, CalendarDays, Check, FileText, Gauge, LayoutDashboard, Plus, Search, Settings, ShieldCheck, Sparkles, Target, Users, WandSparkles } from 'lucide-react'
import { initialLeads, Lead, localScore, statusLabel, View } from './data'
import { isSupabaseConfigured, supabase } from './lib/supabase'

const nav: Array<[View,string,typeof LayoutDashboard]> = [
  ['command','Command Center',LayoutDashboard], ['leads','Leads',Users], ['campaigns','Campaigns',Target],
  ['approvals','Approvals',ShieldCheck], ['content','Content',FileText], ['analytics','Analytics',BarChart3], ['settings','Settings',Settings],
]

export default function App(){
  const [view,setView]=useState<View>('command')
  const [leads,setLeads]=useState<Lead[]>(initialLeads)
  const [query,setQuery]=useState('')
  const [busy,setBusy]=useState<string|null>(null)
  const filtered=useMemo(()=>leads.filter(l=>`${l.name} ${l.company} ${l.title}`.toLowerCase().includes(query.toLowerCase())),[leads,query])
  const approvals=leads.filter(l=>l.status==='approval')

  async function analyze(lead:Lead){
    setBusy(lead.id)
    try{
      if(supabase){
        const {data,error}=await supabase.functions.invoke('analyze-lead',{body:{lead:{name:lead.name,title:lead.title,city:lead.city},company:{name:lead.company},signal:lead.signal}})
        if(error) throw error
        setLeads(v=>v.map(x=>x.id===lead.id?{...x,score:data.score??x.score,offer:data.recommended_offer??x.offer,signal:data.rationale??x.signal,status:'approval'}:x))
      }else{
        await new Promise(r=>setTimeout(r,400))
        setLeads(v=>v.map(x=>x.id===lead.id?{...x,score:localScore(x.name+x.company+x.title),status:'approval'}:x))
      }
    }finally{setBusy(null)}
  }
  const approve=(id:string)=>setLeads(v=>v.map(x=>x.id===id?{...x,status:'connected'}:x))
  const addDemoLead=()=>setLeads(v=>[{id:crypto.randomUUID(),name:'New Prospect',title:'Decision maker',company:'Research queue',city:'Mumbai',score:76,offer:'AI Automation',signal:'Needs research',status:'researching',initials:'NP'},...v])

  return <div className="shell">
    <aside className="sidebar">
      <div className="brand"><div className="mark">S</div><div><b>Shalcon</b><span>LinkedIn Agent</span></div></div>
      <nav>{nav.map(([id,label,Icon])=><button key={id} className={view===id?'nav active':'nav'} onClick={()=>setView(id)}><Icon size={17}/><span>{label}</span>{id==='approvals'&&<em>{approvals.length}</em>}</button>)}</nav>
      <div className="agent"><Bot size={18}/><div><b>Agent online</b><span>Safe mode enabled</span></div><i/></div>
    </aside>

    <main>
      <header><div><small>SHALCON SALES SYSTEM</small><h1>{nav.find(n=>n[0]===view)?.[1]}</h1></div><div className="actions"><label className="search"><Search size={15}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search leads…"/></label><button className="primary" onClick={addDemoLead}><Plus size={16}/>Add lead</button></div></header>
      {!isSupabaseConfigured&&<div className="banner"><WandSparkles size={15}/>Demo mode active. Connect dedicated Supabase project for persistence and AI analysis.</div>}

      {view==='command'&&<div className="stack">
        <section className="metrics"><Metric label="Prospects analysed" value="142" note="+18 today" icon={Gauge}/><Metric label="Qualified" value="37" note="26.1% hit rate" icon={Target}/><Metric label="Need approval" value={String(approvals.length)} note="Human action" icon={ShieldCheck}/><Metric label="Meetings" value="2" note="This week" icon={CalendarDays}/></section>
        <section className="panel goal"><div className="panelHead"><div><small>AUTOPILOT GOAL</small><h2>Book qualified AI automation meetings</h2></div><span className="live"><i/>running</span></div><div className="flow">{['Find','Research','Score','Draft','Approve','Convert'].map((step,i)=><div key={step}><b>{i<3?<Check size={14}/>:i+1}</b><span>{step}</span></div>)}</div><footer><span><Activity size={14}/>83 leads processed in current run</span></footer></section>
        <section className="cols"><div className="panel"><div className="panelHead"><div><small>HOT LEADS</small><h3>Best opportunities</h3></div></div>{leads.slice().sort((a,b)=>b.score-a.score).slice(0,4).map(l=><LeadRow key={l.id} lead={l} analyze={analyze} busy={busy===l.id}/>)}</div><div className="panel"><div className="panelHead"><div><small>APPROVAL QUEUE</small><h3>Human actions</h3></div><span className="count">{approvals.length}</span></div>{approvals.length?approvals.map(l=><div className="approval" key={l.id}><Avatar text={l.initials}/><div><b>{l.name}</b><span>{l.company} · draft ready</span><p>Personalized connection copy prepared from verified lead context.</p></div><button className="approve" onClick={()=>approve(l.id)}><Check size={14}/></button></div>):<Empty/>}</div></section>
      </div>}

      {view==='leads'&&<section className="panel"><div className="panelHead"><div><small>PIPELINE</small><h2>{filtered.length} leads</h2></div></div><div className="table"><div className="thead"><span>Lead</span><span>Score</span><span>Offer</span><span>Signal</span><span>Status</span><span/></div>{filtered.map(l=><div className="trow" key={l.id}><div className="person"><Avatar text={l.initials}/><div><b>{l.name}</b><span>{l.title} · {l.company}</span></div></div><strong>{l.score}</strong><span>{l.offer}</span><span className="truncate">{l.signal}</span><span className={`status ${l.status}`}>{statusLabel[l.status]}</span><button className="analyze" onClick={()=>analyze(l)} disabled={busy===l.id}><Sparkles size={13}/>{busy===l.id?'Working':'Analyze'}</button></div>)}</div></section>}

      {view==='campaigns'&&<section className="panel"><div className="panelHead"><div><small>OUTBOUND</small><h2>Campaign engine</h2></div></div>{[['Mumbai Clinic Owners','ClinicBot','83','19','Running'],['School Directors — West India','EduFlow','64','12','Running'],['Insurance Renewal Ops','RenewBot','41','8','Draft']].map(r=><div className="campaign" key={r[0]}><div><b>{r[0]}</b><span>{r[1]}</span></div><div><span>Leads</span><b>{r[2]}</b></div><div><span>Qualified</span><b>{r[3]}</b></div><span className={r[4]==='Running'?'live':'status qualified'}>{r[4]==='Running'&&<i/>}{r[4]}</span></div>)}</section>}

      {view==='approvals'&&<section className="panel"><div className="panelHead"><div><small>HUMAN-IN-THE-LOOP</small><h2>{approvals.length} actions waiting</h2></div></div>{approvals.length?approvals.map(l=><div className="approval wide" key={l.id}><Avatar text={l.initials}/><div><b>{l.name} · {l.company}</b><span>{l.title} · {l.city} · score {l.score}</span><p>Draft prepared for review. External LinkedIn action stays manual in V1.</p></div><button className="primary" onClick={()=>approve(l.id)}><Check size={14}/>Approve</button></div>):<Empty/>}</section>}

      {view==='content'&&<div className="cols"><section className="panel"><div className="panelHead"><div><small>CONTENT BRAIN</small><h2>Shalcon queue</h2></div></div>{[['Today','Healthcare','Why clinics lose leads after 7 PM'],['Thu','Founder POV','AI should remove handoffs, not humans'],['Fri','Insurance','Renewals fail because follow-up starts too late'],['Sat','Proof / ROI','One workflow. Three manual steps removed.']].map(p=><div className="post" key={p[2]}><strong>{p[0]}</strong><div><span>{p[1]}</span><b>{p[2]}</b></div></div>)}</section><section className="panel composer"><small>DRAFT PREVIEW</small><h3>Why clinics lose leads after 7 PM</h3><p>Most clinics don’t have a lead problem.<br/><br/>They have a response-time problem.<br/><br/>A patient messages after hours. Nobody replies until morning. By then intent has cooled.<br/><br/>ClinicBot qualifies and routes that enquiry while intent is still high.</p></section></div>}

      {view==='analytics'&&<div className="stack"><section className="metrics"><Metric label="Avg. lead score" value="88" note="+4 vs last batch" icon={Gauge}/><Metric label="Qualified rate" value="26.1%" note="37 / 142" icon={Target}/><Metric label="Reply rate" value="18.9%" note="7 positive replies" icon={Activity}/><Metric label="Meeting rate" value="5.4%" note="2 booked" icon={CalendarDays}/></section><section className="panel"><div className="panelHead"><div><small>FUNNEL</small><h2>Current conversion</h2></div></div>{[['Discovered',142,100],['Qualified',37,72],['Approved',18,53],['Replies',7,34],['Meetings',2,18]].map(([l,v,w])=><div className="funnel" key={String(l)}><span>{l}</span><div><i style={{width:`${w}%`}}/></div><b>{v}</b></div>)}</section></div>}

      {view==='settings'&&<div className="cols"><section className="panel"><div className="panelHead"><div><small>INTEGRATIONS</small><h2>Connection status</h2></div></div>{[['Supabase','Database + auth',isSupabaseConfigured],['Gemini','Research + generation',false],['LinkedIn','Approval handoff',false],['Gmail','Follow-up channel',false],['Google Calendar','Meeting booking',false]].map(([n,d,c])=><div className="setting" key={String(n)}><div><b>{n}</b><span>{d}</span></div><button className={c?'connected':'secondary'}>{c?'Connected':'Pending'}</button></div>)}</section><section className="panel"><div className="panelHead"><div><small>GUARDRAILS</small><h2>Agent permissions</h2></div></div>{[['Public-company research',true],['Lead scoring',true],['Draft generation',true],['External LinkedIn action',false],['Publish without review',false]].map(([l,on])=><div className="guard" key={String(l)}><span>{l}</span><i className={on?'toggle on':'toggle'}><b/></i></div>)}</section></div>}
    </main>
  </div>
}

function Metric({label,value,note,icon:Icon}:{label:string;value:string;note:string;icon:typeof Gauge}){return <div className="metric"><Icon size={17}/><span>{label}</span><b>{value}</b><small>{note}</small></div>}
function Avatar({text}:{text:string}){return <div className="avatar">{text}</div>}
function LeadRow({lead,analyze,busy}:{lead:Lead;analyze:(l:Lead)=>void;busy:boolean}){return <div className="leadrow"><Avatar text={lead.initials}/><div><b>{lead.name}</b><span>{lead.title} · {lead.company}</span></div><div><em>{lead.offer}</em><span>{lead.signal}</span></div><strong>{lead.score}</strong><button onClick={()=>analyze(lead)} disabled={busy}><Sparkles size={14}/></button></div>}
function Empty(){return <div className="empty"><Bot size={22}/>Queue clear.</div>}
