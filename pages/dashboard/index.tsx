import Wrapper from '@/components/wrapper';

function Box(){
    return (
        <div className='bg-white h-40 w-40 rounded-md'>
            
        </div>
    )
}
export default function Dashboard() {
    
    return (
        <section className="flex flex-col lg:flex-row">
        <section className="flex h-screen w-full flex-col justify-between p-9 lg:h-auto">
             <Wrapper show={true}>
                <div className='flex flex-row mt-20'>
                    <Box/>
                </div>
            </Wrapper >
        </section>
        </section>
    )
    }

