const API_BASE='https://x8ki-letl-twmt.n7.xano.io/api:X8-e2j1w/priglosi';
const $=selector=>document.querySelector(selector);
const form=$('#rsvpForm');
const status=$('#rsvpStatus');
const countField=$('#guestCountField');
const countSelect=form?.elements.guests_count;
const previewMode=location.pathname.split('/').filter(Boolean).includes('preview');

const UI={
  ru:{saveDate:'Сохраните эту дату',venue:'Место торжества',program:'Программа дня',answer:'Ваш ответ',rsvp:'Будете ли вы с нами?',rsvpLead:'Пожалуйста, подтвердите присутствие — нам важно подготовить всё с заботой.',name:'Ваше имя',namePlaceholder:'Как к вам обращаться?',attendance:'Вы сможете прийти?',yes:'С радостью приду',no:'К сожалению, не смогу',count:'Количество гостей',guestWish:'Пожелание молодожёнам',wishPlaceholder:'Несколько тёплых слов…',submit:'Отправить ответ',sending:'Отправляем…',success:'Спасибо! Ваш ответ сохранён.',nameRequired:'Пожалуйста, укажите ваше имя.',sendError:'Не удалось сохранить ответ. Попробуйте ещё раз.',countdown:'До нашей свадьбы',days:'дней',hours:'часов',minutes:'минут',seconds:'секунд',withLove:'С любовью,',loading:'Загружаем приглашение…',loadError:'Не удалось загрузить приглашение.',retry:'Попробовать снова',months:['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],monthsGenitive:['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'],week:['Пн','Вт','Ср','Чт','Пт','Сб','Вс']},
  ky:{saveDate:'Бул күндү белгилеп коюңуз',venue:'Той өтүүчү жер',program:'Күндүн программасы',answer:'Сиздин жообуңуз',rsvp:'Биз менен болосузбу?',rsvpLead:'Катышарыңызды ырастап коюңуз — баарын камкордук менен даярдоо биз үчүн маанилүү.',name:'Сиздин атыңыз',namePlaceholder:'Сизге кантип кайрылалы?',attendance:'Тойго келе аласызбы?',yes:'Ооба, кубануу менен',no:'Тилекке каршы, келе албайм',count:'Коноктордун саны',guestWish:'Жаштарга каалоо',wishPlaceholder:'Бир нече жылуу сөз…',submit:'Жоопту жөнөтүү',sending:'Жөнөтүлүүдө…',success:'Рахмат! Жообуңуз сакталды.',nameRequired:'Атыңызды жазыңыз.',sendError:'Жооп сакталган жок. Кайра аракет кылыңыз.',countdown:'Үйлөнүү тоюбузга калды',days:'күн',hours:'саат',minutes:'мүнөт',seconds:'секунд',withLove:'Сүйүү менен,',loading:'Чакыруу жүктөлүүдө…',loadError:'Чакыруу жүктөлгөн жок.',retry:'Кайра аракет кылуу',months:['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],monthsGenitive:['январь','февраль','март','апрель','май','июнь','июль','август','сентябрь','октябрь','ноябрь','декабрь'],week:['Дш','Шш','Шр','Бш','Жм','Иш','Жк']},
  kk:{saveDate:'Осы күнді сақтаңыз',venue:'Той өтетін орын',program:'Күн бағдарламасы',answer:'Сіздің жауабыңыз',rsvp:'Бізбен бірге боласыз ба?',rsvpLead:'Қатысатыныңызды растаңыз — бәрін қамқорлықпен дайындау біз үшін маңызды.',name:'Сіздің атыңыз',namePlaceholder:'Сізге қалай жүгінеміз?',attendance:'Тойға келе аласыз ба?',yes:'Иә, қуана келемін',no:'Өкінішке қарай, келе алмаймын',count:'Қонақтар саны',guestWish:'Жас жұбайларға тілек',wishPlaceholder:'Бірнеше жылы сөз…',submit:'Жауапты жіберу',sending:'Жіберілуде…',success:'Рақмет! Жауабыңыз сақталды.',nameRequired:'Атыңызды жазыңыз.',sendError:'Жауап сақталмады. Қайталап көріңіз.',countdown:'Тойымызға дейін қалды',days:'күн',hours:'сағат',minutes:'минут',seconds:'секунд',withLove:'Сүйіспеншілікпен,',loading:'Шақыру жүктелуде…',loadError:'Шақыру жүктелмеді.',retry:'Қайталап көру',months:['Қаңтар','Ақпан','Наурыз','Сәуір','Мамыр','Маусым','Шілде','Тамыз','Қыркүйек','Қазан','Қараша','Желтоқсан'],monthsGenitive:['қаңтар','ақпан','наурыз','сәуір','мамыр','маусым','шілде','тамыз','қыркүйек','қазан','қараша','желтоқсан'],week:['Дс','Сс','Ср','Бс','Жм','Сб','Жс']}
};

const FALLBACK={
  public_id:'12',languages:{enabled:['ru','ky','kk'],default:'ru'},names:{groom:'Бекзат',bride:'Алина'},date:'2027-06-12T16:30:00',
  invitation:{ru:{title:'Дорогие родные и друзья!',text:'Мы будем счастливы разделить с вами этот особенный день. Приглашаем вас стать частью нашего свадебного торжества!'},ky:{title:'Урматтуу туугандар жана достор!',text:'Бул өзгөчө күндү сиздер менен бирге өткөрүүгө кубанычтабыз. Сиздерди үйлөнүү тоюбузга чакырабыз!'},kk:{title:'Құрметті туыстар мен достар!',text:'Осы ерекше күнді сіздермен бірге өткізуге қуаныштымыз. Сіздерді үйлену тойымызға шақырамыз!'}},
  wish_block:{enabled:true,content:{ru:{title:'Наши пожелания',text:'Самый ценный подарок для нас — ваше присутствие, улыбки и хорошее настроение!'},ky:{title:'Биздин каалообуз',text:'Биз үчүн эң баалуу белек — сиздердин катышууңуздар, жылмаюуңуздар жана жакшы маанайыңыздар!'},kk:{title:'Біздің тілегіміз',text:'Біз үшін ең қымбат сыйлық — сіздердің қатысуларыңыз, күлкілеріңіз және жақсы көңіл күйлеріңіз!'}}},
  ceremonies:[{time:'16:30',sort_order:1,content:{ru:{title:'Встреча гостей',text:'Приветственные напитки, тёплые объятия и памятные фотографии.'},ky:{title:'Конокторду тосуп алуу',text:'Суусундуктар, жылуу кучакташуулар жана эстелик сүрөттөр.'},kk:{title:'Қонақтарды қарсы алу',text:'Қош келдіңіздер сусыны, жылы құшақтасу және естелік суреттер.'}}},{time:'17:00',sort_order:2,content:{ru:{title:'Свадебная церемония',text:'Разделите с нами трогательный момент рождения нашей семьи.'},ky:{title:'Үйлөнүү үлпөтү',text:'Үй-бүлөбүздүн түптөлүшүндөгү толкунданткан көз ирмемге күбө болуңуздар.'},kk:{title:'Неке қию рәсімі',text:'Отбасымыздың құрылуындағы әсерлі сәтке бірге куә болыңыздар.'}}},{time:'18:00',sort_order:3,content:{ru:{title:'Праздничный ужин',text:'Вкусные блюда, искренние поздравления и уютная атмосфера.'},ky:{title:'Майрамдык кечки тамак',text:'Даамдуу тамактар, чын жүрөктөн айтылган куттуктоолор жана жылуу маанай.'},kk:{title:'Мерекелік кешкі ас',text:'Дәмді тағамдар, шынайы құттықтаулар және жайлы атмосфера.'}}},{time:'20:00',sort_order:4,content:{ru:{title:'Танцы и веселье',text:'Зажигательные танцы, улыбки и незабываемые моменты.'},ky:{title:'Бий жана көңүл ачуу',text:'Шаңдуу бийлер, жылмаюулар жана унутулгус көз ирмемдер.'},kk:{title:'Би және көңіл көтеру',text:'Көңілді билер, күлкі мен ұмытылмас сәттер.'}}},{time:'23:00',sort_order:5,content:{ru:{title:'Завершение вечера',text:'Спасибо, что разделили с нами этот счастливый день!'},ky:{title:'Кеченин аякташы',text:'Бул бактылуу күндү биз менен бөлүшкөнүңүздөр үчүн рахмат!'},kk:{title:'Кештің аяқталуы',text:'Осы бақытты күнді бізбен бірге өткізгендеріңіз үшін рақмет!'}}}],
  venue:{content:{ru:{type:'Банкетный зал',name:'Изумруд',address:'г. Бишкек, ул. Чуй, 123'},ky:{type:'Банкеттик зал',name:'Изумруд',address:'Бишкек ш., Чүй көч., 123'},kk:{type:'Банкет залы',name:'Изумруд',address:'Бішкек қ., Чүй көш., 123'}},map:{enabled:true,google_url:'',two_gis_url:''}},rsvp:{enabled:true,allow_guest_wish:true,max_guests:10}
};

const state={record:FALLBACK,lang:'ru',publicId:'12',weddingDate:new Date('2027-06-12T10:30:00Z')};
const countdownParts={days:$('[data-countdown="days"]'),hours:$('[data-countdown="hours"]'),minutes:$('[data-countdown="minutes"]'),seconds:$('[data-countdown="seconds"]')};

function normalizeLang(code){return code==='kg'?'ky':(['ru','ky','kk'].includes(code)?code:'ru')}
function enabledLanguages(){const raw=state.record?.languages?.enabled;const list=Array.isArray(raw)?raw.map(normalizeLang):['ru'];return [...new Set(list.filter(code=>UI[code]))]}
function invitationId(){const query=new URLSearchParams(location.search).get('id');if(query)return query;const parts=location.pathname.split('/').filter(Boolean).filter(part=>part!=='preview'&&part!=='index.html');return parts.at(-1)||'12'}
function asArray(value){return Array.isArray(value)?value:(value&&typeof value==='object'?Object.values(value):[])}
function localized(container){if(!container||typeof container!=='object')return{};return container[state.lang]||container[state.lang==='ky'?'kg':state.lang]||container[normalizeLang(state.record?.languages?.default)]||container.ru||Object.values(container)[0]||{}}
function text(id,value){const element=$(id);if(element)element.textContent=value??''}
function parseWeddingDate(value){if(!value)return new Date(FALLBACK.date+'+06:00');const source=String(value),zoned=/Z$|[+-]\d\d:\d\d$/.test(source)?source:`${source}+06:00`,parsed=new Date(zoned);return Number.isNaN(parsed.getTime())?new Date(FALLBACK.date+'+06:00'):parsed}
function safeHttpUrl(value,fallback){try{const url=new URL(String(value||''));return /^https?:$/.test(url.protocol)?url.href:fallback}catch{return fallback}}

function renderCalendar(date,copy){
  const year=date.getFullYear(),month=date.getMonth(),day=date.getDate();text('#calendarMonth',copy.months[month]);text('#calendarYear',year);
  const weekdays=$('#calendarWeekdays');weekdays.replaceChildren(...copy.week.map(label=>Object.assign(document.createElement('span'),{textContent:label})));
  const days=$('#calendarDays'),first=(new Date(year,month,1).getDay()+6)%7,total=new Date(year,month+1,0).getDate(),nodes=[];
  for(let index=0;index<first;index++){const empty=document.createElement('span');empty.className='empty';nodes.push(empty)}
  for(let value=1;value<=total;value++){const cell=document.createElement('span');cell.textContent=String(value);if(value===day){cell.className='selected';cell.setAttribute('aria-label',`${value} ${copy.monthsGenitive[month]}`)}nodes.push(cell)}
  days.replaceChildren(...nodes);$('.calendar').setAttribute('aria-label',`${copy.months[month]} ${year}`);
}

function renderProgram(){
  const list=$('#programList'),ceremonies=asArray(state.record.ceremonies).sort((a,b)=>(Number(a.sort_order)||0)-(Number(b.sort_order)||0)).slice(0,5);
  list.replaceChildren(...ceremonies.map(item=>{const content=localized(item.content),li=document.createElement('li'),time=document.createElement('time'),title=document.createElement('h3'),description=document.createElement('p');li.className='program-event';time.textContent=String(item.time||'');time.dateTime=String(item.time||'');title.textContent=String(content.title||'');description.textContent=String(content.text||'');li.append(time,title);if(description.textContent)li.append(description);return li}));
  $('.program-section').hidden=ceremonies.length===0;
}

function renderVenue(copy){
  const content=localized(state.record.venue?.content),section=$('#venueSection'),address=String(content.address||'').trim(),visible=Boolean(content.name||content.type||address);section.hidden=!visible;if(!visible)return;
  text('#venueKicker',copy.venue);text('#venueType',content.type);text('#venueTitle',content.name);text('#venueAddress',address);
  const map=state.record.venue?.map||{},query=encodeURIComponent(address||content.name||'');$('#googleMapLink').href=safeHttpUrl(map.google_url,`https://www.google.com/maps/search/?api=1&query=${query}`);$('#twoGisMapLink').href=safeHttpUrl(map.two_gis_url,`https://2gis.kg/search/${query}`);
}

function syncAttendance(){if(!form)return;const attending=new FormData(form).get('attending')==='yes';countSelect.disabled=!attending;countField.classList.toggle('is-disabled',!attending)}
function configureRsvp(copy){
  const config=state.record.rsvp||{},enabled=config.enabled!==false;$('#rsvpSection').hidden=!enabled;if(!enabled)return;$('#wishField').hidden=config.allow_guest_wish===false;
  const maximum=Math.max(1,Math.min(50,Number(config.max_guests)||10)),current=Number(countSelect.value)||1;countSelect.replaceChildren(...Array.from({length:maximum},(_,index)=>Object.assign(document.createElement('option'),{value:String(index+1),textContent:String(index+1)})));countSelect.value=String(Math.min(current,maximum));
  text('#rsvpLabel',copy.answer);text('#rsvpTitle',copy.rsvp);text('#rsvpLead',copy.rsvpLead);text('#nameLabel',copy.name);$('#guestName').placeholder=copy.namePlaceholder;text('#attendanceLabel',copy.attendance);text('#attendanceYes',copy.yes);text('#attendanceNo',copy.no);text('#guestCountLabel',copy.count);text('#guestWishLabel',copy.guestWish);$('#guestWish').placeholder=copy.wishPlaceholder;text('#submitLabel',copy.submit);syncAttendance();
}

function renderLanguageMenu(){
  const menu=$('#languageMenu'),options=$('#languageOptions'),languages=enabledLanguages(),labels={ru:'RU',ky:'KG',kk:'KZ'};menu.hidden=languages.length<=1;if(menu.hidden)return;text('#languageToggle',labels[state.lang]);
  options.replaceChildren(...languages.map(code=>{const button=document.createElement('button');button.type='button';button.textContent=labels[code];button.classList.toggle('is-active',code===state.lang);button.addEventListener('click',()=>{state.lang=code;localStorage.setItem('pearl-editorial-language',code);render();setTimeout(()=>{menu.classList.remove('is-open');$('#languageToggle').setAttribute('aria-expanded','false')},180)});return button}));
}

function render(){
  const copy=UI[state.lang]||UI.ru,record=state.record,names=record.names||FALLBACK.names,date=state.weddingDate;document.documentElement.lang=state.lang;document.title=`${names.groom||''} & ${names.bride||''} — ${copy.rsvp}`;
  text('#groomName',names.groom);text('#brideName',names.bride);text('#heroDay',String(date.getDate()).padStart(2,'0'));text('#heroMonth',String(date.getMonth()+1).padStart(2,'0'));text('#heroYear',date.getFullYear());
  const invitation=localized(record.invitation);text('#invitationTitle',invitation.title);text('#invitationText',invitation.text);text('#dateKicker',copy.saveDate);text('#dateDay',date.getDate());text('#dateMonth',copy.monthsGenitive[date.getMonth()]);text('#dateYear',date.getFullYear());renderCalendar(date,copy);
  text('#programTitle',copy.program);renderProgram();renderVenue(copy);const wish=localized(record.wish_block?.content),wishVisible=record.wish_block?.enabled!==false;$('#wishSection').hidden=!wishVisible;if(wishVisible){text('#wishTitle',wish.title);text('#wishText',wish.text)}
  configureRsvp(copy);text('#countdownTitle',copy.countdown);text('#daysLabel',copy.days);text('#hoursLabel',copy.hours);text('#minutesLabel',copy.minutes);text('#secondsLabel',copy.seconds);text('#signatureLabel',copy.withLove);text('#signatureNames',`${names.groom||''} & ${names.bride||''}`);renderLanguageMenu();updateCountdown();
}

function updateCountdown(){const distance=Math.max(0,state.weddingDate.getTime()-Date.now()),total=Math.floor(distance/1000),values={days:Math.floor(total/86400),hours:Math.floor(total%86400/3600),minutes:Math.floor(total%3600/60),seconds:total%60};for(const [key,element] of Object.entries(countdownParts)){if(element)element.textContent=key==='days'?String(values[key]).padStart(3,'0'):String(values[key]).padStart(2,'0')}}
function reveal(){document.body.classList.remove('is-loading');$('#siteLoader').hidden=true}
function loadingError(){const copy=UI[state.lang]||UI.ru;text('#loaderText',copy.loadError);text('#retryButton',copy.retry);$('#retryButton').hidden=false;$('.loader-pearl').hidden=true}

async function loadInvitation(){
  document.body.classList.add('is-loading');$('#siteLoader').hidden=false;$('#retryButton').hidden=true;$('.loader-pearl').hidden=false;text('#loaderText',UI[state.lang].loading);
  if(previewMode){document.body.classList.add('preview-mode');state.record=FALLBACK;state.lang='ru';state.weddingDate=parseWeddingDate(FALLBACK.date);render();reveal();return}
  try{const routeId=invitationId(),response=await fetch(`${API_BASE}/${encodeURIComponent(routeId)}`,{headers:{Accept:'application/json'},cache:'no-store'});if(!response.ok)throw new Error(`HTTP ${response.status}`);const raw=await response.json(),record=raw?.result||raw?.item||raw;if(!record||typeof record!=='object')throw new Error('Invalid invitation');state.record={...FALLBACK,...record};state.publicId=String(record.public_id||routeId);state.weddingDate=parseWeddingDate(record.date);const languages=enabledLanguages(),saved=normalizeLang(localStorage.getItem('pearl-editorial-language')),preferred=normalizeLang(record.languages?.default);state.lang=languages.includes(saved)?saved:(languages.includes(preferred)?preferred:languages[0]||'ru');render();reveal()}
  catch(error){console.error('Invitation load failed',error);loadingError()}
}

form?.addEventListener('change',event=>{if(event.target.name==='attending')syncAttendance()});
form?.addEventListener('submit',async event=>{
  event.preventDefault();const copy=UI[state.lang]||UI.ru,button=form.querySelector('button[type="submit"]'),data=new FormData(form),attendance=data.get('attending')==='yes',payload={name:String(data.get('name')||'').trim(),count:attendance?Math.max(1,Number(data.get('guests_count'))||1):1,attendance,wish:state.record.rsvp?.allow_guest_wish===false?'':String(data.get('wish')||'').trim()};status.className='rsvp-status';if(!payload.name){status.textContent=copy.nameRequired;status.classList.add('is-error');return}button.disabled=true;text('#submitLabel',copy.sending);status.textContent='';
  try{const response=await fetch(`${API_BASE}/${encodeURIComponent(state.publicId||invitationId())}/rsvp`,{method:'POST',headers:{Accept:'application/json','Content-Type':'application/json'},body:JSON.stringify(payload)});if(!response.ok)throw new Error(`HTTP ${response.status}`);form.reset();syncAttendance();status.textContent=copy.success;status.classList.add('is-success')}
  catch(error){console.error('RSVP submit failed',error);status.textContent=copy.sendError;status.classList.add('is-error')}
  finally{button.disabled=false;text('#submitLabel',copy.submit)}
});

$('#languageToggle').addEventListener('click',()=>{const menu=$('#languageMenu'),open=menu.classList.toggle('is-open');$('#languageToggle').setAttribute('aria-expanded',String(open))});
document.addEventListener('click',event=>{const menu=$('#languageMenu');if(!menu.hidden&&!menu.contains(event.target)){menu.classList.remove('is-open');$('#languageToggle').setAttribute('aria-expanded','false')}});
$('#retryButton').addEventListener('click',loadInvitation);
setInterval(updateCountdown,1000);
loadInvitation();
