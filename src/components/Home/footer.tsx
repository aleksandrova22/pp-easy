import Image from "next/image";
import classes from './footer.module.css';

export function Footer() {
  return <footer className={classes.footer}>

    <div className={classes.footer_content} >
      <div className={classes.footer_info}>
        <p>Контактная информация:</p>
        <p>Электронная почта: <a href="mailto:lialia1986@mail.ru">lialia1986@mail.ru</a></p>
      </div>


      <div className={classes.footer_info}>
        <p>Социальные сети:</p>
        <p><Image src={"/tg.png"} width={30} height={30} alt="tg" /> <a href="https://t.me/lyamurka22" target="_blank" rel="noopener noreferrer"> lyamurka22</a></p>
        <p><Image src={"/ig.png"} width={30} height={30} alt="ig" /> <a href="https://www.instagram.com/lyamurka22" target="_blank" rel="noopener noreferrer">@lyamurka22</a></p>
      </div>

      <div className={classes.footer_info}>
        <Image src={"/qr.jpg"} width={80} height={80} alt="qr" /> <a href="https://t.me/lyamurka22" target="_blank" rel="noopener noreferrer"> </a>

      </div>
    </div>


    <br />
        <br />
    <div className={classes.footer_bottom}>
      <p>© 2025 Александрова Елена Юрьевна</p>
    </div>



  </footer>
}