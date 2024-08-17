import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [count, setCount] = useState(15);

  const [isCheck, setIsCheck] = useState({
    capital: true,
    small: true,
    number: true,
    special: false,
  });

  const [data, setData] = useState({
    password: "",
    showText: "",
  });

  const params = {
    length: count,
    capital: isCheck.capital,
    small: isCheck.small,
    number: isCheck.number,
    special: isCheck.special,
  };

  const increment = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const decrement = () => {
    setCount((prevCount) => Math.max(1, prevCount - 1));
  };

  const [isclick, setclick] = useState(false);

  const reGenerate = () => {
    setclick((prevClick) => !prevClick);
  };

  const copy = () => {
    if (data.password) {
      try {
       
        const textarea = document.createElement('textarea');
        textarea.value = data.password;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
  
        alert("Password copied to clipboard!");
      } catch (err) {
        alert(`Failed to copy password: ${err}`);
      }
    } else {
      alert("No password to copy");
    }
  };

  const handleClick = (buttonType) => {
    setIsCheck((prevState) => ({
      ...prevState,
      [buttonType]: !prevState[buttonType],
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/password", { params });
        if (response.status === 200) {
          console.log(response.data);
          setData((prevData) => ({
            ...prevData,
            password: response.data.password,
            showText: response.data.password_text,
          }));
        }
      } catch (error) {
        alert(`${error}`);
      }
    };
    if (isclick) {
      fetchData();
    }
    fetchData();
  }, [count, isCheck, isclick]);

  return (
    <main className="relative bg-gray-100 min-h-screen flex flex-col justify-between">
      <div className="container mx-auto p-4 md:p-8 lg:p-12 flex flex-col justify-center items-center">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
            Random Password Generator
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-600">
            Create strong and secure passwords to keep your account safe online.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 md:gap-12">
          <div className="md:flex-1 flex items-center justify-center">
            <div className="relative w-80 h-56 md:w-96 md:h-72 overflow-hidden rounded-lg shadow-lg">
              <img
                src="https://media.dev.to/cdn-cgi/image/width=1080,height=1080,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Flio1nb6pdyamemd4q423.jpg"
                alt="Descriptive Alt Text"
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          <div className="md:flex-1 flex flex-col items-center">
            <div className="w-full max-w-md mb-6">
              <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                <div className="flex items-center mb-4 md:mb-0 inside_box_shadow">
                  <span className="text-2xl font-bold text-gray-800">{data.password}</span>
                  <span
                    className={`ml-4 px-4 py-2 rounded-full text-white ${
                      data.showText === "very weak"
                        ? "bg-red-600"
                        : data.showText === "weak"
                        ? "bg-yellow-500"
                        : data.showText === "strong"
                        ? "bg-green-600"
                        : data.showText === "very strong"
                        ? "bg-blue-600"
                        : "bg-gray-400"
                    }`}
                  >
                    {data.showText}
                  </span>
                </div>
                <button
                  onClick={reGenerate}
                  className="text-2xl p-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition"
                >
                  <i className="bi bi-arrow-counterclockwise"></i>
                </button>
              </div>

              <button
                onClick={copy}
                className="bg-purple-700 text-white px-6 py-3 rounded-lg hover:bg-purple-800 transition"
              >
                Copy
              </button>
            </div>

            <div className="w-full max-w-md mt-6 flex flex-col md:flex-row items-center justify-between">
              <h3 className="text-xl font-bold text-gray-800">Password Length:</h3>
              <div className="flex items-center">
                <button
                  onClick={increment}
                  className="text-white bg-purple-700 px-4 py-2 rounded-lg hover:bg-purple-800 transition"
                >
                  +
                </button>
                <p className="mx-4 text-xl font-bold">{count}</p>
                <button
                  onClick={decrement}
                  className="text-white bg-purple-700 px-4 py-2 rounded-lg hover:bg-purple-800 transition"
                >
                  -
                </button>
              </div>
            </div>

            <div className="w-full max-w-md mt-6 mb-7">
              <p className="text-xl font-bold text-gray-800 ">Characters used:</p>
              <div className="flex flex-wrap gap-4 mt-2">
                <div className="flex items-center">
                  <input
                    onChange={() => handleClick("capital")}
                    id="capital-checkbox"
                    type="checkbox"
                    checked={isCheck.capital}
                    className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded"
                  />
                  <label htmlFor="capital-checkbox" className="ml-2 text-lg font-medium">
                    ABC
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    onChange={() => handleClick("small")}
                    id="small-checkbox"
                    type="checkbox"
                    checked={isCheck.small}
                    className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded"
                  />
                  <label htmlFor="small-checkbox" className="ml-2 text-lg font-medium">
                    abc
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    onChange={() => handleClick("number")}
                    id="number-checkbox"
                    type="checkbox"
                    checked={isCheck.number}
                    className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded"
                  />
                  <label htmlFor="number-checkbox" className="ml-2 text-lg font-medium">
                    123
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    onChange={() => handleClick("special")}
                    id="special-checkbox"
                    type="checkbox"
                    checked={isCheck.special}
                    className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded"
                  />
                  <label htmlFor="special-checkbox" className="ml-2 text-lg font-medium">
                    !@#
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="absolute bottom-0 left-1/2 transform -translate-x-1/2 p-4   text-black text-center">
        Pabitra Khadka
      </footer>
    </main>
  );
}
