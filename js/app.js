
// Static presentation gate only. Do not use client-side credentials for real security.
(() => {
  const USERNAME = "sahil";
  const PASSWORD = "India@11";
  const authScreen = document.getElementById("authScreen");
  const protectedContent = document.getElementById("protectedContent");
  const loginForm = document.getElementById("loginForm");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const loginError = document.getElementById("loginError");
  const togglePassword = document.getElementById("togglePassword");
  const eyeIcon = document.getElementById("eyeIcon");

  const unlock = () => {
    authScreen.hidden = true;
    protectedContent.hidden = false;
    document.body.classList.remove("auth-locked");
  };

  if (sessionStorage.getItem("cellmaPresentationAuthenticated") === "true") {
    unlock();
  } else {
    document.body.classList.add("auth-locked");
    usernameInput.focus();
  }

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    if (username === USERNAME && password === PASSWORD) {
      sessionStorage.setItem("cellmaPresentationAuthenticated", "true");
      loginError.textContent = "";
      unlock();
    } else {
      loginError.textContent = "Incorrect username or password. Please try again.";
      passwordInput.value = "";
      passwordInput.focus();
    }
  });

  togglePassword.addEventListener("click", () => {
    const shouldShow = passwordInput.type === "password";
    passwordInput.type = shouldShow ? "text" : "password";
    togglePassword.setAttribute("aria-label", shouldShow ? "Hide password" : "Show password");
    togglePassword.setAttribute("aria-pressed", String(shouldShow));
    eyeIcon.textContent = shouldShow ? "◎" : "◉";
  });
})();

const details = {
  patient:{icon:"♙",title:"Patient",text:"The end user accesses patient-facing healthcare services through the portal.",items:["Uses a browser or supported client","Interacts with the React Patient Portal","Does not connect directly to the MySQL database"]},
  frontend:{icon:"◈",title:"React Patient Portal",text:"The patient-facing frontend. It communicates with the Patient API using HTTP REST requests.",items:["Renders patient-facing workflows","Sends requests to backend endpoints","Sends the JWT on authenticated requests","Does not directly access the shared database"]},
  backend:{icon:"⌘",title:"Cellma Patient API",text:"The Java backend responsible for patient portal API operations and integrations.",items:["Java 21 and Spring Boot","REST API endpoints","Custom JWT authentication filter","Custom request sanitization filter","Works with the shared Cellma MySQL database","Publishes events to Kafka for the separate Notification Service"]},
  database:{icon:"▤",title:"Shared Cellma MySQL database",text:"The Patient API accesses the shared database used by the main Cellma platform.",items:["Shared data layer for Patient API and core Cellma","Avoids a separate REST call to core Cellma for the relevant shared-data operations","Introduces schema coupling and coordinated-change considerations","Confirm actual schemas, table ownership and transaction boundaries"]},
  payment:{icon:"₹",title:"Razorpay payment gateway",text:"External payment provider integrated with the Patient Portal backend.",items:["Patient API integrates with Razorpay","Payment processing is external to the Patient API","Confirm exact order creation, checkout, signature verification and webhook behavior before presenting detailed sequence"]},
  kafka:{icon:"⇄",title:"Apache Kafka",text:"Messaging infrastructure used by the Patient API to send events to a separate Notification Service.",items:["Patient API acts as event producer in the described flow","Events are sent to Kafka","Notification Service consumes events asynchronously","Confirm topic names, partitions, consumer group, retries and delivery guarantees"]},
  notification:{icon:"✉",title:"Notification Service",text:"A separate microservice consumes Kafka events and handles email processing.",items:["Separate from Patient API","Consumes messages from Kafka","Processes email notifications","Confirm email provider and failure/retry implementation"]}
};
document.querySelectorAll(".arch-node").forEach(node=>{
  node.addEventListener("click",()=>{
    document.querySelectorAll(".arch-node").forEach(n=>n.classList.remove("selected"));
    node.classList.add("selected");
    const d=details[node.dataset.detail];
    document.getElementById("detailContent").innerHTML=`<div class="detail-icon">${d.icon}</div><h3>${d.title}</h3><p>${d.text}</p><ul>${d.items.map(x=>`<li>${x}</li>`).join("")}</ul>`;
  });
});
document.querySelectorAll(".tab").forEach(tab=>{
  tab.addEventListener("click",()=>{
    document.querySelectorAll(".tab").forEach(t=>{t.classList.remove("active");t.setAttribute("aria-selected","false")});
    document.querySelectorAll(".flow-content").forEach(c=>c.classList.remove("active"));
    tab.classList.add("active");tab.setAttribute("aria-selected","true");
    document.getElementById(tab.dataset.tab).classList.add("active");
  });
});
document.getElementById("presentBtn").addEventListener("click",()=>{
  document.body.classList.toggle("presentation");
  document.getElementById("presentBtn").textContent=document.body.classList.contains("presentation")?"Exit presentation":"Presentation mode";
});
const talkText=`Our organization has a healthcare management platform called Cellma, which is used by hospitals and healthcare professionals to manage patient and clinical information. My team worked on the Patient Portal, a patient-facing application that allows patients to access healthcare services digitally.

The frontend is built using React, and it communicates with our Java 21 and Spring Boot Patient API through REST APIs. The Patient API and the main Cellma platform use a shared MySQL database, so the backend accesses the shared data layer directly rather than calling the core Cellma application for those data operations.

We also integrated Razorpay for payment processing and Kafka for asynchronous event communication with a separate Notification Service, which handles email processing. On the security side, we implemented JWT authentication using a custom OncePerRequestFilter, login rate limiting, database-backed IP blocking and a custom request sanitization filter.`;
document.getElementById("copyTalk").addEventListener("click",async()=>{
  const btn=document.getElementById("copyTalk");
  try{await navigator.clipboard.writeText(talkText);btn.textContent="Copied!";setTimeout(()=>btn.textContent="Copy project introduction",1800)}
  catch(e){btn.textContent="Select and copy the text above"}
});
