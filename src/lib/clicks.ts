import { MongoClient, type Collection } from "mongodb";

type ClickDoc = { _id: string; count: number };

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB ?? "linknamu";

// 개발 모드의 HMR에서 연결이 계속 새로 생기지 않도록 전역에 캐시합니다.
const globalForMongo = globalThis as unknown as {
  _mongoClientPromise?: Promise<MongoClient>;
  _memoryClicks?: Map<string, number>;
};

async function getCollection(): Promise<Collection<ClickDoc> | null> {
  if (!uri) return null;
  if (!globalForMongo._mongoClientPromise) {
    globalForMongo._mongoClientPromise = new MongoClient(uri).connect();
  }
  const client = await globalForMongo._mongoClientPromise;
  return client.db(dbName).collection<ClickDoc>("clicks");
}

// MONGODB_URI가 없을 때(로컬 개발) 쓰는 메모리 저장소. 서버를 재시작하면 초기화됩니다.
function memory(): Map<string, number> {
  if (!globalForMongo._memoryClicks) globalForMongo._memoryClicks = new Map();
  return globalForMongo._memoryClicks;
}

export async function incrementClick(id: string): Promise<number> {
  const col = await getCollection();
  if (!col) {
    const next = (memory().get(id) ?? 0) + 1;
    memory().set(id, next);
    return next;
  }
  const doc = await col.findOneAndUpdate(
    { _id: id },
    { $inc: { count: 1 } },
    { upsert: true, returnDocument: "after" },
  );
  return doc?.count ?? 1;
}

export async function getClickCounts(ids: string[]): Promise<Record<string, number>> {
  const counts: Record<string, number> = Object.fromEntries(ids.map((id) => [id, 0]));
  try {
    const col = await getCollection();
    if (!col) {
      for (const id of ids) counts[id] = memory().get(id) ?? 0;
      return counts;
    }
    const docs = await col.find({ _id: { $in: ids } }).toArray();
    for (const d of docs) counts[d._id] = d.count;
  } catch (err) {
    // DB 장애가 페이지 전체를 막지 않도록 0으로 표시합니다.
    console.error("[clicks] 클릭 수 조회 실패:", err);
  }
  return counts;
}
