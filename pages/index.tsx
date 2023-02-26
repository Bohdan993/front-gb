import { GetServerSideProps } from "next";
import CreateContentBlock from "../components/contentBlocks/HomePage/CreateContentBlock";
import FirstBlock from "../components/contentBlocks/HomePage/FirstBlock";
import HowToUse from "../components/contentBlocks/HomePage/HowToUse";
import LessonsBlock from "../components/contentBlocks/HomePage/LessonsBlock";
import StatisticBlock from "../components/contentBlocks/HomePage/StatisticBlock";

import { useEffect, useState } from "react";
import { getCookie } from "../api/cookies";
import { useRouter } from "next/router";

export interface IHomePageData {
  first_block: {
    title: string;
    text: string;
    expert_photo_first: string;
    expert_photo_second: string;
    expert_photo_third: string;
    expert: string;
    coach: string;
    business: string;
  };
  create_content: {
    title: string;
    button_lesson: string;
    button_method: string;
    button_course: string;
    button_instruction: string;
    button_docs: string;
    button_all: string;
    icon_text: string;
    icon_list: string;
    icon_file: string;
    icon_picture: string;
  };
  lesson_block: {
    title: string;
    sub_title: string;
    text: string;
    icon_create: { title: string; sub_title: string };
    icon_share: { title: string; sub_title: string };
    icon_earn: { title: string; sub_title: string };
  };
  statistic_block: {
    title: string;
    first_card: {
      title: string;
      text: string;
    };
    second_card: {
      title: string;
      first_number: string;
      first_text: string;
      second_number: string;
      second_text: string;
    };
    sub_title: string;
    text: string;
  };
  how_to_use: {
    title: string;
    slider_card: {
      id: number;
      text: string;
      avatar: string;
      name: string;
      specialization: string;
    }[];
  };
}


const Home = ({ content }: { content: IHomePageData | null }): JSX.Element => {
  const router = useRouter();
  const [contentHome, setContentHome] = useState(content);
  // if (!contentHome) {
  //   setContentHome(content);
  // }

  useEffect(() => {
    if (!content || !contentHome) {
      document.location.reload();
    }
  }, [content, contentHome]);

  if( content === null || contentHome === null) {
    return <div></div>
  }

  const {
    first_block,
    create_content,
    lesson_block,
    statistic_block,
    how_to_use,
  } = contentHome;

  return (
    <>
      <FirstBlock content={first_block} />
      <CreateContentBlock content={create_content} />
      <LessonsBlock content={lesson_block} />
      <StatisticBlock content={statistic_block} />
      <HowToUse content={how_to_use} />
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  

  try {

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/home-page/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Content-Language": context.locale || "uk",
      },
    });

    const resJson = await res.json();
    const { content } = resJson;
  
    return {
      props: {
        content,
      },
    };
  } catch (e) {
    return {
      props: {
        content:null,
      },
    };


  }
};
