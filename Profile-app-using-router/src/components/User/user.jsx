import { useParams } from "react-router-dom";

function User(){
    const {userid} = useParams()
    return (
     <div className=" bg-red-300 text-black text-center text text-4xl py-10">
         User: {userid}
         <p className='text-2xl '> Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        Consectetur fugiat ipsam illum repellat, similique culpa nisi voluptate,
         excepturi corrupti dignissimos aliquid assumenda facilis hic quasi deleniti dolore 
         laudantium amet quaerat!</p>
     </div>
     )
    
}
export default User