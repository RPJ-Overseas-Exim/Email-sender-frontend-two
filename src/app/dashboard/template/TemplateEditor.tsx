import TemplateForm from "@/components/dashboard/templateEditor/TemplateForm";
import { Template } from "@/lib/types/TemplateEditor";
import TemplateCombobox from "@/components/dashboard/templateEditor/TemplateCombobox";
import GetRequest from "@/lib/requestHellpers/GetRequest";

export default async function TemplateEditor() {
  const res = await GetRequest("/templates");
  let templates: Template[] | [];
  if (res.data) {
    templates = res.data.map(
      (template: { name: string; body: string; subject: string }) => {
        const [type, name] = template.name.split("-");
        return { ...template, name, type };
      },
    );
  } else {
    templates = [];
  }
  return (
    <section id="templateEditor">
      <TemplateCombobox templates={templates} />
      <TemplateForm />
    </section>
  );
}
