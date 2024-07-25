"use client";
import Image from "next/image";
import setFileUrl from "@youmeet/utils/setFileUrl";
import { GptCompetency, Offer, Translated } from "@youmeet/gql/generated";
import { useTranslation } from "react-i18next";
import { isCompetency, isOffer } from "@youmeet/types/TypeGuards";
import BoldText from "@youmeet/components/BoldText";
import React from "react";

export default function MainInfos({ el }: { el: Offer | GptCompetency }) {
  const {
    t,
    i18n: { language },
  } = useTranslation();

  if (el.__typename === "Offer" && isOffer(el)) {
    return (
      <div className="px-[12px] m-[12px] mb-[9px] border-l-[0.5px] border-0 border-solid border-black">
        <h3 role="heading" className="my-[3px] text-[16px] dark:text-white">
          {(el.job?.title as Translated)[language as "fr" | "en"]}
        </h3>
        <div className="flex-bet">
          <div>
            <h4
              role="heading"
              className="my-[3px] text-[12px] text-blueGrey900 font-normal dark:text-grey200"
            >
              {el.company?.name}
            </h4>
          </div>
          <div>
            <h4
              role="heading"
              className="my-[3px] text-[14px] font-normal dark:text-grey200"
            >
              {el.company?.location}
            </h4>
          </div>
        </div>
        <div className="flex-bet">
          {el.company ? (
            <Image
              role="img"
              width={20}
              height={20}
              style={{ objectFit: "contain" }}
              src={setFileUrl(el.company?.logo) as string}
              alt={`logo de l'entreprise ${el.company.name}, partenaire de YouMeet.info`}
            />
          ) : (
            <div></div>
          )}
          {!!el.remote && (
            <h4
              role="heading"
              className="my-[3px] text-[12px] dark:text-grey200"
            >
              {t(el.remote)}
            </h4>
          )}
        </div>
      </div>
    );
  } else if (
    el.__typename === "GptCompetency" &&
    isCompetency(el as GptCompetency)
  ) {
    return (
      <div className="p-[24px] flex flex-col gap-[12px]">
        <div className="h-[0.5px] bg-blueGrey500"></div>
        {!!el.title && (
          <h3
            role="heading"
            className="my-[3px] text-[16px] dark:text-white"
          >{`${el.title[0].toUpperCase()}${el.title?.slice(1)}`}</h3>
        )}
        {!!el.definition && (
          <BoldText
            text={`${el.definition?.slice(0, 100)}...+`}
            containerStyle={{ margin: "0px" }}
          />
        )}
        <ul role="list" className="list-disc">
          {el.advantages?.map((advantage, i) => {
            if (advantage)
              return (
                <BoldText
                  key={advantage.slice(0, 10) + i}
                  text={advantage}
                  component="li"
                  containerStyle={{ margin: "0px" }}
                  links
                />
              );
            return undefined;
          })}
        </ul>
      </div>
    );
  }
}