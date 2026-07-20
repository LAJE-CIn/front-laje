export default async function teste({
  params
}: {
  params: Promise<{ evento: string }>;
}) {
  const { evento } = await params;

  return <>{evento}</>;
}
