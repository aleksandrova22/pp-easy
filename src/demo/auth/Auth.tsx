import { useState, useEffect } from "react";
import { remult } from "remult";
import Tile, { type TileStatus } from "../Tile";

export default function Auth() {
  const [status, setStatus] = useState<TileStatus>("Loading");
  const [error, setError] = useState<JSX.Element | string>();
  useEffect(() => {
    remult
      .initUser()
      .then(() => setStatus("Success"))
      .catch((e) => {
        setStatus("Error");
        if (e.message.includes("the server configuration")) {
          setError(
            <>
              Make sure to set the <code>AUTH_SECRET</code> in the{" "}
              <code>.env</code> file. <br />
              Read more at{" "}
              {/* <a href="https://errors.authjs.dev#missingsecret">auth.js docs</a> */}
              .
              <br />
              Для получения дополнительной информации проверьте консоль терминала сервера.
            </>,
          );
        }
      });
  }, []);

  let content: JSX.Element | string = <></>;

  let tileSubtitle = "";
  if (status === "Loading") {
    tileSubtitle = "Checking your authentication status";
  } else if (status === "Error") {
    content = <p>{error}</p>;
    tileSubtitle = "There seems to be an issue";
  } else if (remult.authenticated()) {
    content = (
      <>
        <p>
          Вы вошли как <strong>{remult.user?.name}</strong>
        </p>
        <div className="button-row">
          <a className="button" href="/api/auth/signout">
            Выйти
          </a>
        </div>
      </>
    );
  } else {
    content = (
      <>
        <p>Вы не авторизованы</p>
        <div className="button-row">
          <a className="button" href="/api/auth/signin">
            Войти
          </a>

        </div>
      </>
    );
  }

  return (
    <Tile
      title="Вход"
      status={status}
      subtitle={tileSubtitle}
      className="auth"
      width="half"
    >
      {content}
    </Tile>
  );
}
