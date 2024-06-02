import NavigationSidebar from "@/components/navigation/navigation-sidebar";

export default async function MainLoyut({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full">
      <div className="flex h-full w-[72px] z-30 flex-col fixed inset-y-0">
        <NavigationSidebar />
      </div>
      <main className="pl-[72px] h-full">{children}</main>
    </div>
  );
}
