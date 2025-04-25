import Image from "next/image";


export default function PageContact() {

  return <>
    <h2>Контактная информация</h2>

    <div className={`flex flex-nowrap`}>
    
      <p>Электронная почта: <a href="mailto:lialia1986@mail.ru">lialia1986@mail.ru</a></p>
      <p>Социальные сети:</p>
      <Image src={"/tg.png"} width={30} height={30} alt="tg" />
      <a className={`text-sm font-semibold text-gray-600 hover:bg-blue-50 hover:text-green-800 rounded`} href="https://t.me/lyamurka22" target="_blank" rel="noopener noreferrer">  Telegram</a>


      <p><Image src={"/ig.png"} width={30} height={30} alt="ig" /> <a className={`text-sm font-semibold text-gray-600 hover:bg-blue-50 hover:text-green-800 rounded`} href="https://www.instagram.com/lyamurka22" target="_blank" rel="noopener noreferrer">@lyamurka22</a></p>
    </div>






           
   

  </>
}
