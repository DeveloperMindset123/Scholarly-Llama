'use client';

import Image from 'next/image';
import Wrapper from '@/components/wrapper';
import { Button } from '@/components/ui/button';
import DashboardButton from '@/components/ui/dashboardButton';
import manWIthRobot from '@/public/buffestLlama.png';
import { useTheme } from 'next-themes';
import IntroSection from '@/components/introSection';

export default function Home() {
  return (
    <section className="flex flex-col lg:flex-row">
      <IntroSection
        number={'02'}
        text={
          'Upload your textbooks and pose any question you have in mind. Our Llama is ready to provide instant, comprehensive answers, ensuring you grasp every concept at your own pace.'
        }
      />
      <section className="hidden lg:flex h-screen w-full flex-col justify-center items-center bg-[#e0f5ff] p-9">
        <Image src={manWIthRobot} alt="Man sitting in wheelchair" />
      </section>
    </section>
  );
}
