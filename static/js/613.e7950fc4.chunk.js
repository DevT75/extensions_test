"use strict";(self.webpackChunkrewards=self.webpackChunkrewards||[]).push([[613],{1714:(t,e,r)=>{r.d(e,{pY:()=>i});var a=r(6511);const n="0x1626ba7e",s=[{type:"bytes32",name:"hash"},{type:"bytes",name:"signature"}],c=[{type:"bytes4"}];async function i(t){return(0,a.readContract)({contract:t.contract,method:[n,s,c],params:[t.hash,t.signature]})}},3613:(t,e,r)=>{r.r(e),r.d(e,{checkContractWalletSignature:()=>p});var a=r(2096);const n="\x19Ethereum Signed Message:\n";var s=r(883),c=r(2678),i=r(4776);function u(t,e){return(0,a.S)(function(t){const e="string"===typeof t?(0,i.i3)(t):"string"===typeof t.raw?t.raw:(0,i.My)(t.raw),r=(0,i.i3)(`${n}${(0,c.E)(e)}`);return(0,s.xW)([r,e])}(t),e)}var o=r(7779),h=r(1714);const g="0x1626ba7e";async function p(t){if(!(0,o.q)(t.signature))throw new Error("The signature must be a valid hex string.");return await(0,h.pY)({contract:t.contract,hash:u(t.message),signature:t.signature})===g}}}]);
//# sourceMappingURL=613.e7950fc4.chunk.js.map