(self.webpackChunkipaces_org=self.webpackChunkipaces_org||[]).push([[974],{2703:(e,t,n)=>{"use strict";n.d(t,{A:()=>r,P:()=>o});var a=n(4700);function i(e){return new Date(Date.parse(e))}function l(e){return e.toLocaleDateString(void 0,{timeZone:"UTC"})}function o(e){const{title:t,location:n,contentPath:a,startDate:o,endDate:r}=e,c=i(o),s=r?i(r):null,h=l(c),u=s?l(s):null;let m;m=u&&h!==u?`${h} - ${u}`:h;const d=a.match(/^(.*)\.md$/)[1]+"/";Object.defineProperties(this,{title:{value:t},startDate:{value:c},endDate:{value:s},start:{value:h},end:{value:u},date:{value:m},location:{value:n},path:{value:d},contentPath:{value:`./${a}`}})}const r=n.n(a)().map((e=>new o(e))).sort(((e,t)=>t.startDate-e.startDate));r.byPath={},r.forEach((e=>r.byPath[e.path]=e))},2974:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>D});var a=n(6540),i=n(5556),l=n(4625),o=n(2703),r=n(2787),c=n(8106),s=n.n(c),h="hero-h1uJx",u="home-f6vFK",m="left-XF6u2";function d(){return a.createElement("div",{className:h},a.createElement("h1",{className:m},"Welcome to IPACES.org!"))}function g(e){const{event:{title:t,location:n,date:i,path:o}}=e;return a.createElement("div",null,a.createElement("h3",null,a.createElement(l.N_,{to:`/events/${o}`},t)),a.createElement("p",null,i,n?": ":"",n))}function v(e){const t=o.A.slice(0,e.maxEvents).map(((e,t)=>a.createElement("li",{key:t},a.createElement(g,{event:e}))));return 0===t.length?t.push(a.createElement("li",{key:"none"},"No upcoming events.")):t.length<o.A.length&&t.push(a.createElement("li",{key:"more"},a.createElement("div",null,a.createElement("h3",null,a.createElement(l.N_,{to:"/events/"},"Click to see more..."))))),a.createElement("div",null,a.createElement(l.N_,{to:"/events/"},a.createElement("h2",null,"News & Events")),a.createElement("ul",null,t))}function D(){const e=(0,r.A)(s());return a.createElement("div",{className:u},a.createElement(d,null),a.createElement(e,null),a.createElement(v,{maxEvents:3}))}g.propTypes={event:(0,i.instanceOf)(o.P)},v.propTypes={maxEvents:i.number}},4700:e=>{e.exports=[{title:"2017 IPACES Annual Meeting",startDate:"2017-06-30",endDate:"2017-07-02",location:"Southern University of Science and Technology, Shenzhen, China",contentPath:"2017-06-30-annual-meeting.md"},{title:"2017 Spaceborne Earth Observations and Global Change Workshop & Summer School",startDate:"2017-07-10",endDate:"2017-07-14",location:"Southern University of Science and Technology, Shenzhen, China",contentPath:"2017-07-10-summer-school.md"},{title:"2018 IPACES Annual Meeting",startDate:"2018-06-23",endDate:"2018-06-26",location:"China University of Petroleum, Qingdao, China",contentPath:"2018-06-23-annual-meeting.md"},{title:"2019 IPACES Annual Meeting",startDate:"2019-05-30",endDate:"2019-05-31",location:"Changchun, Jilin, China",contentPath:"2019-05-30-annual-meeting.md"},{title:"9th World Chinese Conference of Geological Science",startDate:"2019-06-01",endDate:"2019-06-02",location:"Changchun, Jilin, China",contentPath:"2019-06-01-wccgs.md"},{title:"2021 IPACES Annual Meeting",startDate:"2021-06-21",endDate:"2021-06-23",location:"Virtual Meeting",contentPath:"2021-06-21-annual-meeting.md"},{title:"IPACES Seminar: Probing earthquake triggering and source processes through multiscale analyses of induced seismicity",startDate:"2022-03-10",endDate:"2022-03-10",location:"Dr. Xiaowei Chen, University of Oklahoma",contentPath:"2022-03-10-seminar.md"},{title:"IPACES Seminar: Understanding vegetation water stress across multiple spatial scales",startDate:"2022-04-14",endDate:"2022-04-14",location:"Dr. Lixin Wang, Indiana University-Purdue University Indianapolis",contentPath:"2022-04-14-seminar.md"},{title:"IPACES Seminar: Geochemical Adventures at Earth's Surface",startDate:"2022-05-12",endDate:"2022-05-12",location:"Dr. Xiaoming Liu, University of North Carolina at Chapel Hill",contentPath:"2022-05-12-seminar.md"},{title:"2022 IPACES Annual Meeting",startDate:"2022-06-20",endDate:"2022-06-23",location:"Southern University of Science and Technology, Shenzhen, China",contentPath:"2022-06-20-annual-meeting.md"},{title:"IPACES Seminar: Plate Tectonics on Mars Hindered by Buoyant Martian Eclogite",startDate:"2023-04-29",endDate:"2023-04-29",location:"Dr. Jin Zhang, Texas A&M University",contentPath:"2023-04-29-seminar.md"},{title:"2023 IPACES Annual Meeting",startDate:"2023-07-02",endDate:"2023-07-05",location:"University of Science and Technology, Hefei, China",contentPath:"2023-07-02-annual-meeting.md"},{title:"In Memoriam: Prof. An Yin",startDate:"2023-09-06",endDate:"2023-09-06",location:"",contentPath:"2023-09-06-an-yin.md"},{title:"2024 IPACES Annual Meeting",startDate:"2024-07-02",endDate:"2024-07-04",location:"Beijing, China",contentPath:"2024-07-02-annual-meeting.md"}]}}]);