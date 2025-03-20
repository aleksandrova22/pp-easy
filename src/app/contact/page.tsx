import Image from "next/image";


export default function PageContact() {

  return <>
    <h1>Обратная связь</h1>
    <hr />
    <Image src={"/tg.png"} width={30} height={30} alt="tg" />

    <a href="https://t.me/elena_lyamurka" > Telegram    </a>

  </>
}
