// 今回はクライアントサイドもルーティングもないので何もimportしない
const kv = await Deno.openKv();

await kv.set(['LDH', 'GENERATIONS'], { id: '1', NoP: 6 });
await kv.set(['LDH', 'The RAMPAGE'], { id: '2', NoP: 16 });
await kv.set(['LDH', 'FANTASTICS'], { id: '3', NoP: 8 });

//const LDH = await kv.get(['LDH', 'GENERATIONS']);
//console.log(LDH.key);

const ldh = await kv.list({ prefix: ['LDH'] });

for await (const A of ldh) {
  console.log(A.key);
  console.log(A.value);
}

//const deleteList = await kv.list({ prefix: ['LDH'] });
//const atomic = kv.atomic();
//for await (const e of deleteList) atomic.delete(e.key);
//await atomic.commit();

async function getNextId() {
  const key = ['counter', 'LDH'];
  const res = await atomic().sum(key, 1n).commit();
  if (!res.ok) {
    console.error('IDナンバーの作成に失敗しました。');
    return null;
  }
  const counter = await kv.get(key);
  return Number(counter.value);
}
