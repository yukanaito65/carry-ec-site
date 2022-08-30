import React, { useState } from 'react';
import useSWR from 'swr';

// export const fetcher: (args: string) => Promise<any> = (...args) =>
//   fetch(...args).then((res) => res.json());

// export default function Items() {
//   const { data, error } = useSWR('/api/items', fetcher);
//   if (error) return <div>failed to load</div>;
//   if (!data) return <div>loading...</div>;

//   const Search = () => {
//     const [nameText, setNameText] = useState('');
//     const onChangeNameText = (event: any) =>
//       setNameText(event.target.value);

//     const onClickSearch = () => {
//       return data.find((e: any) => {
//         return e.name === nameText;
//       });
//     };

//     return (
//       <div className="panel panel-default">
//         <div className="panel-title">
//           <p>商品を検索する</p>
//         </div>
//         <div className="panel-body">
//           <form method="post" action="#" className="form-horizontal">
//             <label htmlFor="name">商品名</label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={nameText}
//               placeholder={'search'}
//               onChange={onChangeNameText}
//             ></input>
//             <button
//               type="button"
//               value="検索"
//               className="btn btn-primary"
//               onClick={() => {
//                 onClickSearch();
//               }}
//             >
//               検索
//             </button>
//             <button
//               type="reset"
//               value="クリア"
//               className="btn btn-default"
//             >
//               クリア
//             </button>
//           </form>
//         </div>
//       </div>
//     );
//   };
// }
