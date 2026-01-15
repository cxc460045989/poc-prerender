// app/layout.tsx 修正后
import type { Metadata } from 'next';

// 【可选】在layout中定义全局默认的Metadata（推荐，替代手动写的静态标签）
export const generateMetadata: Metadata = {
  // 全局默认的基础配置（page级会覆盖这些）
  openGraph: {
    type: 'website', // 全局默认的og:type
    url: 'https://poc-prerender-beta.vercel.app/', // 全局默认的og:url
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* 移除手动写的<head>里的og相关meta标签！只保留空的<head>或必要的非meta内容 */}
      <head>
        {/* 只保留非og相关的必要标签，比如favicon等，删除所有og:xxx的meta */}
      </head>
      <body>{children}</body>
    </html>
  );
}