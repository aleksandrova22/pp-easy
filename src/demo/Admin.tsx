import { useState, useEffect } from "react";
import Tile, { TileStatus } from "./Tile";

export default function Admin() {
  const [status, setStatus] = useState<TileStatus>("Loading");
  const [canOpenAdmin, setCanOpenAdmin] = useState(false);

  useEffect(() => {
    fetch("/api/admin") // Assuming there's a ping endpoint to check server status
      .then((response) => {
        if (response.ok) {
          setStatus("Success");
          setCanOpenAdmin(true);
        } else {
          setStatus("Error");
          setCanOpenAdmin(false);
        }
      })
      .catch(() => {
        setStatus("Error");
        setCanOpenAdmin(false);
      });
  }, []);

  let subtitle = status === "Error" ? "Кажется, возникла проблема" : "";
  let message =
    status === "Success"
      ? "Управление"
      : "Не удалось подключиться к серверу";

  return (
    <Tile title="Администратор" status={status} subtitle={subtitle} width="half">
      <p>{message}</p>
      <div className="button-row">
        {canOpenAdmin && (
          <a className="button" href="/api/admin">
            Управление БД
          </a>
        )}
      </div>
    </Tile>
  );
}
