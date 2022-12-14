export interface HomeProps {
  poolCount: number;
  guessCount: number;
  usersCount: number;
}

import Image from "next/image";
import appPreviewImg from "../assets/app-nlw-copa-preview.png";
import logo from "../assets/logo.svg";
import userAvatar from "../assets/users-avatar-example.png";
import iconCheck from "../assets/icon-check.svg";
import { api } from "../lib/axios";
import { FormEvent, useState } from "react";



export default function Home(props: HomeProps) {

  const [value, setValue] = useState("")

  async function createPool(event: FormEvent){
    event.preventDefault() 

    try{
      const response = await api.post('/pools', {
        title: value
      });


      const { code } = response.data
      await navigator.clipboard.writeText(code)
      alert('Bolão criado com sucesso! O código foi copiado para a área de transferência!!')
      setValue('')

    } 
    catch(error){
      console.log(error)
      alert('Falha ao criar bolão, tente novamente!')
    }
  }

  return (
    <div className="max-w-6xl h-screen mx-auto grid grid-cols-2 items-center gap-28">
      <main>
        <Image src={logo} alt="logo" quality={100} />
        <h1 className="mt-14 text-white text-5xl font-bold leading-tight">
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>
        <div className="mt-10 flex items-center gap-2">
          <Image src={userAvatar} alt="avatares" quality={100} />
          <strong className="text-gray-100 text-xl">
            <span className="text-ignite-500">+{props.usersCount}</span> pessoas já estão
            usando
          </strong>
        </div>

        <form className="mt-10 flex" onSubmit={createPool}>
          <input
            type="text"
            required
            placeholder="Qual nome do seu bolão?"
            value={value}
            onChange={event => setValue(event.target.value)}
            className="flex-1 px-6 py-4 rounded bg-gray-800 mr-2 border border-gray-600 text-sm text-gray-100 "
          />
          <button
            type="submit"
            className="bg-yellow-500 px-6 py-4 rounded text-gray-900 font-bold text-sm uppercase  hover:bg-yellow-700"
          >
            Criar meu bolão
          </button>
        </form>

        <p className="mt-4 text-gray-300 text-sm leading-relaxed">
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas 🚀
        </p>

        <div className=" mt-10 pt-10 border-t boder-gray-600 flex justify-between text-gray-100">
          <div className="flex items-center gap-6">
            <Image src={iconCheck} alt="" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{props.poolCount}</span>
              <span>Bolões criados</span>
            </div>
          </div>

          <div className="w-px h-14 bg-gray-600" />

          <div className="flex items-center gap-6">
            <Image src={iconCheck} alt="" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{props.guessCount}</span>
              <span>Palpites enviados</span>
            </div>
          </div>
        </div>
      </main>
      <Image src={appPreviewImg} alt="celulares" quality={100} priority/>
    </div>
  );
}

// export const getServerSideProps = async () => {
//   const [poolCountResponse, guessCountResponse, usersCountResponse] = await Promise.all([
//     api.get("pools/count"),
//     api.get("guesses/count"),
//     api.get("users/count"),
//   ]);

//   return {
//     props: {
//       poolCount: poolCountResponse.data.count,
//       guessCount: guessCountResponse.data.count,
//       usersCount: usersCountResponse.data.count,
//     },
//   };
// };

export const getStaticProps = async () =>{
  const [poolCountResponse, guessCountResponse, usersCountResponse] = await Promise.all([
    api.get("pools/count"),
    api.get("guesses/count"),
    api.get("users/count"),
  ]);

  return {
    props: {
      poolCount: poolCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
      usersCount: usersCountResponse.data.count,
    },
  };
}