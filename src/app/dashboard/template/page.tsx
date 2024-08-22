import TemplateEditor from "./TemplateEditor";

export default function page() {
  return (
    <section id="data-editor" className="data-editor mx-auto w-[96%]">
      <div className="flex items-center justify-between">
        <h1 className="sidebar__title py-8" style={{ display: "block" }}>
          Template Editor
        </h1>
      </div>
      <TemplateEditor />
    </section>
  );
}
