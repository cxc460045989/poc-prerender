// app/layout.tsx 修正后
import type { Metadata } from 'next';

// 【可选】在layout中定义全局默认的Metadata（推荐，替代手动写的静态标签）
export const metadata: Metadata = {
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
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>meeting date - 2026-01-18</title><meta name="description" content="meeting date：2026-01-18">
        <meta name="keywords" content="meeting date,2026-01-18">
        <meta name="og:image" content="https://consvc.hkjc.com/-/media/Sites/JCRW/Simulca…ev=e9139a20b5d04d48a567346b2c1d6dde&amp;sc_lang=zh-HK">
        <meta property="og:title" content="meeting date - 2026-01-18"><meta property="og:description" content="meeting date：2026-01-18">
        <meta property="og:image" content="https://consvc.hkjc.com/-/media/Sites/JCRW/Simulca%E2%80%A6ev=e9139a20b5d04d48a567346b2c1d6dde&amp;sc_lang=zh-HK"><meta property="og:image:width" content="1200">
        <meta property="og:image:height" content="630">
        <meta property="og:image:alt" content="Meeting Date - 2026-01-18">
        <meta property="og:image:type" content="image/jpeg">
      <body>{children}</body>
    </html>
  );
}
