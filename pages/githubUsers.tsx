import { gql, useQuery } from "@apollo/client";
import { getUsers } from "../lib/queries/index";

interface GitHubUsersProps {}

const GitHubUsers: React.FC<GitHubUsersProps> = () => {
  const { data, loading, error } = useQuery(gql(getUsers));

  if (loading) return <p>loading</p>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;

  return (
    <ul className="grid gap-4 grid-cols-3">
      {data.getUsers.map((user) => (
        <li key={user.login}>
          <article className="bg-blue-500 p-4 box-border h-32 w-64 m-4">
            <h3>
              {user.login}
            </h3>
            <img className="object-contain h-16" src={user.avatar_url} />
          </article>
        </li>
      ))}
    </ul>
  );
};

export default GitHubUsers;
