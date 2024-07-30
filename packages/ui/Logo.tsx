"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@youmeet/global-config/store";
import { UserState } from "@youmeet/global-config/features/user";
import { logoUrl } from "@youmeet/functions/imports";

export default function Logo({
  gif,
  size = 25,
  link = true,
}: {
  link?: boolean;
  gif?: boolean;
  size?: number;
}) {
  const pathname = usePathname();
  const user = useSelector((state: RootState) => state.user as UserState);

  return gif ? (
    <>
      <Image
        role="img"
        className="animate-pulse dark:hidden"
        src={logoUrl}
        alt="logo de YouMeet.info"
        title="logo de YouMeet.info"
        width={size}
        height={size}
        style={{
          cursor: "pointer",
        }}
      />
      <Image
        role="img"
        className="animate-pulse hidden dark:block"
        src={logoUrl}
        alt="logo de YouMeet.info"
        title="logo de YouMeet.info"
        width={size}
        height={size}
        style={{
          cursor: "pointer",
        }}
      />
    </>
  ) : link ? (
    <Link
      role="link"
      href={user.id ? "/dashboard" : "/"}
      passHref
      style={{ height: "fit-content", display: "flex", alignItems: "center" }}
      tabIndex={-1}
    >
      <Image
        role="img"
        className="dark:hidden"
        src={logoUrl}
        alt="logo de YouMeet.info"
        title="logo de YouMeet.info"
        width={size}
        height={size}
        style={{
          cursor: "pointer",
        }}
      />
      <Image
        role="img"
        className="hidden dark:block"
        src={logoUrl}
        alt="logo de YouMeet.info"
        title="logo de YouMeet.info"
        width={size}
        height={size}
        style={{
          cursor: "pointer",
        }}
      />
    </Link>
  ) : (
    <>
      <Image
        role="img"
        className="dark:hidden"
        src={logoUrl}
        alt="logo de YouMeet.info"
        title="logo de YouMeet.info"
        width={size}
        height={size}
      />
      <Image
        role="img"
        className="hidden dark:block"
        src={logoUrl}
        alt="logo de YouMeet.info"
        title="logo de YouMeet.info"
        width={size}
        height={size}
      />
    </>
  );
}