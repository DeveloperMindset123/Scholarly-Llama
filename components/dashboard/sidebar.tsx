
function Element({text}: {text: string}){
    return(
        <div className='hover:bg-gray-200 rounded-lg p-[0.25rem] pt-[0.25rem] cursor-pointer'>{text}</div>
    )
}

export default function Sidebar(){
    return(
        <>
            <Element text='Automata Theory'/>
        </>
    )
}