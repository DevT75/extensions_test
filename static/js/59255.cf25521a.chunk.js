"use strict";(self.webpackChunkrewards=self.webpackChunkrewards||[]).push([[59255],{59255:(a,n,s)=>{s.d(n,{sendGaslessTransaction:()=>i});var e=s(60482);async function i(a){let n,{account:i,transaction:r,serializableTransaction:t,gasless:o}=a;if(t.value&&t.value>0n)throw new Error("Gasless transactions cannot have a value");if("biconomy"===o.provider){const{relayBiconomyTransaction:a}=await s.e(24608).then(s.bind(s,24608));n=await a({account:i,transaction:r,serializableTransaction:t,gasless:o})}if("openzeppelin"===o.provider){const{relayOpenZeppelinTransaction:a}=await s.e(45177).then(s.bind(s,45177));n=await a({account:i,transaction:r,serializableTransaction:t,gasless:o})}if("engine"===o.provider){const{relayEngineTransaction:a}=await s.e(55384).then(s.bind(s,55384));n=await a({account:i,transaction:r,serializableTransaction:t,gasless:o})}if(!n)throw new Error("Unsupported gasless provider");return(0,e.K)({address:i.address,transactionHash:n.transactionHash,chainId:r.chain.id}),n}}}]);
//# sourceMappingURL=59255.cf25521a.chunk.js.map