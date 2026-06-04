import Image from "next/image";
import Button from "../components/button";

export default async function Home() {
  const res = await fetch('https://api.freeapi.app/api/v1/public/randomusers?page=1&limit=10');
  const data = await res.json();
  console.log(data.data);
  // console.log(window);
  return (
    <div>
      <h1 className="text-5xl font-bold">Home Page</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias odit, sapiente minus repellat, ex esse facilis in ipsum quae voluptatem, qui optio eaque ea quia suscipit reprehenderit labore molestias eligendi harum nihil. Inventore delectus consectetur, dignissimos accusamus animi quos nobis?</p>

      <Button />
    </div>
  );
}
