(() => {
const sources = {
  official: { name: 'Official MSRIT', level: 'Official', url: 'https://www.msrit.edu/', verified: '26 Sep 2026' },
  community: { name: 'Campus OS demo data', level: 'Demo data', url: '#', verified: 'Needs verification' },
  department: { name: 'MSRIT Department', level: 'Verified department', url: 'https://www.msrit.edu/Departments.html', verified: '26 Sep 2026' }
};
const places = [
  { id:'library', name:'Central Library', category:'Library', building:'Academic Block', description:'Books, reading spaces and reference support.', x:42,y:36, source:'official' },
  { id:'cse', name:'CSE Department', category:'Academic', building:'Academic Block', description:'Computer Science and Engineering department office.', x:58,y:31, source:'department' },
  { id:'exam', name:'Examination Section', category:'Administration', building:'Admin Block', description:'Examination-related public support and official links.', x:28,y:59, source:'official' },
  { id:'canteen', name:'Student Canteen', category:'Food', building:'Student Centre', description:'Campus dining and refreshment area.', x:61,y:65, source:'community' },
  { id:'health', name:'Medical Centre', category:'Medical', building:'Health Services', description:'On-campus first-aid and student support.', x:25,y:26, source:'community' },
  { id:'placement', name:'Placement Cell', category:'Student Services', building:'Admin Block', description:'Career and placement support.', x:35,y:52, source:'official' }
];
const events = [
  {slug:'innovation-lab-open-house', title:'Innovation Lab Open House', category:'Technical', date:'Today, 4:00 PM', location:'Central Library', organizer:'Campus Innovation Cell', source:'community', status:'Needs verification', description:'A demo listing for the Campus OS development preview.'},
  {slug:'career-readiness-workshop', title:'Career Readiness Workshop', category:'Workshop', date:'Tomorrow, 10:30 AM', location:'Placement Cell', organizer:'Career Services', source:'official', status:'Upcoming', description:'Check the original source before attending.'},
  {slug:'inter-department-sports-meet', title:'Inter-department Sports Meet', category:'Sports', date:'30 Sep, 8:00 AM', location:'Sports Ground', organizer:'Student Activities', source:'community', status:'Needs verification', description:'Schedule is demo data pending source confirmation.'}
];
const notices = [
  {slug:'exam-portal', title:'Examination services and official portal', category:'Examination', date:'26 Sep 2026', source:'official', urgent:false, summary:'Use the official examination portal for authenticated services and current announcements.', url:'https://exam.msrit.edu/'},
  {slug:'placement-guidance', title:'Placement information and student resources', category:'Placement', date:'25 Sep 2026', source:'official', urgent:false, summary:'A directory-style entry pointing to official campus resources.', url:'https://www.msrit.edu/'},
  {slug:'community-listing-policy', title:'Community listings require review', category:'Student', date:'24 Sep 2026', source:'community', urgent:true, summary:'Demo content is visibly separate from official information until verified.', url:'#'}
];
const news = [
  {slug:'campus-information-hub', title:'Campus OS is organizing public campus information', date:'26 Sep 2026', source:'community', summary:'This preview demonstrates a source-aware campus information experience.'},
  {slug:'official-resources', title:'Official MSRIT resources remain the authoritative source', date:'25 Sep 2026', source:'official', summary:'Campus OS links students to original public sources and does not access private systems.'}
];
const services = [
  {name:'Examination Portal', description:'Official portal for examination services that require sign-in.', url:'https://exam.msrit.edu/', source:'official'},
  {name:'MSRIT Website', description:'Public information, departments, institutional services and announcements.', url:'https://www.msrit.edu/', source:'official'},
  {name:'Emergency Contacts', description:'Keep official campus emergency numbers verified before publishing.', url:'#', source:'community'}
];
window.CAMPUS_DATA = { sources, places, events, notices, news, services };
})();
