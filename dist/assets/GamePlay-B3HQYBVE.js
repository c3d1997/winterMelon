import{u as k,f as i,d as e,e as s,h as l,n as y,l as x,m as c,i as u,F as M,a as b,b as w,o}from"./index-DVS9bNHv.js";import{_ as S}from"./X-HemYMZCX.js";import{_ as C}from"./_plugin-vue_export-helper-DlAUqK2U.js";const v="/winterMelon/images/collectEX.png",T="/winterMelon/images/ok.png",G="/winterMelon/images/profileHead.png",I="/winterMelon/images/qa.png",P="/winterMelon/images/profile.png",N="/winterMelon/images/game1.png",R="/winterMelon/images/game2.png",$={key:0,class:"popupBG"},F={key:1,class:"popup"},V={key:2,class:"popup"},q={class:"game"},z={class:"gameTop"},E={class:"gameTop_mission"},W={class:"gameTop_mission-right"},X={class:"gameMid"},h={class:"gameBottom"},j=["src"],H={key:0},O={class:"gameBottom_gameStyle"},U={class:"gameBottom_game"},Y={class:"gameBottom_game-set"},A={key:0},D={class:"gameBottom_game-set"},J={key:0},K={__name:"GamePlay",setup(L){k();const r=b();w();const a=i(!1),n=i(!0),m=i(!1),g=()=>{n.value=!1},_=i({top:"0px",left:"0px"}),f=async()=>{d.value==!0?r.push("qa"):m.value=!0},d=i(!1),B=()=>{m.value=!1,d.value=!0};return(Q,t)=>(o(),e(M,null,[t[14]||(t[14]=s("div",{class:"gameBG"},null,-1)),n.value||m.value?(o(),e("div",$)):l("",!0),n.value?(o(),e("div",F,[s("div",{class:"popup_card"},[s("div",{class:"popup_card-X",onClick:g},t[3]||(t[3]=[s("img",{src:S,alt:""},null,-1)])),t[4]||(t[4]=s("div",{class:"popup_card-content"},[s("p",null,"Game Rules"),s("span",null,"The entrance to this Winter Melon nurturing game will first test the player’s MBTI personality traits to select the type of Winter Melon they want to nurture.")],-1))])])):l("",!0),m.value?(o(),e("div",V,[s("div",{class:"collect"},[t[6]||(t[6]=s("p",null,"You Got the Item",-1)),t[7]||(t[7]=s("div",{class:"collect_object"},[s("img",{src:v,alt:""})],-1)),t[8]||(t[8]=s("span",null,"watering machine",-1)),s("div",{class:"collect_btn",onClick:B},t[5]||(t[5]=[s("img",{src:T,alt:""},null,-1)]))])])):l("",!0),s("div",q,[s("div",z,[t[10]||(t[10]=s("div",null,[s("div",{class:"gameTop_profile"},[s("img",{src:G,alt:""})]),s("div",{class:"gameTop_name"},"Seed State")],-1)),s("div",E,[t[9]||(t[9]=s("div",{class:"gameTop_mission-left"},[s("p",null,"MISSION"),s("span",null,"0 / 4")],-1)),s("div",W,[s("img",{onClick:t[0]||(t[0]=p=>n.value=!0),src:I,alt:""})])])]),s("div",X,[t[12]||(t[12]=s("img",{src:P,alt:""},null,-1)),s("div",{class:"gameMid_collect",style:y(_.value)},t[11]||(t[11]=[s("img",{src:v,alt:""},null,-1)]),4)]),s("div",h,[t[13]||(t[13]=x('<div class="gameBottom_box" data-v-428a554c><div class="gameBottom_box-package" data-v-428a554c><div class="gameBottom_box-index" data-v-428a554c>1</div></div><div class="gameBottom_box-package" data-v-428a554c><div class="gameBottom_box-index" data-v-428a554c>1</div></div><div class="gameBottom_box-package" data-v-428a554c><div class="gameBottom_box-index" data-v-428a554c>1</div></div></div><div class="gameBottom_item" data-v-428a554c>item</div>',2)),s("div",{class:"gameBottom_btn",onClick:f},[s("img",{class:c({filterSet:a.value}),src:`/images/${d.value?"winning":"collect"}.png`,alt:""},null,10,j),a.value?(o(),e("p",H,"00:00:00")):l("",!0)]),s("div",O,[s("div",U,[s("div",Y,[s("img",{onClick:t[1]||(t[1]=p=>u(r).push("game/melonRun")),class:c({filterSet:a.value}),src:N,alt:""},null,2),a.value?(o(),e("p",A,"00:00:00")):l("",!0)]),s("div",D,[s("img",{onClick:t[2]||(t[2]=p=>u(r).push("game/melonCamera")),class:c({filterSet:a.value}),src:R,alt:""},null,2),a.value?(o(),e("p",J,"00:00:00")):l("",!0)])])])])])],64))}},es=C(K,[["__scopeId","data-v-428a554c"]]);export{es as default};