"use client";

import { HOME_PATH, NAV_ITEMS } from "@/constants/path.constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = ({
  email,
  fullName,
  avatar,
}: {
  email: string;
  fullName: string;
  avatar: string;
}) => {
  const pathname = usePathname();
  return (
    <aside className="sidebar!">
      <div className="flex flex-1 flex-col justify-between gap-10">
        <div className="flex flex-col gap-10 lg:gap-15">
          <Link href={HOME_PATH}>
            <Image
              src="/assets/icons/logo-full-brand.svg"
              alt="logo"
              width={161}
              height={52}
              className="max-lg:hidden"
            />
            <Image
              src="/assets/icons/logo-brand.svg"
              alt="logo"
              width={52}
              height={52}
              className="hidden max-lg:block"
            />
          </Link>

          <nav className="sidebar-nav!">
            <ul className="flex flex-col gap-5">
              {NAV_ITEMS.map(({ url, icon, name }) => (
                <Link key={name} href={url}>
                  <li
                    className={cn(
                      "sidebar-nav-item!",
                      pathname === url && "shad-active",
                    )}
                  >
                    <Image
                      src={icon}
                      alt={name}
                      width={24}
                      height={24}
                      className={cn(
                        "nav-icon!",
                        pathname === url && "nav-icon-active!",
                      )}
                    />
                    <p
                      className={cn(
                        "hidden font-semibold lg:block",
                        pathname === url && "text-white",
                      )}
                    >
                      {name}
                    </p>
                  </li>
                </Link>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex flex-col gap-8">
          <Image
            src="/assets/images/files-2.png"
            alt="files"
            width={253}
            height={210}
            className="w-full max-lg:hidden"
          />
          <div className="sidebar-user-info!">
            <Image src={avatar} alt="avatar" width={54} height={54} />
            <div className="flex flex-col max-lg:hidden">
              <p className="font-semibold">{fullName}</p>
              <p className="body-14 text-light-200">{email}</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
