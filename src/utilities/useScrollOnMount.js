import { useEffect } from "react";

function useScrollOnMount() {
  useEffect(() => {
    const contenedor = document.getElementById("wrapper");
    if (contenedor) {
      contenedor.scrollTop = contenedor.offsetTop - 70;
    }
  }, []);
}

export default useScrollOnMount;
