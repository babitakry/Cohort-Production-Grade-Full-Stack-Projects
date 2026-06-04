import { Button } from "./components/button";



export default async function Home() {
  try {
    const res = await fetch("https://api.freeapi.app/api/v1/public/randomusers/user/random");
    const jsonData = await res.json();
    console.log(jsonData.data);
  }
  catch (error) {
    console.error("Error fetching data:", error);
  }

  return (
    <div className='p-4 bg-gray-100 rounded-lg text-center m-4'>
      <h1 className="text-3xl font-bold text-gray-800">Welcome to Home Page! Server Side Rendering</h1>

      <p className="mt-9 text-gray-600">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam ex itaque rerum molestias tempore, odio accusamus cupiditate suscipit dolore nesciunt nulla dolorum sunt sed, quasi minima. Ipsam unde asperiores velit!
      </p>

      <Button />
    </div>

  );
}
