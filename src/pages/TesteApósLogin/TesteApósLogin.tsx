import { useEffect, useState } from "react";
import { TesteAposLoginService } from "./services/testeAposLogin.service";

export default function TesteAposLogin() {

  interface Usuario { 
    email: string;
    name: string;
    role: "student" | "guardianship";
  }
  
  const [usuario, setUsuario] = useState<Usuario>();
  const testeAposLoginService = new TesteAposLoginService();
  
  

  useEffect(() => {
    async function carregarUsuario() {
    try {
      const usuarioLogado = await testeAposLoginService.obterUsuarioLogado();
      setUsuario(usuarioLogado);
    } catch (error) {
      console.error("Erro ao carregar usuário logado: ", error);
    }
  }
  carregarUsuario();
  }, []);
  
  return (
    <div>
      {usuario?.name}
    </div>
  )
}
