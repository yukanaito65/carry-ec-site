import useSWR, { mutate, useSWRConfig } from "swr";
import { Layout } from "../component/layout";
import { cookieId } from "../component/layout";

export const fetcher: (args: string) => Promise<any> = (...args) => fetch(...args).then(res => res.json());

export default function History() {
    //  const cookieId=document.cookie.split('; ').find((row) => row.startsWith('id')).split('=')[1];
  const { data, error } = useSWR(`http://localhost:8000/users/${cookieId}`, fetcher);
  const { mutate } = useSWRConfig()

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

    return(
        <Layout show={true}>
       <p>
        {data.map(({history,address}:any)=>{
            return(
                <>
                <p>{address}</p>
                <p>{history.map(({ name}:any)=>{
                    return(
                        <>
                        <p>{name}</p>

                        </>
                    )
                })}
                </p>
                </>
            )
        })}
       </p>
        </Layout>
    )


    };



 
    // const {data,error}= useSWR(`http://localhost:8000/users/`,fetcher);
    // const{mutate}=useSWRConfig()
    
    // if (error) return <div>Failed to load</div>;
    //   if (!data) return <div>Loading...</div>;
    
    //   return(
    //     <p>
    // {data.map(({address,history}:any)=>{
    //     return(
    //         <>
    //         <p>{address}</p>
    //         <p>{history.map(({name,price}:any)=>{
    //             return(
    //                 <>
    //                 <p>{name}</p>
    //                 <p>{price}</p>
    //                 </>
    //             )
    //         })}
    //         </p>
    //         </>
    //     )
    // })}
    
    //     </p>
    //   )
