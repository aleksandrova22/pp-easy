import Image from "next/image";


export default function PageContact() {

  return <>
    <h2>Контакты</h2>

       <div className={`flex flex-nowrap`}>
    <Image src={"/tg.png"} width={30} height={30} alt="tg" />
      <a className={`text-sm font-semibold text-gray-600 hover:bg-blue-50 hover:text-green-800 rounded`} href="https://t.me/elena_lyamurka">  Telegram</a>                                     
     
      </div> 
           
   

  </>
}
