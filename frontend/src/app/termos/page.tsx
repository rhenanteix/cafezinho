import type { Metadata } from "next";
import { LegalView } from "@/views/screens/LegalView";

export const metadata: Metadata = { title: "Termos de Serviço" };

const sections = [
  { title: "O que é o Cafezinho", body: "O Cafezinho oferece uma página pública onde criadores divulgam links de pagamento ou PIX gerados no próprio banco ou instituição de pagamento." },
  { title: "Pagamentos", body: "Não processamos, intermediamos nem guardamos pagamentos. Todo valor é pago diretamente na conta do criador, pelo serviço que gerou o link, e dúvidas sobre cobranças devem ser tratadas com o criador ou com esse serviço." },
  { title: "Sua conta", body: "Você é responsável pelas informações publicadas, pela veracidade dos links e pela segurança da sua senha. Use apenas links de cobrança que pertencem a você." },
  { title: "Conteúdo proibido", body: "Não é permitido usar a plataforma para fraude, conteúdo ilegal, discurso de ódio ou para se passar por outra pessoa. Páginas que violem estas regras podem ser removidas." },
  { title: "Alterações", body: "Estes termos podem ser atualizados. Continuar usando a plataforma após uma mudança significa concordar com a nova versão." },
];

export default function Page() {
  return <LegalView title="Termos de Serviço" intro="Regras simples para usar o Cafezinho." sections={sections} />;
}
