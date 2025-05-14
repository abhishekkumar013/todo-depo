import { prismClient } from "@repo/db/client";

export default async function Home() {
  const users = await prismClient.user.findMany();
  return (
    <div>
      <h1>User Details</h1>
      <div>{JSON.stringify(users)}</div>
    </div>
  );
}

// export const revalidate = 60 // revalidate every 60 seconds
// or
// export const dynamic = 'force-dynamic'
