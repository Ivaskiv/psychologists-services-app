import{r as i,u as d,s as g,a as m,j as t,N as e,l as v}from"./index-C-84pxDB.js";import{M as b}from"./ModalAuth-Co74s20Y.js";import{s as x}from"./sprite-6VVJTl7v.js";const j="_header_container_16gw7_3",N="_header_16gw7_3",p="_logo_16gw7_31",w="_nav_menu_16gw7_43",f="_active_16gw7_73",y="_auth_buttons_16gw7_78",L="_auth_button_user_16gw7_83",M="_auth_button_login_16gw7_84",k="_auth_button_logout_16gw7_85",C="_auth_button_registration_16gw7_86",S="_user_info_16gw7_122",E="_avatar_16gw7_127",H="_user_name_16gw7_134",U="_icon_arrow_16gw7_170",s={header_container:j,header:N,logo:p,nav_menu:w,active:f,auth_buttons:y,auth_button_user:L,auth_button_login:M,auth_button_logout:k,auth_button_registration:C,user_info:S,avatar:E,user_name:H,icon_arrow:U},A=()=>{const[n,r]=i.useState(null),o=d(g),l=m(),_=!!(o&&o.uid),c=a=>r(a),u=()=>r(null),h=async()=>{try{await l(v()).unwrap(),u()}catch(a){console.error("Logout failed",a)}};return i.useEffect(()=>{o&&(console.log("User object in Header:",o),console.log("DisplayName:",o.displayName))},[o]),t.jsxs("div",{className:s.header_container,children:[t.jsxs("header",{className:s.header,children:[t.jsxs("div",{className:s.logo,children:[t.jsx("span",{children:"psychologists."}),"services"]}),t.jsxs("nav",{className:s.nav_menu,children:[t.jsx(e,{to:"/",end:!0,className:({isActive:a})=>a?s.active:"",children:"Home"}),t.jsx(e,{to:"/psychologists",className:({isActive:a})=>a?s.active:"",children:"Psychologists"}),_&&t.jsx(e,{to:"/favorites",className:({isActive:a})=>a?s.active:"",children:"Favorites"})]}),t.jsx("div",{className:s.auth_buttons,children:_?t.jsxs("div",{className:s.user_info,children:[t.jsxs("button",{className:s.auth_button_user,children:[t.jsx("svg",{className:s.avatar,children:t.jsx("use",{href:`${x}#icon-avatar`})}),t.jsx("div",{className:s.user_name,children:o.displayName||"User"})]}),t.jsx("button",{className:s.auth_button_logout,onClick:h,children:"Log out"})]}):t.jsxs(t.Fragment,{children:[t.jsx("button",{className:s.auth_button_login,onClick:()=>c("login"),children:"Login"}),t.jsx("button",{className:s.auth_button_registration,onClick:()=>c("register"),children:"Registration"})]})})]}),t.jsx(b,{isOpen:n!==null,onClose:u,type:n})]})};export{A as default};
