import Wrapper from '@/components/wrapper';
export default function Dashboard() {
    return (
        <section className="flex flex-col lg:flex-row">
        <section className="flex h-screen w-full flex-col justify-between p-9 lg:h-auto">
             <Wrapper>
            <h1>Dashboard</h1>
            </Wrapper>
        </section>
        </section>
    )
    }