import Wrapper from '@/components/wrapper';

function Box({text}:any){
    return (
        <div className='bg-white h-40 min-w-[20rem] rounded-md flex-1 flex justify-center items-center'>
            <h3 className='text-black text-xl'>{text ? text :"How to be a straight A student"}</h3>
        </div>
    )
}

// const basePath = 'http://locahost:3000';
// export async function getServerSideProps() {
//   const response = await fetch(`${basePath}/api/getUser`).then((response) => response.json());  //we have not yet defined this route

//   const { user } = response;  //save the resulting user information

//   //if the 'getUser' endpoint doesn't have a user in its response, then we will redirect the user back to the login page
//   //which means this page will only be viewable when 'getUser' returns a user

//   if (!user) {
//     return {
//       redirect: {destination: '/', permanent: false}  //redirect user back to the home page if user doesn't exist
//     };
//   }
//   //we will pass the returned user to the page's react component as a prop
//   return { props: { user }};
// }

export default function Dashboard( ) {
    return (
        <section className="flex flex-col lg:flex-row">
        <section className="flex h-screen w-full flex-col justify-between p-9 lg:h-auto">
             <Wrapper show={true}>
                <div className='flex flex-row flex-wrap px-16 mt-[7rem] gap-14 '>
                    {/* <p></p> */}
                    <Box text={"+ Add PDF"}/>
                    <Box/>
                    <Box/>
                    <Box/>
                    <Box/>
                    <Box/>
                    <Box/>
                    <Box/>
                    <Box/>
                    <Box/>
                    <Box/>
                    <Box/>
                </div>
            </Wrapper >
        </section>
        </section>
    )
    }

