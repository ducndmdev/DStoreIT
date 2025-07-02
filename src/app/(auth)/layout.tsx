import Image from "next/image";
import { PropsWithChildren } from "react";

const Layout = async ({ children }: PropsWithChildren) => {
  return (
    <main className="flex h-screen">
      <section className="bg-brand flex max-w-[580px] flex-1 items-center justify-center max-sm:hidden">
        <div className="mx-auto flex h-3/4 w-3/4 flex-col justify-between gap-8">
          <Image
            src="/assets/icons/logo-full.svg"
            alt="logo"
            width={284}
            height={82}
          />

          <div className="flex flex-col gap-4.5 text-white">
            <h1>Manage your files the best way</h1>
            <p>
              Awesome, we've created the perfect place for you to store all your
              documents.
            </p>
          </div>

          <div className="flex items-center justify-center">
            <Image
              src="/assets/images/files.png"
              alt="files"
              width={342}
              height={342}
            />
          </div>
        </div>
      </section>
      <section className="flex-center w-full flex-1 flex-col gap-8 bg-white">
        <Image
          src="/assets/icons/logo-full-brand.svg"
          alt="logo"
          width={284}
          height={82}
        />

        {children}
      </section>
    </main>
  );
};

export default Layout;
