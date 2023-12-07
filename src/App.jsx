import { useEffect, useRef, useState } from "react";
import { TbClipboardCopy } from "react-icons/tb";
import { BsClipboardCheckFill } from "react-icons/bs";

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [specialCharacters, setSpecialCharacters] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const copyRef = useRef(null);

  const passwordGenerator = () => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (number) str += "0123456789";
    if (specialCharacters) str += "!@#%^&";
    for (let i = 0; i < length; i++) {
      let idx = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(idx);
    }
    setPassword(pass);
    setCopiedText(false);
  };
  useEffect(() => {
    passwordGenerator();
  }, [length, number, specialCharacters]);

  const handleCopy = () => {
    //copyRef.current.select();
    window.navigator.clipboard.writeText(password);
    setCopiedText(!copiedText);
  };

  return (
    <>
      <div className="bg-black w-full h-screen flex flex-col items-center">
        <div className="w-[98%] m-5 p-2 bg-gray-600 rounded-lg md:max-w-xl">
          <p className="text-yellow-300 pt-8 pb-4 text-center font-bold text-xl sm:text-2xl md:text-3xl">
            Random Password Generator
          </p>
          <div className="w-full sm:flex">
            <input
              className="outline-none rounded-lg text-xl w-full h-20 text-center mb-2 sm:mb-0 md:text-2xl font-mono"
              value={password}
              ref={copyRef}
              readOnly
            />
            <div className="flex justify-center sm:pl-2">
              {copiedText ? (
                <button
                  className="bg-green-700 rounded-lg p-5"
                  onClick={handleCopy}
                >
                  <BsClipboardCheckFill size={25} />
                </button>
              ) : (
                <button
                  className="bg-red-700 rounded-lg p-5"
                  onClick={handleCopy}
                >
                  <TbClipboardCopy size={25} />
                </button>
              )}
              {/* <button
              className="bg-orange-300 rounded-lg p-5"
              onClick={handleCopy}><TbClipboardCopy size={25}/>
              </button> */}
            </div>

            <br />
          </div>
          <div className="flex flex-col items-center mt-2">
            <div>
              <input
                className="in-range:border-green-500"
                id="length"
                type="range"
                min={8}
                max={20}
                value={length}
                onChange={(e) => setLength(e.target.value)}
              />
              <label htmlFor="length" className="text-white font-serif text-lg md:text-2xl">
                Length ({length})
              </label>
            </div>
            <div>
              <input
                className="checked:bg-blue-500"
                id="numbers"
                type="checkbox"
                onChange={() => setNumber((prev) => !prev)}
              />
              <label htmlFor="numbers" className="text-white font-serif md:text-xl">
                Numbers
              </label>
            </div>

            <div>
              <input
                className=" checked:bg-blue-500"
                id="specialCharacters"
                type="checkbox"
                onChange={() => setSpecialCharacters((prev) => !prev)}
              />
              <label
                htmlFor="specialCharacters"
                className="text-white font-serif md:text-xl"
              >
                Special Characters
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
