'use client';

import Image from 'next/image';
import robot from '@/public/bot-image.png';
import IntroSection from '@/components/introSection';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  return (
    <section className="flex flex-col lg:flex-row">
      <IntroSection
        number={'01'}
        text={
          'ScholarlyLlama -  Our friend right here transforms your textbooks into dynamic chatbots, offering a unique and engaging way to explore and understand your course materials.'
        }
      />
      <section className="hidden lg:flex h-screen w-full flex-col justify-center items-center bg-[#d6ebe9] p-9">
        <Image src={robot} alt="Man sitting in wheelchair" />
      </section>
    </section>
  );
}

//the following code is intended to protect the dashboard page
//export const config = { matcher: ['/dashboard']};
