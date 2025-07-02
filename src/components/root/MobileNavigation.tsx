"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { HOME_PATH, NAV_ITEMS } from "@/constants/path.constants";
import { signOut } from "@/lib/actions/auth.actions";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import FileUploader from "./FileUploader";

const MobileNavigation = ({
  avatar,
  fullName,
  email,
  owner,
  accountId,
}: {
  avatar: string;
  fullName: string;
  email: string;
  owner: string;
  accountId: string;
}) => {
  const pathname = usePathname();

  return (
    <header className="mobile-header!">
      <Link href={HOME_PATH}>
        <Image
          src="/assets/icons/logo-brand.svg"
          alt="logo"
          width={52}
          height={52}
        />
      </Link>

      <Sheet>
        <SheetTrigger>
          <Image
            src="/assets/icons/menu.svg"
            alt="logo"
            width={24}
            height={24}
            className="cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent className="shad-sheet! flex flex-col justify-between gap-10">
          <SheetHeader className="flex flex-col gap-5">
            <SheetTitle>
              <div className="header-user!">
                <Image
                  src={avatar}
                  alt="avatar"
                  width={54}
                  height={54}
                  className="header-user-avatar!"
                />
                <div className="flex flex-col">
                  <p className="font-semibold">{fullName}</p>
                  <p className="body-14 text-light-200">{email}</p>
                </div>
              </div>
            </SheetTitle>

            <nav className="mobile-nav!">
              <ul className="mobile-nav-list!">
                {NAV_ITEMS.map(({ url, icon, name }) => (
                  <Link key={name} href={url}>
                    <li
                      className={cn(
                        "mobile-nav-item!",
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
                          "font-semibold",
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
          </SheetHeader>

          <div className="flex flex-col gap-4 p-4">
            <FileUploader owner={owner} accountId={accountId} />
            <Button className="mobile-sign-out-button!" onClick={signOut}>
              <Image
                src="/assets/icons/logout.svg"
                alt="sign-out"
                width={24}
                height={24}
              />
              <p>Sign Out</p>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default MobileNavigation;
