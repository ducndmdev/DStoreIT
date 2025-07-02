import Header from "@/components/root/Header";
import MobileNavigation from "@/components/root/MobileNavigation";
import Sidebar from "@/components/root/Sidebar";
import { SIGN_IN_PATH } from "@/constants/path.constants";
import { getLoggedInUser } from "@/lib/actions/auth.actions";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

const Layout = async ({ children }: PropsWithChildren) => {
  const user = await getLoggedInUser();
  if (!user) redirect(SIGN_IN_PATH);

  return (
    <main className="flex h-screen">
      <Sidebar {...user} />
      <div className="flex flex-1 flex-col">
        <MobileNavigation {...user} />
        <Header {...user} />
        <div className="main-content!">{children}</div>
      </div>
    </main>
  );
};

export default Layout;
