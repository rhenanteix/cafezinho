import type { Metadata } from "next";
import { LegalView } from "@/views/screens/LegalView";

export const metadata: Metadata = { title: "Política de Privacidade" };

const sections = [
  { title: "Dados que coletamos", body: "Nome, e-mail, senha (armazenada com hash), informações do perfil, redes sociais, links de pagamento e a foto que você enviar. Também contamos visitas à página e cliques nos botões, sem identificar quem visitou." },
  { title: "Como usamos", body: "Usamos esses dados para exibir sua página pública, permitir que você entre e edite o perfil e mostrar suas estatísticas. Seu e-mail nunca aparece na página pública." },
  { title: "Compartilhamento", body: "Não vendemos seus dados. As informações do perfil e os links que você escolhe publicar ficam visíveis para qualquer pessoa com o endereço da sua página." },
  { title: "Seus direitos", body: "Você pode alterar seus dados a qualquer momento no painel e pedir a exclusão da conta, conforme a LGPD." },
];

export default function Page() {
  return <LegalView title="Política de Privacidade" intro="Como tratamos os seus dados." sections={sections} />;
}
