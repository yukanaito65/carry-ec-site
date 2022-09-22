import Link from "next/link";

type Props = {
  lists: {
    name: string;
    path?: string;
  }[];
};

export const BreadCrumb = ({ lists }: Props) => {
  return (
    <ol aria-label="breadcrumb">
      {lists.map(({ name = "ホーム", path = "/" }, index) => (
        <li key={index}>
          {lists.length - 1 !== index ? (
            <Link href={path}>
              <a>{name}</a>
            </Link>
          ) : (
            <span aria-current="page">{name}</span>
          )}
        </li>
      ))}
    </ol>
  );
};
