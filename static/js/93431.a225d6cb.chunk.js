"use strict";(self.webpackChunkrewards=self.webpackChunkrewards||[]).push([[93431],{93431:(n,s,e)=>{function i(n){let s=[`${n.domain} wants you to sign in with your Ethereum account:`,n.address].join("\n");s=[s,n.statement].join("\n\n"),n.statement&&(s+="\n");const e=[];if(n.uri){const s=`URI: ${n.uri}`;e.push(s)}const i=`Version: ${n.version}`;if(e.push(i),n.chain_id){const s=`Chain ID: ${n.chain_id}`||"1";e.push(s)}const o=`Nonce: ${n.nonce}`;e.push(o);const t=`Issued At: ${n.issued_at}`;e.push(t);const a=`Expiration Time: ${n.expiration_time}`;if(e.push(a),n.invalid_before){const s=`Not Before: ${n.invalid_before}`;e.push(s)}n.resources&&e.push(["Resources:",...n.resources.map((n=>`- ${n}`))].join("\n"));return[s,e.join("\n")].join("\n")}async function o(n){const{payload:s,account:e}=n;return{signature:await e.signMessage({message:i(s)}),payload:s}}e.r(s),e.d(s,{signLoginPayload:()=>o})}}]);
//# sourceMappingURL=93431.a225d6cb.chunk.js.map