export default function UserProfile({ params }: any) {
  return (
    <>
      <main className="text-center py-20">Welcome {params.id}</main>
    </>
  );
}
