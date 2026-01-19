import Image from "next/image";
import type { Metadata } from "next";

async function fetchMeetingData() {
  const uri = "https://info.cld.hkjc.com/graphql/base/";
  const res = await fetch(uri, {
      method: "POST",
      mode: "cors",
      credentials: "omit",
      referrerPolicy: "strict-origin-when-cross-origin",
      headers: {
        accept: "*/*",
        "accept-language": "en-us,en;q=0.9",
        "content-type": "application/json",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site",
      },
     body: '{"variables":{"localSim":"LOCAL","status":["DECLARED","DEFINED","STARTED","CLOSED","ABANDON_PARTIAL","ABANDON"]},"query":"\\nquery wt_WeatherMeeting( $localSim: LocalSim, $status: [MeetingStatus!])  {\\n  commonMeetings(localSim: $localSim, status: $status) {\\n    date\\n    venueCode\\n    meetingTrack_en\\n    meetingTrack_ch\\n    status\\n    totalNumberOfRace\\n    currentNumberOfRace\\n     meetingType\\n     penetrometerReadings {\\n      reading\\n      readingTime\\n      sequenceNumber\\n    }\\n    hammerReadings {\\n      sequenceNumber\\n      readingTime\\n      reading\\n    }\\n    course {\\n      code\\n      chinese\\n      english\\n      mandarin\\n    }\\n    races {\\n      go_en\\n      go_ch\\n      status\\n      no\\n      raceTrack {\\n        code\\n      }\\n    }\\n  }\\n}\\n"}',
  });
  
  if (!res.ok) throw new Error("API请求失败");
  return res.json();
}

// 🌟 核心：动态生成head标签的meta/title信息（新增图片配置）
export async function generateMetadata(): Promise<Metadata> {
  try {
    const data = await fetchMeetingData();
    const meetingDate = data?.data?.commonMeetings?.[0]?.date || "no date";
    const venueCode = data?.data?.commonMeetings?.[0]?.venueCode || "no code";
    const status = data?.data?.commonMeetings?.[0]?.status || "no status";
   
    
    // 1. 替换为你的图片绝对URL（prerender.io必须用完整路径，不能用相对路径）
    const thumbnailImageUrl = "/next.svg";
    // 可选：根据日期动态生成图片URL（比如不同日期用不同图片）
    // const thumbnailImageUrl = `https://你的图片域名/meeting-${meetingDate}.jpg`;
    
    // 返回Metadata配置（对应head里的title和meta）
    return {
      // 页面标题：拼接日期
      title: `meeting date - ${meetingDate+"--"+venueCode+"--"+status}`,
      // meta标签：描述、关键词等（可自定义）
      description: `meeting date：${meetingDate+"--"+venueCode+"--"+status}`,
      openGraph: {
        title: `meeting date - ${meetingDate+"--"+venueCode+"--"+status}`,
        description: `meeting date：${meetingDate+"--"+venueCode+"--"+status}`,
        type: 'website',
        url: 'https://prerender-poc-test.vercel.app/',
        // 🌟 新增：OGP图片配置（prerender.io优先识别）
        images: [
          {
            url: thumbnailImageUrl, // 图片绝对URL（必填）
            width: 1200, // OGP最佳尺寸（1200x630，宽高比1.91:1）
            height: 630,
            alt: `Meeting Date - ${meetingDate+"--"+venueCode+"--"+status}`, // 图片描述（提升可访问性）
            type: "image/svg", // 图片格式（根据实际图片修改，如image/png）
          },
        ],
      },
      // 🌟 新增：Twitter卡片配置（兼容prerender.io和社交平台）
      twitter: {
        card: "summary_large_image", // 大图卡片样式
        title: `meeting date - ${meetingDate+"--"+venueCode+"--"+status}`,
        description: `meeting date：${meetingDate+"--"+venueCode+"--"+status}`,
        images: [thumbnailImageUrl], // Twitter缩略图
      },
      // 自定义meta标签（比如keywords）
      other: {
        "keywords": `meeting date,${meetingDate+"--"+venueCode+"--"+status}`,
        // 兼容旧版爬虫的图片标签（兜底）
        "og:image": thumbnailImageUrl,
      }
    };
  } catch (error) {
    // 异常时返回默认meta信息（包含默认图片）
    const defaultImageUrl = "/next.svg"; // 替换为默认图片URL
    return {
      title: "meeting-error",
      description: "meeting-error",
      openGraph: {
        title: "meeting-error",
        description: "meeting-error",
        images: [{ url: defaultImageUrl, width: 1200, height: 630, alt: "Meeting Default" }],
      },
      twitter: {
        card: "summary_large_image",
        title: "meeting-error",
        description: "meeting-error",
        images: [defaultImageUrl],
      },
    };
  }
}

export default async function Home() {
  // 复用请求函数获取数据（Next.js会缓存，不会重复请求API）
  const userData = await fetchMeetingData();
  const meetingDate = userData?.data?.commonMeetings?.[0]?.date || "no date";
  const venueCode = userData?.data?.commonMeetings?.[0]?.venueCode || "no code";
  const status = userData?.data?.commonMeetings?.[0]?.status || "no status";

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-2xl font-bold mb-4">Meeting Info</h1>
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
          <div>meeting date: {meetingDate}</div>
          <div>venuecode: {venueCode}</div>
          <div>status: {status}</div>
        </div>
      </main>
    </div>
  );
}
