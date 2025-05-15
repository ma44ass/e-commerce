import configPromise from '@payload-config'
import { getPayload } from 'payload'


export default async function Home() {
  const playload = await getPayload({
    config: configPromise,
  })

  const data = await playload.find({
    collection: "categories",
  })

  return (
    <div>
      {JSON.stringify(data, null, 2)}
    </div>
  );
}
