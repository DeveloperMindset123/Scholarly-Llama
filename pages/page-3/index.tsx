'use client';

import Image from 'next/image';
import Wrapper from '@/components/wrapper';
import { Button } from '@/components/ui/button';
import DashboardButton from '@/components/ui/dashboardButton';
import boyAndGirl from '@/public/coolLlama.png';
import { useTheme } from 'next-themes';
import IntroSection from '@/components/introSection';

export default function Home() {
  const { theme } = useTheme();
  return (
    <section className="flex flex-col lg:flex-row">
      <IntroSection
        number={'03'}
        text={
          'Generate customized tests from your uploaded textbooks, receive instant scores, and track your progress effortlessly. Watch your knowledge grow and enhance your study routine with a seamless blend of technology and education.'
        }
      />
      <section className="hidden lg:flex h-screen w-full flex-col justify-center items-center bg-[#ffefd6] p-9">
        <Image src={boyAndGirl} alt="Boy and girl playing with robot" />
      </section>
    </section>
  );
}
