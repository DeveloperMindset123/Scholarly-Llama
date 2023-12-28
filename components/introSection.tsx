import DashboardButton from './ui/dashboardButton';
import Wrapper from './wrapper';

export default function IntroSection({ number, text }: any) {
  return (
    <section className="flex h-screen w-full flex-col justify-between p-9 lg:h-auto">
      <Wrapper>
        <div className="mx-auto flex max-w-sm flex-col justify-between">
          <span
            className={`-mt-14 inline-block text-[64px] font-bold text-black dark:text-white`}
          >
            {number}
          </span>
          <p className="pb-6 font-medium">{text}</p>

          <DashboardButton />
        </div>
      </Wrapper>
    </section>
  );
}
