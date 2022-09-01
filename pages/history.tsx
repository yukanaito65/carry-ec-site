import useSWR, { useSWRConfig } from "swr";
import { Layout } from "../component/layout";


export const fetcher: (args: string) => Promise<any> = (...args) => fetch(...args).then(res => res.json());

export default function History() {
    const cookieId = document.cookie
    .split('; ')
    .find((row) => row.startsWith('id'))
    .split('=')[1];
  const { data, error } = useSWR(`http://localhost:8000/users/${cookieId}`, fetcher);
  const { mutate } = useSWRConfig()

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;


console.log(data);

    return(
        <Layout show={true}>
            {/* <p>{data.map(({history}:any)=>{
            
                return(
                    {history.map(
                        (e:any)=>{
                        return(
                            <p>{e.name}</p>
                        )
                    })}
                )
            })}</p> */}
        </Layout>
    )
    };
