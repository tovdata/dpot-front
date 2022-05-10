import { setDataSource } from "../components/common/Table";

export const getPIDataFromAPI = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/project/1f9f709e-4d12-4921-8aba-721bfc3850cc`);
  const data = await response.json();
  return setDataSource([data]);
}
interface postPIDataFromAPIProps {
  mode: string,
  data: any
}
export const postPIDataFromAPI = async ({ mode, data }: postPIDataFromAPIProps) => {
  let response = null;
  switch (mode) {
    case 'add':
      response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/project/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      break;
    case 'save':
      response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/project/${data.project_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      break;
  }
  return response;
}