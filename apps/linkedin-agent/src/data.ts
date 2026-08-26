export type View = 'command' | 'leads' | 'campaigns' | 'approvals' | 'content' | 'analytics' | 'settings'
export type LeadStatus = 'qualified' | 'researching' | 'approval' | 'connected' | 'meeting'
export type Lead = { id:string; name:string; title:string; company:string; city:string; score:number; offer:string; signal:string; status:LeadStatus; initials:string }

export const initialLeads: Lead[] = [
  { id:'1', name:'Rhea Mehta', title:'Founder', company:'Luma Clinics', city:'Mumbai', score:94, offer:'ClinicBot', signal:'WhatsApp booking + multi-location', status:'approval', initials:'RM' },
  { id:'2', name:'Karan Shah', title:'Director', company:'Northstar Academy', city:'Mumbai', score:91, offer:'EduFlow', signal:'Admissions campaign active', status:'qualified', initials:'KS' },
  { id:'3', name:'Aditi Rao', title:'COO', company:'SureBridge Insurance', city:'Pune', score:88, offer:'RenewBot', signal:'Renewal ops hiring', status:'researching', initials:'AR' },
  { id:'4', name:'Dev Malhotra', title:'Founder', company:'Noma Commerce', city:'Bengaluru', score:84, offer:'CartSave', signal:'High-volume D2C storefront', status:'connected', initials:'DM' },
  { id:'5', name:'Naina Joseph', title:'Partner', company:'PeopleGrid', city:'Mumbai', score:82, offer:'HireFlow', signal:'Recruitment coordination pain', status:'meeting', initials:'NJ' },
]

export const statusLabel: Record<LeadStatus,string> = {
  qualified:'Qualified', researching:'Researching', approval:'Needs approval', connected:'Connected', meeting:'Meeting booked'
}

export function localScore(seed:string){ return 72 + ([...seed].reduce((sum,c)=>sum+c.charCodeAt(0),0)%25) }
